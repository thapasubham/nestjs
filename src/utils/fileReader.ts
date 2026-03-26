import { promises as fs } from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, 'data.json');

export async function readFile<T>(): Promise<T[]> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return data ? JSON.parse(data) : [];
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

export async function writeFile<T>(data: T[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}