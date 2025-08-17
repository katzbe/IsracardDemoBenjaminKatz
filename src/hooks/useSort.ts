import { useMemo } from 'react';

type Direction = 'asc' | 'desc';
type OrderKey = string;

export function useSort<T extends object>(
  items: T[],
  orderBy: string,
  accessors: Record<
    OrderKey,
    (item: T) => string | number | Date | null | undefined
  >,
) {
  return useMemo(() => {
    if (!orderBy) return items;

    const [, key, dir] = orderBy.match(/^(.+)-(asc|desc)$/) ?? [];
    const accessor = key ? accessors[key] : undefined;
    const direction = (dir as Direction) ?? 'asc';

    if (!accessor) return items;

    const decorated = items.map((item, idx) => {
      let v = accessor(item);
      if (v instanceof Date) v = v.getTime();
      else if (typeof v === 'string') v = v.toLowerCase();
      else if (v == null) v = Number.NEGATIVE_INFINITY;
      return { item, idx, v };
    });

    decorated.sort((a, b) => {
      if (a.v < b.v) return direction === 'asc' ? -1 : 1;
      if (a.v > b.v) return direction === 'asc' ? 1 : -1;
      return a.idx - b.idx;
    });

    return decorated.map(d => d.item);
  }, [items, orderBy, accessors]);
}
