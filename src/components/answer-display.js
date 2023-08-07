import { useState } from 'react';

const AnswerDisplay = ({sendSymbolToDisplay}) => {

    // function receiveSymbol() {
    //     setDisplayedExpression({sendSymbolToDisplay});
    // }

    var current = sendSymbolToDisplay;
    var displayedExpression = current;

    //     var current = this.state.displayedExpression;
    //     if (current==="0" && !".+*/^√".includes(newSymbol)) {
    //       this.setState({       // replace 0 with the new symbol
    //         displayedExpression: newSymbol
    //       });
    //     } else if (/(\+|\*|\/|\^|√|\-|\()$/.test(current) && "+*/^√)".includes(newSymbol)) {
    //           // do nothing--invalid input sequence e.g. ++, +), -+, -), (+, ()
    //     } else if (/(\)|\.)$/.test(current) && newSymbol===".") {
    //           // do nothing--invalid input sequence: ). or ..
    //     } else if (current.slice(-1)===")" && /\d/.test(newSymbol)) {
    //           // do nothing--invalid input sequence: e.g. )3
    //     } else if (/(\d|\)|\.)$/.test(current) && newSymbol==="(") {
    //        this.setState({        // special cases assuming the user intends multiplication
    //         displayedExpression: current + "*("
    //       });
    //     } else {
                // function handleDisplayedExpression() {
                //     setDisplayedExpression(newSymbol);
                // }
    //     }


    // function evaluateDisplay() {
    //     var current = this.state.displayedExpression;
    //     // first loop necessitated by parentheses--when has the expression reached its final simplified form? ! Note: this leads to infinite loops with bad user input
    //     while (/(\+|(?<!^)\-|\*|\/|\^|√|\(|\))/.test(current)) {
    //       current = current.replace(/\+\-/g,"-");
    //       current = current.replace(/\-\-/g,"+");
    //       while (/\d+\.?\d*(\^|√)\d+\.?\d*/.test(current)) {    // handle exponents, roots
    //         var searchExpRad = /\d+\.?\d*(\^|√)\d+\.?\d*/.exec(current);
    //         var thisEval = searchExpRad[0].split(searchExpRad[1])
    //         if (searchExpRad[1]==="^") {
    //           thisEval = Math.pow(parseFloat(thisEval[0]),parseFloat(thisEval[1]));
    //         } else {
    //           thisEval = Math.pow(parseFloat(thisEval[0]),1/parseFloat(thisEval[1]));
    //         }
    //         current = current.replace(searchExpRad[0],thisEval.toString());
    //       }
    //       while (/\d+\.?\d*(\*|\/)\d+\.?\d*/.test(current)) {   // handle multiplication, division
    //         console.log(current);
    //         var searchExpRad = /\d+\.?\d*(\*|\/)\d+\.?\d*/.exec(current);
    //         var thisEval = searchExpRad[0].split(searchExpRad[1])
    //         if (searchExpRad[1]==="*") {
    //           thisEval = parseFloat(thisEval[0]) * parseFloat(thisEval[1]);
    //         } else {
    //           thisEval = parseFloat(thisEval[0]) / parseFloat(thisEval[1]);
    //         }
    //         current = current.replace(searchExpRad[0],thisEval.toString());
    //       }
    //       while (/\d+\.?\d*(\+|\-)\d+\.?\d*/.test(current)) {       // handle addition, subtraction
    //         var searchExpRad = /\d+\.?\d*(\+|\-)\d+\.?\d*/.exec(current);
    //         var thisEval = searchExpRad[0].split(searchExpRad[1])
    //         if (searchExpRad[1]==="+") {
    //           thisEval = parseFloat(thisEval[0]) + parseFloat(thisEval[1]);
    //         } else {
    //           thisEval = parseFloat(thisEval[0]) - parseFloat(thisEval[1]);
    //         }
    //         current = current.replace(searchExpRad[0],thisEval.toString());
    //       }
    
    //       while (/\(\-?\d+\.?\d*\)/.exec(current)) {      // eliminate superfluous parentheses
    //         var searchExpRad = /\(\-?\d+\.?\d*\)/.exec(current);
    //         var simplified = searchExpRad[0].slice(1,-1);
    //         // console.log(searchExpRad);
    //         current = current.replace(searchExpRad[0],simplified);
    //       }
    //     }


    
    //   }   // end of evaluateDisplay function


    return (
        <div id={`answerDisplay`}>
            {displayedExpression}
        </div>
    );
}

export default AnswerDisplay;