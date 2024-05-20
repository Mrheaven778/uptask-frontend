import Tabs from "@/components/profile/Tabs";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <Tabs />
      </div>
      {children}
    </>
  );
}

export default layout;
