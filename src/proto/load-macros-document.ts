import { join } from 'path';
import { load, Type } from 'protobufjs';

export function loadMacrosDocument(): Promise<Type> {
  return new Promise((resolve, reject) => {
    load(join(__dirname, '../../definitions/macros.proto'), (err, root) => {
      if (err || !root) {
        reject(err);
      } else {
        resolve(root.lookupType('rv.data.MacrosDocument'));
      }
    });
  });
}
