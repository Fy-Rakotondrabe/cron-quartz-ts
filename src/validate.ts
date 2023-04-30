export function isInRange(num: number, min: number, max: number) {
  if (num > max || num < min) {
    throw Error(`The range is ${min} - ${max}`);
  }
}

export function isArray<T>(array: T[]): boolean {
  if (!Array.isArray(array)) {
    throw Error('list type is array');
  }
  return true;
}
