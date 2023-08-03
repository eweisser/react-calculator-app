import logo from './logo.svg';
import './App.css';
import CalcButton from './components/calc-button/calc-button';
// import Grid from './Grid';

// body background is orange

function App() {
  return (
    <div className="App">                 {/* background is blue */}

      <div id="calculator-container">

        <div id="big-grid">               {/* background is purple */}

          <div id="answer-display">
          </div>

          <div id="keypad">               {/* background is red */}

            <CalcButton symbol="(" gridClass="kpCol1" colorGroup="medGray" onClick={() => this.sendSymbolToDisplay("(")} />
            <CalcButton symbol=")" gridClass="kpCol2" colorGroup="medGray" onClick={() => this.sendSymbolToDisplay(")")} />
            <CalcButton symbol="^" gridClass="kpCol3" colorGroup="medGray" onClick={() => this.sendSymbolToDisplay("^")} />
            <CalcButton symbol="√" gridClass="kpCol4" colorGroup="medGray" onClick={() => this.sendSymbolToDisplay("√")} />
            <CalcButton symbol="" gridClass="kpCol5" colorGroup="medGray" />

            <CalcButton symbol="7" gridClass="kpCol1" colorGroup="offWhite" onClick={() => this.sendSymbolToDisplay("7")} />
            <CalcButton symbol="8" gridClass="kpCol2" colorGroup="offWhite" onClick={() => this.sendSymbolToDisplay("8")} />
            <CalcButton symbol="9" gridClass="kpCol3" colorGroup="offWhite" onClick={() => this.sendSymbolToDisplay("9")} />

            <CalcButton symbol="÷" gridClass="kpCol4" colorGroup="ltGray" onClick={() => this.sendSymbolToDisplay("/")} />
            <CalcButton symbol="Cl." gridClass="kpCol5" cssId="clearButton" onClick={() => this.clearDisplay()} />

            <CalcButton symbol="4" gridClass="kpCol1" colorGroup="offWhite" onClick={() => this.sendSymbolToDisplay("4")} />
            <CalcButton symbol="5" gridClass="kpCol2" colorGroup="offWhite" onClick={() => this.sendSymbolToDisplay("5")} />
            <CalcButton symbol="6" gridClass="kpCol3" colorGroup="offWhite" onClick={() => this.sendSymbolToDisplay("6")} />
            <CalcButton symbol="*" gridClass="kpCol4" colorGroup="ltGray" onClick={() => this.sendSymbolToDisplay("*")} />

            <CalcButton symbol="1" gridClass="kpCol1" colorGroup="offWhite" onClick={() => this.sendSymbolToDisplay("1")} />
            <CalcButton symbol="2" gridClass="kpCol2" colorGroup="offWhite" onClick={() => this.sendSymbolToDisplay("2")} />
            <CalcButton symbol="3" gridClass="kpCol3" colorGroup="offWhite" onClick={() => this.sendSymbolToDisplay("3")} />
            <CalcButton symbol="–" gridClass="kpCol4" colorGroup="ltGray" onClick={() => this.sendSymbolToDisplay("-")} />
            <CalcButton symbol="=" gridClass="kpCol5" cssId="equalsButton" onClick={() => this.evaluateDisplay()} />

            <CalcButton symbol="0" gridClass="kpCol1" colorGroup="offWhite" onClick={() => this.sendSymbolToDisplay("0")} />
            <CalcButton symbol="." gridClass="kpCol2" colorGroup="medGray" onClick={() => this.sendSymbolToDisplay(".")} />
            <CalcButton symbol="←" gridClass="kpCol3" colorGroup="medGray" onClick={() => this.backspaceDisplay()} />
            <CalcButton symbol="+" gridClass="kpCol4" colorGroup="ltGray" onClick={() => this.sendSymbolToDisplay("+")} />

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
