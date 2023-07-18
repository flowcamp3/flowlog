import NavBar from "./TopNavBar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div style={{ position: 'fixed', top: 0,  width: '100%', display: 'flex', justifyContent: 'center' }}>
        <NavBar />
      </div>
      <div style={{marginTop: "40px"}}>{children}</div>
    </>
  );
}