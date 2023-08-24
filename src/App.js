import logo from './logo.svg';
import './App.css';
import CalcButton from './components/calc-button/calc-button';
import AnswerDisplay from './components/answer-display';
import { useState } from 'react';

function App() {

  const [expression, setExpression] = useState(0);

  const sendSymbolToApp = (symbolFromButton) => {
      sendExpressionToDisplay(symbolFromButton);
  };

  const sendExpressionToDisplay = (newSymbol) => {
      if (expression.toString()==="0" && !".+*/^√".includes(newSymbol)) {
          setExpression(newSymbol);
      } else if (expression.slice(0,1)==="E") {
          setExpression(newSymbol);
      } else if (/(\+|\*|\/|\^|√|-|\()$/.test(expression) && "+*/^√)".includes(newSymbol)) {
          // do nothing--invalid input sequence e.g. ++, +), -+, -), (+, ()
      } else if (/\.\d*$/.test(expression) && newSymbol===".") {
          // do nothing--invalid input sequence: double decimal
      } else if (/(\)|\.)$/.test(expression) && newSymbol===".") {
          // do nothing--invalid input sequence: ). or ..
      } else if (expression.slice(-1)===")" && /\d/.test(newSymbol)) {
          // do nothing--invalid input sequence: e.g. )3
      } else if (/(\d|\)|\.)$/.test(expression) && newSymbol==="(") { 
          setExpression(expression + "*(");     // special cases assuming the user intends multiplication
      } else {
          setExpression(expression + newSymbol);
      }
  }

  const clearDisplay = () => {                // when user presses "Cl." button
      setExpression(0);
  }

  const backspaceDisplay = () => {            // when user presses "<-" button
      if (expression && expression.length > 1) {
        setExpression(expression.slice(0,-1));
      } else {
        setExpression(0);
      }
  }

  const evaluateDisplay = () => {

      var updatedExpression = expression.toString();   // need this because state can't be updated in a loop
      const regexForFloatLimit = /\d+/g;
      var allNumbersFound = updatedExpression.match(regexForFloatLimit);
      if (allNumbersFound) {
          for (let number of allNumbersFound) {
              if (number >= Math.pow(2,53)) {
                  updatedExpression = "Error: exceeds float limit.";
              }
          }
      }

      while (/(\+|(?<!^)-|\*|\/|\^|√|\(|\))/.test(updatedExpression)) {

          updatedExpression = updatedExpression.replace(/\+-/g,"-");
          updatedExpression = updatedExpression.replace(/--/g,"+");

          while (/\d+\.?\d*(\^|√)\d+\.?\d*/.test(updatedExpression)) {    // handle exponents, roots
            var searchExpRad = /\d+\.?\d*(\^|√)\d+\.?\d*/.exec(updatedExpression);
            var thisEval = searchExpRad[0].split(searchExpRad[1])
            if (searchExpRad[1]==="^") {
              thisEval = Math.pow(parseFloat(thisEval[0]),parseFloat(thisEval[1]));
            } else {
              thisEval = Math.pow(parseFloat(thisEval[1]),1/parseFloat(thisEval[0]));
            }
            updatedExpression = updatedExpression.replace(searchExpRad[0],thisEval.toString());
          }

          while (/\d+\.?\d*(\*|\/)\d+\.?\d*/.test(updatedExpression)) {       // handle multiplication, division
            var searchExpRadMD = /\d+\.?\d*(\*|\/)\d+\.?\d*/.exec(updatedExpression);
            var thisEvalMD = searchExpRadMD[0].split(searchExpRadMD[1]);
            if (searchExpRadMD[1]==="*") {
              thisEvalMD = parseFloat(thisEvalMD[0]) * parseFloat(thisEvalMD[1]);
            } else {
              thisEvalMD = parseFloat(thisEvalMD[0]) / parseFloat(thisEvalMD[1]);
            }
            updatedExpression = updatedExpression.replace(searchExpRadMD[0],thisEvalMD.toString());
          }

          while (/\d+\.?\d*(\+|-)\d+\.?\d*/.test(updatedExpression)) {       // handle addition, subtraction
              var searchExpRadAS = /\d+\.?\d*(\+|-)\d+\.?\d*/.exec(updatedExpression);
              var thisEvalAS = searchExpRadAS[0].split(searchExpRadAS[1]);    // split at either + or -
              if (searchExpRadAS[1]==="+") {
                thisEvalAS = parseFloat(thisEvalAS[0]) + parseFloat(thisEvalAS[1]);
              } else {
                thisEvalAS = parseFloat(thisEvalAS[0]) - parseFloat(thisEvalAS[1]);
              }
              updatedExpression = updatedExpression.replace(searchExpRadAS[0],thisEvalAS.toString());
          }

          while (/\(-?\d+\.?\d*\)/.exec(updatedExpression)) {      // eliminate superfluous parentheses
              searchExpRad = /\(-?\d+\.?\d*\)/.exec(updatedExpression);
              var simplified = searchExpRad[0].slice(1,-1);
              // console.log(searchExpRad);
              updatedExpression = updatedExpression.replace(searchExpRad[0],simplified);
          }


      }
      
      allNumbersFound = updatedExpression.match(regexForFloatLimit);
      if (allNumbersFound) {
          for (let number of allNumbersFound) {
              if (number >= Math.pow(2,53)) {
                  updatedExpression = "Error: exceeds float limit.";
              }
          }
      }

      setExpression(updatedExpression);

  }

  return (
    <div className="App">                 {/* background is blue */}

      <div id="calculator-container">

        <div id="big-grid">               {/* background is purple */}

          <AnswerDisplay sendExpressionToDisplay={expression} />

          <div id="keypad">               {/* background is red */}

            <CalcButton symbol="(" gridClass="kpCol1" colorGroup="medGray" onPress={() => sendSymbolToApp("(")} />
            <CalcButton symbol=")" gridClass="kpCol2" colorGroup="medGray" onPress={() => sendSymbolToApp(")")} />
            <CalcButton symbol="^" gridClass="kpCol3" colorGroup="medGray" onPress={() => sendSymbolToApp("^")} />
            <CalcButton symbol="√" gridClass="kpCol4" colorGroup="medGray" onPress={() => sendSymbolToApp("√")} />
            <CalcButton symbol="" gridClass="kpCol5" colorGroup="medGray" />

            <CalcButton symbol="7" gridClass="kpCol1" colorGroup="offWhite" onPress={() => sendSymbolToApp("7")} />
            <CalcButton symbol="8" gridClass="kpCol2" colorGroup="offWhite" onPress={() => sendSymbolToApp("8")} />
            <CalcButton symbol="9" gridClass="kpCol3" colorGroup="offWhite" onPress={() => sendSymbolToApp("9")} />

            <CalcButton symbol="÷" gridClass="kpCol4" colorGroup="ltGray" onPress={() => sendSymbolToApp("/")} />
            <CalcButton symbol="Cl." gridClass="kpCol5" cssId="clearButton" onPress={() => clearDisplay()} />

            <CalcButton symbol="4" gridClass="kpCol1" colorGroup="offWhite" onPress={() => sendSymbolToApp("4")} />
            <CalcButton symbol="5" gridClass="kpCol2" colorGroup="offWhite" onPress={() => sendSymbolToApp("5")} />
            <CalcButton symbol="6" gridClass="kpCol3" colorGroup="offWhite" onPress={() => sendSymbolToApp("6")} />
            <CalcButton symbol="*" gridClass="kpCol4" colorGroup="ltGray" onPress={() => sendSymbolToApp("*")} />

            <CalcButton symbol="1" gridClass="kpCol1" colorGroup="offWhite" onPress={() => sendSymbolToApp("1")} />
            <CalcButton symbol="2" gridClass="kpCol2" colorGroup="offWhite" onPress={() => sendSymbolToApp("2")} />
            <CalcButton symbol="3" gridClass="kpCol3" colorGroup="offWhite" onPress={() => sendSymbolToApp("3")} />
            <CalcButton symbol="–" gridClass="kpCol4" colorGroup="ltGray" onPress={() => sendSymbolToApp("-")} />
            <CalcButton symbol="=" gridClass="kpCol5" cssId="equalsButton" onPress={() => evaluateDisplay()} />

            <CalcButton symbol="0" gridClass="kpCol1" colorGroup="offWhite" onPress={() => sendSymbolToApp("0")} />
            <CalcButton symbol="." gridClass="kpCol2" colorGroup="medGray" onPress={() => sendSymbolToApp(".")} />
            <CalcButton symbol="←" gridClass="kpCol3" colorGroup="medGray" onPress={() => backspaceDisplay()} />
            <CalcButton symbol="+" gridClass="kpCol4" colorGroup="ltGray" onPress={() => sendSymbolToApp("+")} />

          </div>
          
        </div>

      </div>



      <header className="App-header">     {/* background is green */}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
