import React, { useState, useEffect, useRef } from 'react';
import { evaluate } from 'mathjs';
import './Addition.css';

const operators = ['+', '-', '*', '/', '%', '(', ')', '.'];

// Simple, very subtle click sound (Web Audio API)
const useClickSound = () => {
  const audioCtx = useRef(null);

  useEffect(() => {
    audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
  }, []);

  const playClick = () => {
    if (!audioCtx.current) return;

    const osc = audioCtx.current.createOscillator();
    const gainNode = audioCtx.current.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, audioCtx.current.currentTime); // slightly higher frequency
    gainNode.gain.setValueAtTime(0.05, audioCtx.current.currentTime); // very low volume

    osc.connect(gainNode);
    gainNode.connect(audioCtx.current.destination);

    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.03); // shorter duration
  };

  return playClick;
};

const Add = () => {
  const [value, setValue] = useState('');
  const playClick = useClickSound();

  const handleInput = (input) => {
    playClick();
    const lastChar = value.slice(-1);

    if (
      operators.includes(input) &&
      (value === '' || operators.includes(lastChar)) &&
      !(input === '-' && value === '')
    ) {
      return;
    }

    if (input === '.') {
      const parts = value.split(/[+\-*\/()%]/);
      const lastPart = parts[parts.length - 1];
      if (lastPart.includes('.')) return;
    }

    setValue(value + input);
  };

  const handleCalculate = () => {
    playClick();
    try {
      const result = evaluate(value);
      setValue(result.toString());
    } catch (error) {
      setValue('Error');
    }
  };

  const handleClear = () => {
    playClick();
    setValue('');
  };

  const handleDelete = () => {
    playClick();
    setValue(value.slice(0, -1));
  };

  const handleSqrt = () => {
    playClick();
    try {
      const result = Math.sqrt(eval(value));
      setValue(result.toString());
    } catch {
      setValue('Error');
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="display">
            <input
              key={value}
              type="text"
              value={value}
              readOnly
              aria-label="Calculator display"
              placeholder="0"
            />
          </div>
          <div className="buttons-row">
            <button type="button" onClick={handleClear} aria-label="All Clear" className="btn-ac">
              AC
            </button>
            <button type="button" onClick={handleDelete} aria-label="Delete last character" className="btn-del">
              DE
            </button>
            <button type="button" onClick={handleSqrt} aria-label="Square Root" className="btn-op-extra">
              √
            </button>
            <button type="button" onClick={() => handleInput('%')} aria-label="Modulo" className="btn-op-extra">
              %
            </button>
          </div>
          <div className="buttons-row">
            <button type="button" onClick={() => handleInput('7')} aria-label="7" className="btn-num">
              7
            </button>
            <button type="button" onClick={() => handleInput('8')} aria-label="8" className="btn-num">
              8
            </button>
            <button type="button" onClick={() => handleInput('9')} aria-label="9" className="btn-num">
              9
            </button>
            <button type="button" onClick={() => handleInput('*')} aria-label="Multiply" className="btn-op">
              ×
            </button>
          </div>
          <div className="buttons-row">
            <button type="button" onClick={() => handleInput('4')} aria-label="4" className="btn-num">
              4
            </button>
            <button type="button" onClick={() => handleInput('5')} aria-label="5" className="btn-num">
              5
            </button>
            <button type="button" onClick={() => handleInput('6')} aria-label="6" className="btn-num">
              6
            </button>
            <button type="button" onClick={() => handleInput('+')} aria-label="Add" className="btn-op">
              +
            </button>
          </div>
          <div className="buttons-row">
            <button type="button" onClick={() => handleInput('1')} aria-label="1" className="btn-num">
              1
            </button>
            <button type="button" onClick={() => handleInput('2')} aria-label="2" className="btn-num">
              2
            </button>
            <button type="button" onClick={() => handleInput('3')} aria-label="3" className="btn-num">
              3
            </button>
            <button type="button" onClick={() => handleInput('-')} aria-label="Subtract" className="btn-op">
              −
            </button>
          </div>
          <div className="buttons-row last-row">
            <button type="button" onClick={() => handleInput('00')} aria-label="Double zero" className="btn-num">
              00
            </button>
            <button type="button" onClick={() => handleInput('0')} aria-label="0" className="btn-num">
              0
            </button>
            <button type="button" onClick={() => handleInput('.')} aria-label="Decimal point" className="btn-op">
              .
            </button>
            <button type="button" onClick={handleCalculate} aria-label="Calculate result" className="btn-equal">
              =
            </button>
          </div>
        </form>
        <div className="footer-text">Simple React Calculator</div>
      </div>
    </div>
  );
};

export default Add;