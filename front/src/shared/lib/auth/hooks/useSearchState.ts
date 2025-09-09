import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useSearchState = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const searchValue = params.get(key);

    if (searchValue) {
      setValue(JSON.parse(searchValue) as T);
    }
  }, [search, key]);

  useEffect(() => {
    const params = new URLSearchParams(search);

    if (value !== null) {
      params.set(key, JSON.stringify(value));
    } else {
      params.delete(key);
    }

    navigate({
      search: params.toString(),
    });
  }, [key, navigate, search, value]);

  return [value, setValue];
};
