import React, { PropsWithChildren, useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import { Navbar } from "../navbar/navbar";
import { SideBar } from "../sidebar/sidebar";
import { BiTerminal } from "react-icons/bi";

export type Sniffer = {
  name: string;
  id: string;
  downstreamUrl: string;
  port: number;
};

export const PageTemplate: React.FC<PropsWithChildren> = ({ children }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
  const { user } = useAuthStore();

  useEffect(() => {
    if (user != null && user.email != null) {
      setSideMenuOpen(true);
    } else {
      setSideMenuOpen(false);
    }
  }, [user]);

  return (
    <div className="flex flex-col h-full w-full min-h-screen">
      <div className="flex flex-row h-full w-full flex-1">
        {sideMenuOpen && <SideBar />}
        <div className="flex flex-col flex-1 bg-[#1d1d1d]">
          <Navbar />
          {children}
        </div>
      </div>
      {user && <BottomBar />}
    </div>
  );
};

const BottomBar: React.FC = () => {
  return (
    <div className="sticky bottom-0 flex-row w-full bg-[#1d1d1d] h-10 border-t-[0.1px] border-[#3a3a3a]">
      <div className="flex flex-row w-full h-full items-center justify-between px-4">
        <div className="text-[#fff]">© 2023 Sharkio</div>
        <div className="flex flex-row items-center">
          <BiTerminal className="text-[#fff] text-2xl hover:bg-[#3a3a3a] rounded-md hover:cursor-pointer active:scale-110" />
        </div>
      </div>
    </div>
  );
};
