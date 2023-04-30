export function spliceIntoPosition(cron: string, position: number, char: string | number): string {
  const def = cron.split(' ');
  def.splice(position, 1, char.toString());
  return def.join(' ');
}
