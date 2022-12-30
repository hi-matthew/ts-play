export const BASE_URL = {
  APP: '/api',
  EXAMPLE: 'https://api.example.com',
  GITHUB: 'https://api.github.com',
  TEST: 'test.com',
} as const;

export const PATH = {
  APP: {
    HELLO: '/hello',
  },
  EXAMPLE: {
    TEST: '/test',
    TEST2: '/test2',
  },
  GITHUB: {
    USERS: '/users',
    USERS2: '/users2',
  },
} as const;

export type PathType = typeof PATH;

export type ValidBaseUrlKeys = Extract<keyof typeof BASE_URL, keyof PathType>;

export type RespectivePaths<T extends keyof PathType> =
  PathType[T][keyof PathType[T]];
