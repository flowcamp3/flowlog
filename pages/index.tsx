import { signIn, useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function MainPage() {
  const { data: session } = useSession();

  if (session?.user.email) {
    return (
      <>
        <div style={{ marginTop: '80px' }}>
          <h1>메인 페이지</h1>
          {session.user?.name}님 반갑습니다 <br />
          <button
            onClick={() => {
              signOut();
            }}
          >
            로그아웃
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div style={{ marginTop: '80px' }}>
          <h1>메인 페이지</h1>
          로그인되지 않았습니다 <br />
          <Link href="/signin">
            <div>카카오로그인하기</div>
          </Link>
        </div>
      </>
    );
  }
}
