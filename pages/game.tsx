import React from "react";

import { Header, Main, Footer, Cards } from "@components";
import { WarmupMain } from "@components/warmup";
import Editor from "@monaco-editor/react";

const Warmup: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100 overflow-hidden">
      <Header />
      <div className="row flex-grow">
        
        <div className="col-8">
          <Editor height="100%" 
        defaultLanguage="javascript"
        />
        </div>
        <div className="col-4">
          <h1>Fizz Buzz</h1>
          <p>Aggiungere megaspiegone fotonico!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat illo consequatur eos quaerat modi eveniet molestias ipsam pariatur architecto quasi aspernatur soluta excepturi, reprehenderit fugit necessitatibus ipsum perferendis? Aliquam, alias!</p>

          <h3>Tests</h3>
          <div className="row">
            <div className="col-4"> <span className="badge badge-pill badge-success">1</span> Passed</div>
            <div className="col-4"> <span className="badge badge-pill badge-success">2</span> Passed</div>
            <div className="col-4"> <span className="badge badge-pill badge-danger">3</span> Not Passed</div>
            <div className="col-4"> <span className="badge badge-pill badge-success">4</span> Passed</div>
            <div className="col-4"> <span className="badge badge-pill badge-success">5</span> Passed</div>
          </div>       
        </div>
      </div>
     
    </div>
  );
};

export default Warmup;
