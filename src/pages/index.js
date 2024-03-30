// pages/index.js
import Head from 'next/head';

export default function Home({ helloMessage, goodbyeMessage, issuerDid, vcJwt }) {
  return (
    <div>
      <Head>
        <title>Next.js App with API Calls</title>
      </Head>

      <main>
        <h1>Next.js App with Two API Calls</h1>
        <p>{helloMessage}</p>
        <p>{goodbyeMessage}</p>
        <p>{issuerDid}</p>
        <p>{vcJwt}</p>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  const helloRes = await fetch(`${baseUrl}/api/hello`);
  const goodbyeRes = await fetch(`${baseUrl}/api/goodbye`);
  const helloData = await helloRes.json();
  const goodbyeData = await goodbyeRes.json();

  return {
    props: {
      helloMessage: helloData.message,
      issuerDid: goodbyeData.issuerDid,
      vcJwt: goodbyeData.vcJwt,
      goodbyeMessage: goodbyeData.message,
    },
  };
}
