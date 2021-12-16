import React from "react";
import Image from "next/image";

export const Logo: React.FC = () => {
  return (
    <Image src="/icons/logo.png" alt="HackerDrunk" height="74" width="256"/>
  );
};
