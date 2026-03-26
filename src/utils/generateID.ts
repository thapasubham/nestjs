import crypto from 'crypto';

export function generateId(input: string = '') {
  const data = `${Date.now()}-${input}-${Math.random()}`;
  return crypto.createHash('sha256').update(data).digest('hex').slice(0, 16);
}
