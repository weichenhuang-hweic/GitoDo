import Router from 'next/router';

export default function Home() {
  Router.push(
    {
      pathname: '/main',
      query: {},
    },
    `/main`
  );
  return <></>;
}
