import { useEffect, useMemo, useRef } from 'react';
import { debounce } from 'lodash';

const useDebounce = (callback: Function, time = 1000) => {
  const ref = useRef<Function>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      (ref.current as any)?.();
    };

    return debounce(func, time);
  }, []);

  return debouncedCallback;
};

export default useDebounce;
