import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const GoogleSignInPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const provider = router.query.provider;

  useEffect(() => {
    if (!(status === 'loading') && !session && provider) signIn(provider);

    if (session) window.close();
  }, [session, status]);

  useEffect(() => {
    if (!router.isReady) return;

    if (!provider) {
      router.replace('/auth/signin');
    }
  }, [router.isReady]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        left: 0,
        top: 0,
        background: 'white',
      }}
    />
  );
};

export default GoogleSignInPage;
