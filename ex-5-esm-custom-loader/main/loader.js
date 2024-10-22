import { resolve as resolvePath } from 'path';
import { readFileSync } from 'fs';
import { pathToFileURL } from 'url';

export async function resolve(specifier, context, defaultResolve) {
  specifier = specifier.replace('@deep/', './local/deep/path/');
  specifier = specifier.replace('@libs/', '../../libs/dist/');
  return defaultResolve(specifier, context, defaultResolve);
}
