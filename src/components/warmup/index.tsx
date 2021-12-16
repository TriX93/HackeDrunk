import React, { CSSProperties } from "react";
import { Container } from "react-bootstrap";

import { Button } from "@components";
import Image from "next/image";

export const WarmupMain: React.FC = () => {
  return (
    <div className="text-center py-4 flex-grow" style={{ backgroundColor: "#282c34" }}>
      <Container>
        <p className="lead text-white">
          Ma prima uno shottino di riscaldamento!
        </p>
        <div className="mb-5">
        <Image src="/shot-glass.png" height="200" width="200"/>
        </div>
        <Button
          variant="primary"
          size="lg"
          href="/game"
        >
          Fatto!
        </Button>
      </Container>
    </div>
  );
};
