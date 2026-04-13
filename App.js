import './App.css';
import {useState} from 'react';
import { NumericFormat } from 'react-number-format';

function App() {

  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [lastSecond, setLastSecond] = useState("");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  const calculate = (first, second, operator) => {
    const a = parseFloat(first);
    const b = parseFloat(second);
    
    switch (operator) {
      case "/":
        return (a / b);
      case "X":
        return (a * b);
      case "+":
        return (a + b);
      case "-":
        return (a - b);
      default:
        return first;
    }
  };
  
  const inputNum = (e) => {
    const value = e.target.innerText;

    if (value === "." && curState.includes(".")) return;

    if (total) {
      setCurState(value);
      setTotal(false);
      return;
    }

    setCurState(prev => prev === "0" ? value : prev + value);
  };

  const operatorType = (e) => {
    const operator = e.target.innerText;

    if (curState === "" && preState !== "") {
      setOperator(operator);
      return;
    }

    if (preState === "") {
      setPreState(curState);
    }
    else {
      const result = calculate(preState, curState, operator);
      setPreState(String(result));
    }

    setCurState("");
    setOperator(operator);
    setTotal(false);
  };

  const equals = () => {
    if (operator === null) return;

    let secondValue = curState;

    if (curState === "") {
      secondValue = lastSecond;
    }

    if (secondValue === "") return;

    const result = calculate(preState, secondValue, operator);

    setPreState(String(result));
    setCurState("");
    setLastSecond(secondValue);
    setTotal(true);
  };

  const minusPlus = () => {
    if (!curState) return;

    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1));
    }
    else {
      setCurState("-" + curState);
    }
  };

  const percent = () => {
    if (!curState) return;

    preState
      ? setCurState(String((parseFloat(curState) / 100) * parseFloat(preState)))
      : setCurState(String(parseFloat(curState) / 100));
  }

  const reset = () => {
    setPreState("");
    setCurState("");
    setLastSecond("");
    setOperator(null);
    setTotal(false);
  };

  const displayValue = curState || preState || "0";

  return (
    <div className='container'>
      <div className="wrapper">

        <div className="screen">
          <NumericFormat
            value={displayValue}
            displayType="text"
            thousandSeparator
          />
        </div>

        <div className="button clear" onClick={reset}>AC</div>
        <div className="button light-gray" onClick={percent}>%</div>
        <div className="button light-gray" onClick={minusPlus}>+/-</div>
        <div className={`button operator ${operator === "/" ? "active" : ""}`} onClick={operatorType}>/</div>

        <div className="button number" onClick={inputNum}>7</div>
        <div className="button number" onClick={inputNum}>8</div>
        <div className="button number" onClick={inputNum}>9</div>
        <div className={`button operator ${operator === "X" ? "active" : ""}`} onClick={operatorType}>X</div>

        <div className="button number" onClick={inputNum}>4</div>
        <div className="button number" onClick={inputNum}>5</div>
        <div className="button number" onClick={inputNum}>6</div>
        <div className={`button operator ${operator === "+" ? "active" : ""}`} onClick={operatorType}>+</div>

        <div className="button number" onClick={inputNum}>1</div>
        <div className="button number" onClick={inputNum}>2</div>
        <div className="button number" onClick={inputNum}>3</div>
        <div className={`button operator ${operator === "-" ? "active" : ""}`} onClick={operatorType}>-</div>

        <div className="button number zero" onClick={inputNum}>0</div>
        <div className="button number" onClick={inputNum}>.</div>
        <div className="button equals" onClick={equals}>=</div>

      </div>
    </div>
  ); 
}

export default App;
