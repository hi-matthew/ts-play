import {
  type FetchOptions,
  createServiceFetcher,
} from '../utils/createServiceFetcher/createServiceFetcher';
import { type GithubPublicUser } from './schema';

const githubFetcher = createServiceFetcher('GITHUB', {
  camelcase: true,
});

export const getUser = (
  usernameParam: string,
  options?: FetchOptions
): Promise<GithubPublicUser> =>
  githubFetcher('/users', {
    params: usernameParam,
    ...options,
  });
