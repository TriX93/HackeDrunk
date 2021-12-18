import React, { useContext, useRef } from "react";

import { Header, Main, Footer, Cards } from "@components";
import Editor from "@monaco-editor/react";
import  { Button, Card, Spinner } from "react-bootstrap";
import {Accordion} from "react-bootstrap";
import { throws } from "assert";

export default class Game extends React.Component {

  state: {
    quiz: {
      title: string,
      description: string[],
      testing?: boolean,
      functionName: string,
      initialCode: string,
      tests: {
        input: any,
        output: string,
        computed?: string|null,
        run: boolean,
        pass: boolean
      }[]
    },
    code?: string
  }


  editorRef:any;

  constructor(props: any) {
    super(props);
    this.state = {
      quiz: {
        title: "Staircase",
        description: ["Dice un vecchio detto: \"Il mondo è fatto a scale, c'è chi le scende e chi le sale\". C'è però un terzo gruppo di persone: chi le scale le costruisce.", "La funzione staircase(n) ritorna una stringa contenente la rappresentazione di una scala composta da n gradini.", "Esempio: staircase(3) costruisce una scala di tre gradini.", "   #\n  ##\n ###\n####"],
        testing: false,
        functionName: "staircase",
        initialCode: "function staircase(n) {\n\t// insert code here\n}",
        tests: [
          {
            input: 1,
            output: "#",
            computed: null,
            run: false,
            pass: false
          },
          {
            input: 3,
            output: ["   #","  ##"," ###", "####"].join("\n"),
            computed: null,
            run: false,
            pass: false
          }
        ]
      }
    };
    this.state.code = this.state.quiz.initialCode;
  }

  handleEditorDidMount = (editor:any, monaco: any) => {
    this.editorRef.current = editor; 
  }

  printTests() {
    const out = [];
    let i = 0;
    return this.state.quiz.tests.map( test => {
      i++;
      return <Card>
          <Card.Header>
          {test.run && <span className={"badge badge-"+(test.pass ? "success": "danger") }>{test.pass ? "OK": "KO"}</span>} Test {i} 
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              Input: <pre>{test.input}</pre>
              <div className="row">
                <div className="col-6">
                  Expected output:
                  <pre>
                    {test.output}
                  </pre>
                </div>
                <div className="col-6">
                  Your output:
                  <pre>
                    {test.computed}
                  </pre>
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
    } )
  }

  runTests = () => {
  
    this.setState( (state: any, props) => ({
      quiz: { ...state.quiz, testing: true}
    }) );

    setTimeout( () => {
      const code = this.state.code;

      this.state.quiz.testing = true;
      const tests = this.state.quiz.tests;
      debugger;
  
      for ( let i=0; i<tests.length; i++ ) {
        const test = this.state.quiz.tests[i];
        test.computed = "";
        const sandbox = new Function (code + " ;;; return "+this.state.quiz.functionName+"("+test.input+")");
        try {
          test.computed = sandbox();
          test.pass = test.computed == test.output;
        } catch (e) {
          test.pass = false;
          test.computed = "Exception: "+e
        }
        test.run = true;
      }

      this.setState((state:any, params) =>({
        quiz: { ...state.quiz, testing: false, tests}
      }))
    })



  }

  onEditorChange = (value: string, event: any) => {
    this.setState( (state, props) => ({ code:value }))
  }  

  render () {
    return (
      <div className="d-flex flex-column min-vh-100 overflow-hidden">
        <Header />
        <div className="container-fluid">
          <div className="row flex-grow">
            
            <div className="col-8 editorContainer">
              <Editor height="100%" 
              defaultValue={this.state.quiz.initialCode}
              onChange={this.onEditorChange}
            defaultLanguage="javascript"
            />
            </div>
            <div className="col-4 quizExplain">
              <h1>{this.state.quiz.title}</h1>
              {this.state.quiz.description.map( desc => {
                return <pre className="preformatted">{desc}</pre>
              } ) }

              <div className="mt-4">
                <Button onClick={this.runTests}>Run Tests</Button>
              </div>
              <hr />
  
              <h3>Tests { this.state.quiz.testing && <Spinner animation="border"></Spinner>}</h3>
              { !this.state.quiz.testing && <Accordion defaultActiveKey="0">
                {this.printTests()}
              </Accordion>}
            </div>
          </div>
        </div>
        
       
      </div>
    );
  }
}

