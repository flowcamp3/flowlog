import { signIn, useSession, signOut } from "next-auth/react";

export default function MainPage() {
  const { data: session } = useSession();

  if (session) {
    console.log(session.user.email);
    console.log(session.user.name);
    return (
      <>
        <h1>메인 페이지</h1>
        {session.user?.name}님 반갑습니다 <br />
        <button onClick={() => signOut(
          // { callbackUrl: "/" }
          )}>로그아웃</button>
      </>
    );
  } else {
    return (
      <>
        <h1>메인 페이지</h1>
        로그인되지 않았습니다 <br />
        <button onClick={() => signIn("kakao"
        // , { callbackUrl: "/blog" }
        )}>카카오 로그인</button>
      </>
    );
  }
}
