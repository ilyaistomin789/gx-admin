import { useEffect, useState } from 'react';

export const useModifiedState = <T,>(modifiedState?: T) => {
  const [state, setState] = useState<T | undefined>(modifiedState);

  useEffect(() => {
    if (modifiedState !== state) {
      setState(modifiedState);
    }
  }, [modifiedState]);

  return [state, setState] as const;
};
