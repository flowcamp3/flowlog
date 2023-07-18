import { signIn, useSession, signOut } from "next-auth/react";

export default function MainPage() {
  const { data: session } = useSession();

  if (session?.user.email) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>{session.user?.name}님 반갑습니다</h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>시작하기</h1>
        </div>
      </>
    );
  }
}
