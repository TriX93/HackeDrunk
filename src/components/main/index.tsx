import React, { CSSProperties } from "react";
import { Container } from "react-bootstrap";

import { Button } from "@components";
import Image from "next/image";

export const Main: React.FC = () => {
  return (
    <div className="text-center py-4" style={{ backgroundColor: "#282c34" }}>
      <Container>
        <h1 className="display-2 text-white">Pronto alla sfida?</h1>
        <p className="text-white">
          Si chiama Ballmer Peak, scoperto dalla Microsoft a fine degli anni 80. Le cause sono sconosciute, ma si sa che un tasso alcolemico tra i 0.129% e 0.138% migliora le capacità nello scrivere codice.
        </p>
        <p className="lead text-white">
          <Image src="/ballmerpeak.png" layout="responsive" width="538" height="312"/>
        </p>
        <h3 className="text-white">Il gioco</h3>
        <p className="text-white">
          Ti verrà assegnato un semplice problema da risolvere in javascript. <br/>
          Ad intervalli di tempo ti verrà richiesto di bere uno shot. <br/>
          Potrai testare il codice, ma ogni lancio dei test ti costerà uno shot. <br/>
          L'editor ti aiuterà. ma potrebbe giocarti alcuni scherzi...
        </p>
        <Button
          variant="primary"
          size="lg"
          href="/warmup"
        >
          Inizia
        </Button>
      </Container>
    </div>
  );
};
