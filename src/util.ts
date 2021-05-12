import { join } from 'path';
import { workspace } from 'vscode';
import { existsSync, readFileSync } from 'fs';

function getPath(relativePath: string) {
  return join((workspace?.workspaceFolders?.[0]?.uri?.path as string), relativePath);
}

export function jsonParse(jsonStr: string) {
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    return {};
  }
}

export function readFileSyncByRelativePath(relativePath: string): string {
  const path = getPath(relativePath);
  console.log(path, 992);
  if (!existsSync(path)) {return '';};
  console.log()
  try {
    return readFileSync(path).toString('utf-8');
  } catch(e) {
    return '';
  }
}