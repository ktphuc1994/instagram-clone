import { useSession, signOut } from 'next-auth/react';

const popupCenter = (url, title) => {
  const dualScreenLeft = window.screenLeft ?? window.screenX;
  const dualScreenTop = window.screenTop ?? window.screenY;
  const width =
    window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

  const height =
    window.innerHeight ??
    document.documentElement.clientHeight ??
    screen.height;

  const systemZoom = width / window.screen.availWidth;

  const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
  const top = (height - 550) / 2 / systemZoom + dualScreenTop;

  const newWindow = window.open(
    url,
    title,
    `width=${500 / systemZoom},height=${
      550 / systemZoom
    },top=${top},left=${left}`
  );

  newWindow?.focus();
};

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className='bg-red-400 rounded-lg p-3 text-white hover:bg-red-500'
    >
      {children}
    </button>
  );
};

export default function SignInButton({ providerId, providerName }) {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return (
      <div className='text-center'>
        <h2> Welcome {session.user.email} 😀</h2>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <Button
        onClick={() =>
          popupCenter(
            `/auth/signin-popup?provider=${providerId}`,
            `Sign In with ${providerName}`
          )
        }
      >
        Sign In with {providerName}
      </Button>
    );
  }

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}
