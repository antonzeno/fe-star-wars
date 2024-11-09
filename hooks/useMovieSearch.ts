import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useMovieSearch = (delay: number = 300) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [debouncedSearch, setDebouncedSearch] = useState(
    searchParams.get('q') || ''
  );

  useEffect(() => {
    const currentQuery = searchParams.get('q') || '';
    setDebouncedSearch(currentQuery);
  }, [searchParams]);

  const handleSearch = (value: string) => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set('q', value);
      } else {
        params.delete('q');
      }

      router.push(`?${params.toString()}`, { scroll: false });
    }, delay);

    setDebouncedSearch(value);
    return () => clearTimeout(handler);
  };

  return {
    searchTerm: debouncedSearch,
    setSearchTerm: handleSearch
  };
}; 