import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const New = () => {
  const { query } = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    if (!query.name) {
      setRedirecting(true);
      timerId = setTimeout(
        () =>
          window.location.replace('https://github.com/login/oauth/authorize'),
        5000
      );
    }

    return () => {
      setRedirecting(false);
      clearTimeout(timerId);
    };
  }, []);

  return (
    <>
      <Head>
        <title>TS App</title>
        <meta name="description" content="Playing around with TS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{redirecting ? 'Redirecting' : 'Testing'}</div>
    </>
  );
};

export default New;
