import React, { FC } from "react";
import { Navbar } from "./components";
import { ILayoutProps } from "../types";

const Layout: FC<ILayoutProps> = ({ pagename, children }) => {
  return (
    <div className="layout-main-root">
      <div className="layout-main">
        <Navbar pagename={pagename}></Navbar>
        <div
          className="container-fluid min-h-screen overflow-y-auto"
          style={{ backgroundColor: "#F9F9F9" }}
        >
          <div className="flex flex-row justify-start">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
