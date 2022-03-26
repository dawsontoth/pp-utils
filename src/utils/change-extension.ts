import { basename, dirname, extname, join } from 'path';

export function changeExtension(file: string, extension: string) {
  const ref = basename(file, extname(file));
  return join(dirname(file), ref + extension);
}
