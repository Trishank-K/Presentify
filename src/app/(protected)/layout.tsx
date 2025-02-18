export const dynamic = "force-dynamic";
import React from "react";

type props = { children: React.ReactNode };

const Layout = async (props: props) => {
  return <div className="w-full min-h-screen">{props.children}</div>;
};

export default Layout;
