import { promises as fs, writeFileSync } from 'fs';
import { resolve } from 'path';
import type { Arguments, CommandBuilder } from 'yargs';
import { loadMacrosDocument } from '../proto/load-macros-document';
import { changeExtension } from '../utils/change-extension';

type Options = {
  file: string;
};

export const command: string = 'convert-json-to-proto <file>';
export const desc: string = 'Creates provided json to ProPresenter Macros file.';
export const builder: CommandBuilder<Options, Options> = (yargs) => yargs
  .positional('file', {
    type: 'string',
    demandOption: true,
  });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { file } = argv;
  const from = resolve(file);
  const to = changeExtension(from, '');

  const macrosDocument = JSON.parse(await fs.readFile(from, 'utf-8'));
  const MacrosDocument = await loadMacrosDocument();

  console.log('');
  writeFileSync(to, MacrosDocument.encode(MacrosDocument.fromObject(macrosDocument)).finish());
  console.log(`Changes saved to ${ to }`);

  process.exit(0);
};
