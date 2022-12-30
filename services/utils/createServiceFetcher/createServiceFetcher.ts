import camelcaseKeys from 'camelcase-keys';
import { ZodError } from 'zod';
import {
  BASE_URL,
  type ValidBaseUrlKeys,
  type RespectivePaths,
} from '../../constants';

type ServiceOptions = {
  camelcase?: boolean;
};

export type FetchOptions = RequestInit & {
  params?: string;
};

export const createServiceFetcher =
  <TService extends ValidBaseUrlKeys>(
    service: TService,
    serviceOptions?: ServiceOptions
  ) =>
  (path: RespectivePaths<TService>, options?: FetchOptions) =>
    fetch(
      `${BASE_URL[service]}${path}${
        options?.params ? `/${options.params}` : ''
      }`,
      options
    )
      .then(res => res.json())
      .then(data => (serviceOptions?.camelcase ? camelcaseKeys(data) : data))
      .catch(e => {
        if (e instanceof ZodError) {
          throw new Error(
            'Failed zod validation. Check "Caused by: ZodError" section below for details.',
            { cause: e }
          );
        }

        throw new Error('Failed fetch request', { cause: e });
      });
