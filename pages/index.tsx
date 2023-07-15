import { signIn, useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function MainPage() {
  // POST method로 fetch보내는 예시 함수
  // const createTest1 = async (): Promise<void> => {
  //   const randomNum: number = Math.floor(Math.random() * 1000);
  //   const res: Response = await fetch("/api/auth/sign", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: `test${randomNum}@test.com`,
  //     }),
  //   });
  //   const data: any = await res.json();
  // };

  const isSignUp = async (email: string): Promise<void> => {
    // /api/auth/sign으로 email을 인자로 전달하면서 GET method를 요청하는 api를 호출하고, 응답 data에 따라 redirect된다.
    const res: Response = await fetch(`/api/auth/sign?email=${email}`);
    const data: any = await res.json();
    if (data.redirect) {
      window.location.href = data.redirect;
    }
  };

  const handleSignIn = async () => {
    // 카카오 로그인 버튼을 누르면 실행되고, next-auth/react에서 제공하는 signIn("kakao")함수를 실행하여 카카오 로그인을 한다.
    // 그 이후에 session을 생성한다.
    const result = await signIn('kakao', { redirect: false });
    if (result?.error) {
      alert(result.error);
      return;
    }
    // 그러나 session이 생성되기전에 다음의 if문을 실행시키게 되면서 We don't have session을 출력하게 되고, /api/auth/sign으로 GET을 요청하지 않게된다.
    if (session) {
      console.log("We have session")
      const res: Response = await fetch(`/api/auth/sign?email=${email}`);
      const data: any = await res.json();

    } else {
      console.log("We don't have session");
    }
  };

  
  
  
  

  // const { data: session } = useSession();
  const { data: session, status } = useSession();
  // const loading = status === "loading";

  // useEffect(() => {
  //   if (session) {
  //     isSignUp(session.user.email);
  //   }
  // }, [session]);
  

  if (session) {
    return (
      <>
        <h1>메인 페이지</h1>
        {session.user?.name}님 반갑습니다 <br />
        <button
          onClick={() => {
            signOut();
          }}
        >
          로그아웃
        </button>
      </>
    );
  } else {
    return (
      <>
        <h1>메인 페이지</h1>
        로그인되지 않았습니다 <br />
        <button
          onClick={() => {
            handleSignIn();
            // signIn("kakao");
          }}
        >
          카카오 로그인
        </button>
      </>
    );
  }
}
