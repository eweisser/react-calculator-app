import logo from './logo.svg';
import './App.css';
import CalcButton from './components/calc-button/calc-button';

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

            <CalcButton symbol="7" gridclass="kpCol1" colorGroup="offWhite" onClick={() => this.sendSymbolToDisplay("7")} />

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
