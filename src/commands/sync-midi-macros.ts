import { promises as fs, writeFileSync } from 'fs';
import { resolve } from 'path';
import type { Arguments, CommandBuilder } from 'yargs';
import { createNoteOff, isOffNote } from '../midi/off';
import { createNoteOn, isOnNote, extractMidiOnNote } from '../midi/on';
import { loadMacrosDocument } from '../proto/load-macros-document';
import { detectPrefixConflict } from '../utils/detect-prefix-conflict';

type Options = {
  file: string;
};

export const command: string = 'sync-midi-macros <file>';
export const desc: string = 'Creates midi off notes in the provided ProPresenter Macros file.';
export const builder: CommandBuilder<Options, Options> = (yargs) => yargs
  .positional('file', {
    type: 'string',
    demandOption: true,
  });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { file } = argv;
  const ref = resolve(file);

  // Read in and parse the Macros file.
  const raw = await fs.readFile(ref);
  const MacrosDocument = await loadMacrosDocument();
  const decoded = MacrosDocument.decode(raw);
  const macrosDocument = JSON.parse(JSON.stringify(decoded));

  // Find all the midi macros.
  const midiMacros: any[] = macrosDocument.macros.filter((m: any) => m.actions.find((a: any) => a?.communication?.midiCommand));

  // Keep track of some state.
  const macroNameToNote: Record<string, number | null> = {};
  let midiUuid: string = midiMacros[0].actions[0].communication.deviceIdentification.parameterUuid.string;

  // Find all the "on" notes.
  for (const macro of midiMacros) {
    const onAction = macro.actions.find(isOnNote);
    macroNameToNote[macro.name] = onAction ? extractMidiOnNote(onAction) : null;
  }

  // Synchronize the off notes.
  for (const macro of midiMacros) {
    const onNote = macroNameToNote[macro.name];
    macro.actions =
      Object
        .keys(macroNameToNote)
        .filter(macroName => macroNameToNote[macroName] !== null)
        .filter(macroName => detectPrefixConflict(macro.name, macroName))
        .map(macroName => macroNameToNote[macroName] as number)
        .map(note => createNoteOff(note, midiUuid));
    console.log(`+ ${ macro.name } has ${ macro.actions.length } off notes with on note ${ onNote }`);
    if (onNote !== null) {
      macro.actions.unshift(createNoteOn(onNote, midiUuid));
    }
  }

  console.log('');
  writeFileSync(ref, MacrosDocument.encode(MacrosDocument.fromObject(macrosDocument)).finish());
  console.log(`Changes saved to ${ ref }`);

  process.exit(0);
};
