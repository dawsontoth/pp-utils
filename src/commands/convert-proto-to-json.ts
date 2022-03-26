import { promises as fs, writeFileSync } from 'fs';
import { resolve } from 'path';
import type { Arguments, CommandBuilder } from 'yargs';
import { loadMacrosDocument } from '../proto/load-macros-document';
import { changeExtension } from '../utils/change-extension';

type Options = {
  file: string;
};

export const command: string = 'convert-proto-to-json <file>';
export const desc: string = 'Creates json from the provided ProPresenter Macros file.';
export const builder: CommandBuilder<Options, Options> = (yargs) => yargs
  .positional('file', {
    type: 'string',
    demandOption: true,
  });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { file } = argv;
  const from = resolve(file);
  const to = changeExtension(from, '.json');

  const raw = await fs.readFile(from);
  const MacrosDocument = await loadMacrosDocument();
  const decoded = MacrosDocument.decode(raw);

  console.log('');
  writeFileSync(to, JSON.stringify(decoded, null, '\t'));
  console.log(`Changes saved to ${ to }`);

  process.exit(0);
};
