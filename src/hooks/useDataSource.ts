import { useMemo } from 'react';
import { getDataSource } from '@/lib/datasource';
import type { IDataSource } from '@/adapters/IDataSource';

export function useDataSource(): IDataSource {
  // Stable instance
  const ds = useMemo(() => getDataSource(), []);
  return ds;
}