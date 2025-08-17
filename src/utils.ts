import { parse, parseISO, format, isValid } from 'date-fns';

export function toISODate(s: string): string | null {
  let d = parseISO(s);
  if (!isValid(d)) d = parse(s, 'MMM d, yyyy', new Date());
  return isValid(d) ? format(d, 'yyyy-MM-dd') : null;
}
