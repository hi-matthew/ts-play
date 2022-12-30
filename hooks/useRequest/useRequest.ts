import { useState } from 'react';
import { ZodSchema } from 'zod';

export const useRequest = <T extends Record<string, unknown>>(
  promiseFn: () => Promise<T>,
  options?: {
    validationSchema?: ZodSchema;
  }
) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();

  const request = () =>
    promiseFn()
      .then(response => {
        setError(undefined);
        setData(options?.validationSchema?.parse(response) ?? response);
      })
      .catch(err => {
        setData(undefined);
        setError(err);
      });

  return {
    data,
    error,
    request,
  };
};
