import React, { useState, useEffect } from 'react';
import './App.css';

const boardSize = 25; // Tamanho do tabuleiro

function App() {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState('');
  const [cells, setCells] = useState(Array(boardSize).fill(null));
  const [feedback, setFeedback] = useState(Array(boardSize).fill(null));
  const [message, setMessage] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0); // Armazena a resposta correta

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const newNum1 = Math.floor(Math.random() * 10); // Gera o primeiro número
    const newNum2 = Math.floor(Math.random() * 10); // Gera o segundo número
    setNum1(newNum1);
    setNum2(newNum2);
    setCorrectAnswer(newNum1 * newNum2); // Calcula e armazena a resposta correta
    setAnswer('');
    setMessage(`Vamos lá, Maria Cecilia! Quanto é ${newNum1} x ${newNum2}?`);
  };

  const checkAnswer = () => {
    const newFeedback = [...feedback];

    if (parseInt(answer) === correctAnswer) {
      newFeedback[currentPosition] = '❤️'; // Coração para resposta correta
      setFeedback(newFeedback);
      setMessage('Parabéns, Maria Cecilia! Resposta correta!');
    } else {
      newFeedback[currentPosition] = '😢'; // Carinha triste para resposta incorreta
      setFeedback(newFeedback);
      setMessage(`Não desanime, Maria Cecilia! A resposta correta é ${correctAnswer}. Vamos tentar outra vez!`);
    }
  };

  const nextQuestion = () => {
    if (parseInt(answer) === correctAnswer) {
      movePlayer();
    }
    generateQuestion();
  };

  const tryAgain = () => {
    setAnswer('');
    setMessage(`Tente novamente, Maria Cecilia! Quanto é ${num1} x ${num2}?`);
  };

  const movePlayer = () => {
    const newCells = [...cells];
    newCells[currentPosition] = null; // Limpa a posição anterior

    if (currentPosition < boardSize - 1) {
      newCells[currentPosition + 1] = 'player';
      setCurrentPosition(currentPosition + 1);
      setMessage('Boa, Maria Cecilia! Você avançou uma casa!');
    } else {
      setMessage('Fantástico, Maria! Você é incrivel!');
      resetGame();
    }
    setCells(newCells);
  };

  const resetGame = () => {
    setCurrentPosition(0);
    setCells(Array(boardSize).fill(null));
    setFeedback(Array(boardSize).fill(null));
    generateQuestion();
  };

  return (
    <div className="App">
      <h1>Tabuada da Maria</h1>
      <div className="board">
        {cells.map((cell, index) => (
          <div key={index} className="cell">
            {cell === 'player' && <div className="player"></div>}
            {feedback[index]} {/* Exibe o coração ou carinha triste */}
          </div>
        ))}
      </div>
      <div className="question">{message}</div>
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Sua resposta"
      />
      <button onClick={checkAnswer}>Responder</button>
      <button onClick={nextQuestion} style={{ marginLeft: '10px' }}>Próxima Questão</button>
    </div>
  );
}

export default App;
