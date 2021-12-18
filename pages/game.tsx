import React, { useContext, useRef } from "react";

import { Header, Main, Footer, Cards } from "@components";
import Editor from "@monaco-editor/react";
import  { Button, Card, Modal, Spinner } from "react-bootstrap";
import {Accordion} from "react-bootstrap";
import { throws } from "assert";
import Image from "next/image";

export default class Game extends React.Component {

  myinterval: any;

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
    code?: string,
    timerEnd?: number,
    adsText: string,
    adsMills: number,
    triggerAds: boolean,
    adsTS?: Date,
    ads: any[],
    showDrink: boolean
  }


  editorRef:any;

  constructor(props: any) {
    super(props);
    const timerEnd = (new Date()).getTime() + 20000;
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
      },
      triggerAds: false,
      adsText: "2:00",
      adsMills: 120000,
      timerEnd,
      ads: [],
      showDrink: false
    };

    this.state.code = this.state.quiz.initialCode;
  }

  handleEditorDidMount = (editor:any, monaco: any) => {
    this.editorRef.current = editor; 
  }

  printTests() {
    const out = [];
    let i = 0;
    return this.state.quiz.tests.map( (test,index) => {
      i++;
      return <Card>
          <Card.Header>
          {test.run && <span className={"badge badge-"+(test.pass ? "success": "danger") }>{test.pass ? "OK": "KO"}</span>} Test {i} 
          </Card.Header>
          <Accordion.Collapse eventKey={index.toString()} key={index}>
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

  componentDidMount() {
    this.myinterval = setInterval(() => {
      //console.log(this.state.timerEnd);
      if (this.state.timerEnd) {
        const mills = this.state.timerEnd - (new Date()).getTime();
        if (mills >= 0) {
          const seconds = Math.floor((mills / 1000) % 60);
          const mins = Math.floor(mills / 60000);
          const text = (mins < 1 ? "0": mins)+":"+(seconds < 10 ? "0"+seconds : seconds);
          this.setState((state, props) => ({
            adsText: text,
            adsMills: mills
          }));
        } else {
          const seconds = 0;
          const mins = 2;
          const text = (mins < 1 ? "0": mins)+":"+(seconds < 10 ? "0"+seconds : seconds);
          this.setState((state, props) => ({
            adsText: text,
            adsMills: 120000,
            timerEnd: (new Date()).getTime() + 120000
          }));
          const count = Math.floor(Math.random() * 6) + 6;
          this.generateAds(count);
        }
      }

     

    }, 100)
  }
  componentWillUnmount() {
    clearInterval(this.myinterval);
  }

  showDrink () {
    this.setState((state, props) => ({
      showDrink: true
    }));
  }

  runTests = () => {

    this.showDrink();

    this.setState( (state: any, props) => ({
      quiz: { ...state.quiz, testing: true}
    }) );

    setTimeout( () => {
      const code = this.state.code;

      this.state.quiz.testing = true;
      const tests = this.state.quiz.tests;
  
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

  onEditorChange = (value: string | undefined, event: any) => {
    this.setState( (state, props) => ({ code:value }))
  }  

  timer() {
    return this.state.adsMills > 5000 ? 
      <span className="text-bold">{this.state.adsText}</span>:
      <span className="text-bold text-danger">{this.state.adsText}</span>
  }

  showAds() {
    return <div className="backdrop">
      {this.state.ads.map( adv => {
        const style = {
          top: adv.y +"px",
          left: adv.x+"px"
        }

        return <div className="card card-adv" style={style}>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" className="card-link" onClick={ () => {this.closeAd(adv)}}>Chiudi</a>
        </div>
      </div>
      } )}
    </div>
  }

  closeAd(idx: number) {
    this.setState( (state, props) => {
      const ads = this.state.ads;

      ads.splice( ads.indexOf(idx), 1 );

      return { ads }
    } )
  }

  generateAds(count: number) {

    this.showDrink();

    if (this.state.adsTS == null) {
      this.setState( (state, props) => ({ adsTs: new Date() }) )
    }

    const wmax = window.outerHeight - 300;
    const hmax = window.outerWidth - 200;
    this.setState( (state, props) => {
      const ads = this.state.ads;
      for (let i = 0; i < count; i++) {
        const x =  Math.floor(Math.random() * hmax);
        const y =  Math.floor(Math.random() * wmax);
        const adv = {
          idx: new Date().getTime() + 10000 + i,
          x, y
        }

        ads.push( adv );
      }

      return { ads }
    } )

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
              <h5>Time to next adv: {this.timer()}</h5>
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
        { this.state.ads.length > 0 && this.showAds() }
        <Modal show={this.state.showDrink}>
          <Modal.Header>
            <Modal.Title>E' ora di bere!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Image src="/shot-glass.png" height="200" width="200"/>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideDrink}>Close</Button>
          </Modal.Footer>
        </Modal>
       
      </div>
    );
  }

  hideDrink = () => {
    this.setState((state, props) => ({
      showDrink: false
    }));
  }
}

