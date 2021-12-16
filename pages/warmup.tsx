import React from "react";

import { Header, Main, Footer, Cards } from "@components";
import { WarmupMain } from "@components/warmup";

const Warmup: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <WarmupMain />
    </div>
  );
};

export default Warmup;
