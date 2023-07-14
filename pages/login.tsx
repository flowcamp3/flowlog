import { signIn, useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session.user?.name}님 반갑습니다 <br />
        <button onClick={() => signIn("kakao", { callbackUrl: "/user" })}>로그아웃</button>
      </>
    );
  }
  return (
    <>
      로그인되지 않았습니다 <br />
      <button onClick={() => signOut({ callbackUrl: "/" })}>로그인</button>
    </>
  );
}
