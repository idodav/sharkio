import React from "react";

export const Logo: React.FC = () => {
  return (
    <div className="flex h-14 w-full items-center justify-center border-b-[0.1px] border-[#3a3a3a]">
      <a href="/">
        <img
          src="shark-logo.png"
          alt="Logo"
          className="h-10 w-10 rounded-full"
        />
      </a>
    </div>
  );
};
