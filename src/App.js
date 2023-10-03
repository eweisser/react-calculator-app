import './App.css';
import CalcButton from './components/calc-button/calc-button';
import AnswerDisplay from './components/answer-display';
import React, { useState } from 'react';
import { useCallback } from 'react';

function App() {

  const handleKeyDown = (event) => {
    if ("1234567890.+-*/()^".includes(event.key)) {
      sendExpressionToDisplay(event.key);
    } else if (event.key === "=" || event.key === "Enter") {
      evaluateDisplay();
    } else if (event.key === "Backspace") {
      backspaceDisplay();
    } else if (event.key === "Escape") {
      clearDisplay();
    }
  };

  const [expression, setExpression] = useState(0);

  const emailInput = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const sendSymbolToApp = (symbolFromButton) => {
      sendExpressionToDisplay(symbolFromButton);
  };

  const sendExpressionToDisplay = (newSymbol) => {
      // console.log("case Z");
      if (expression.toString()==="0" && !".+*/^√".includes(newSymbol)) {
          // console.log("case A");
          setExpression(newSymbol);
      } else if (expression.toString().slice(0,1)==="E") {
          // console.log("case B");
          setExpression(newSymbol);
      } else if (/(\+|\*|\/|\^|√|-|\()$/.test(expression) && "+*/^√)".includes(newSymbol)) {
          // console.log("case C");
          // do nothing--invalid input sequence e.g. ++, +), -+, -), (+, ()
      } else if (/\.\d*$/.test(expression) && newSymbol===".") {
          // console.log("case D");
          // do nothing--invalid input sequence: double decimal
      } else if (/(\)|\.)$/.test(expression) && newSymbol===".") {
          // console.log("case E");
          // do nothing--invalid input sequence: ).
      } else if (expression.toString().slice(-1)===")" && /\d/.test(newSymbol)) {
          // console.log("case F");
          // do nothing--invalid input sequence: e.g. )3
      } else if (/(\d|\)|\.)$/.test(expression) && newSymbol==="(") { 
          // console.log("case G");
          setExpression(expression + "*(");     // special cases assuming the user intends multiplication
      } else {
          // console.slog("case H");
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

  const oppositeSign = () => {            // when user presses "+/-" button
    var updatedExpression = expression;

    if (expression.toString()==="0") {                  // if display currently is just 0, do nothing

    } else if ( /-?\d+\.?\d*$/.test(expression) ) {     // if display currently ends with a number or decimal point
      var numberToNegate = /-?\d+\.?\d*$/.exec(expression);
      var negationPerformed = -numberToNegate;
      if ( /(\d|\.)-\d+\.?\d*$/.test(expression) ) {
        updatedExpression = expression.replace(numberToNegate,"-"+numberToNegate);
      } else {
        updatedExpression = expression.replace(numberToNegate,negationPerformed);
      }
      setExpression(updatedExpression);

    } else if ( /\)+$/.test(expression) ) {     // if display currently ends with at least one closing parenthesis
      var parenthesesStillOpen = 0;
      let i = expression.length;
      do {
          i--;
          if (expression[i] === ")") {
            parenthesesStillOpen++;
          } else if (expression[i] === "(") {
            parenthesesStillOpen--;
          }
      } while (i >= 0 && parenthesesStillOpen > 0);
      updatedExpression = expression.slice(0,i)+"-"+expression.slice(i);
      setExpression(updatedExpression);

    } else if ( /-|\+|\*|\/|\^|√|\($/.test(expression) ) {     // if display currently ends with +, -, *, /, ^, √, or open parenthesis
      setExpression(expression + "-");

    } else if (expression && expression.length > 1) {     // EXCEPTION HANDLER -- act like backspace
      setExpression(expression.slice(0,-1));
    } else {
      setExpression(0);
    }
}

  const evaluateDisplay = () => {
      // need to address division by 0 and 0th roots
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

          while (/-?\d+\.?\d*(\^|√)-?\d+\.?\d*/.test(updatedExpression)) {    // handle exponents, roots
            var searchExpRad = /-?\d+\.?\d*(\^|√)-?\d+\.?\d*/.exec(updatedExpression);
            var thisEval = searchExpRad[0].split(searchExpRad[1])
            if (searchExpRad[1]==="^") {
              thisEval = Math.pow(parseFloat(thisEval[0]),parseFloat(thisEval[1]));
            } else {
              thisEval = Math.pow(parseFloat(thisEval[1]),1/parseFloat(thisEval[0]));
            }
            updatedExpression = updatedExpression.replace(searchExpRad[0],thisEval.toString());
          }

          while (/-?\d+\.?\d*(\*|\/)-?\d+\.?\d*/.test(updatedExpression)) {       // handle multiplication, division
            var searchExpRadMD = /-?\d+\.?\d*(\*|\/)-?\d+\.?\d*/.exec(updatedExpression);
            var thisEvalMD = searchExpRadMD[0].split(searchExpRadMD[1]);
            if (searchExpRadMD[1]==="*") {
              thisEvalMD = parseFloat(thisEvalMD[0]) * parseFloat(thisEvalMD[1]);
            } else {
              thisEvalMD = parseFloat(thisEvalMD[0]) / parseFloat(thisEvalMD[1]);
            }
            updatedExpression = updatedExpression.replace(searchExpRadMD[0],thisEvalMD.toString());
          }

          while (/-?\d+\.?\d*(\+|-)\d+\.?\d*/.test(updatedExpression)) {       // handle addition, subtraction
              var searchExpRadAS = /-?\d+\.?\d*(\+|-)\d+\.?\d*/.exec(updatedExpression);
              var thisEvalAS = searchExpRadAS[0].split(searchExpRadAS[1]);
              var operand1 = thisEvalAS.length < 3 ? thisEvalAS[0] : -thisEvalAS[1];
              var operand2 = thisEvalAS.length < 3 ? thisEvalAS[1] : thisEvalAS[2];
              if (searchExpRadAS[1]==="+") {
                thisEvalAS = parseFloat(operand1) + parseFloat(operand2);
              } else {
                thisEvalAS = parseFloat(operand1) - parseFloat(operand2);
              }
              updatedExpression = updatedExpression.replace(searchExpRadAS[0],thisEvalAS.toString());
          }

          while (/\(-?\d+\.?\d*\)/.exec(updatedExpression)) {      // eliminate superfluous parentheses
              searchExpRad = /\(-?\d+\.?\d*\)/.exec(updatedExpression);
              var simplified = searchExpRad[0].slice(1,-1);
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
    <div className="App" tabIndex="0" onKeyDown={handleKeyDown} ref={emailInput} >                 {/* background is blue */}

      <div id="calculator-container">

        <div id="big-grid">               {/* background is purple */}

          <AnswerDisplay sendExpressionToDisplay={expression} />

          <div id="keypad">               {/* background is red */}

            <CalcButton symbol="(" gridClass="kpCol1" colorGroup="medGray" onPress={() => sendSymbolToApp("(")} />
            <CalcButton symbol=")" gridClass="kpCol2" colorGroup="medGray" onPress={() => sendSymbolToApp(")")} />
            <CalcButton symbol="^" gridClass="kpCol3" colorGroup="medGray" onPress={() => sendSymbolToApp("^")} />
            <CalcButton symbol="√" gridClass="kpCol4" colorGroup="medGray" onPress={() => sendSymbolToApp("√")} />
            <CalcButton symbol="+/-" gridClass="kpCol5" colorGroup="medGray" onPress={() => oppositeSign()} />

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

    </div>
  );
}

export default App;
