import { signIn, useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();

  const isSignUp = async (email: string): Promise<void> => {
    // /api/auth/sign으로 email을 인자로 전달하면서 GET method를 요청하는 api를 호출하고, 응답 data에 따라 redirect된다.
    const res: Response = await fetch(`/api/auth/sign?email=${email}`);
    const data: any = await res.json();
    if (data.redirect) {
      window.location.href = data.redirect;
    }
  };

  useEffect(() => {
    if (session) {
      isSignUp(session.user.email);
    }
  }, [session]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <img
        src="/images/kakao_login_medium_wide.png"
        alt="카카오 로그인"
        onClick={() => {
          signIn("kakao");
        }}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
