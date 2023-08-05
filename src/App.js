import logo from './logo.svg';
import './App.css';
import CalcButton from './components/calc-button/calc-button';
import AnswerDisplay from './components/answer-display';

// body background is orange

function App() {

  function handleEvent(symbol) {
      alert(symbol);
  };

  return (
    <div className="App">                 {/* background is blue */}

      <div id="calculator-container">

        <div id="big-grid">               {/* background is purple */}

          <AnswerDisplay ref={answerDisplay => this.answerDisplay = answerDisplay}/>

          <div id="keypad">               {/* background is red */}

            <CalcButton symbol="(" gridClass="kpCol1" colorGroup="medGray" />
            <CalcButton symbol=")" gridClass="kpCol2" colorGroup="medGray" />
            <CalcButton symbol="^" gridClass="kpCol3" colorGroup="medGray" />
            <CalcButton symbol="√" gridClass="kpCol4" colorGroup="medGray" />
            <CalcButton symbol="" gridClass="kpCol5" colorGroup="medGray" />

            <CalcButton symbol="7" gridClass="kpCol1" colorGroup="offWhite" onPress={() => handleEvent("7")} />
            <CalcButton symbol="8" gridClass="kpCol2" colorGroup="offWhite" />
            <CalcButton symbol="9" gridClass="kpCol3" colorGroup="offWhite" />

            <CalcButton symbol="÷" gridClass="kpCol4" colorGroup="ltGray" />
            <CalcButton symbol="Cl." gridClass="kpCol5" cssId="clearButton" />

            <CalcButton symbol="4" gridClass="kpCol1" colorGroup="offWhite" />
            <CalcButton symbol="5" gridClass="kpCol2" colorGroup="offWhite" />
            <CalcButton symbol="6" gridClass="kpCol3" colorGroup="offWhite" />
            <CalcButton symbol="*" gridClass="kpCol4" colorGroup="ltGray" />

            <CalcButton symbol="1" gridClass="kpCol1" colorGroup="offWhite" onPress={() => handleEvent("1")} />
            <CalcButton symbol="2" gridClass="kpCol2" colorGroup="offWhite" onPress={() => handleEvent("2")} />
            <CalcButton symbol="3" gridClass="kpCol3" colorGroup="offWhite" onPress={() => handleEvent("3")} />
            <CalcButton symbol="–" gridClass="kpCol4" colorGroup="ltGray" onPress={() => handleEvent("-")} />
            <CalcButton symbol="=" gridClass="kpCol5" cssId="equalsButton" onPress={() => this.evaluateDisplay()} />

            <CalcButton symbol="0" gridClass="kpCol1" colorGroup="offWhite" onPress={() => handleEvent("0")} />
            <CalcButton symbol="." gridClass="kpCol2" colorGroup="medGray" onPress={() => handleEvent(".")} />
            <CalcButton symbol="←" gridClass="kpCol3" colorGroup="medGray" onPress={() => this.backspaceDisplay()} />
            <CalcButton symbol="+" gridClass="kpCol4" colorGroup="ltGray" onPress={() => handleEvent("+")} />

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
