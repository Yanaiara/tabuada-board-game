import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState('');
  const [cells, setCells] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [message, setMessage] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [boardSize, setBoardSize] = useState(25);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);  // Contador de acertos
  const [wrongCount, setWrongCount] = useState(0);  // Contador de erros

  useEffect(() => {
    if (isGameStarted) {
      generateQuestion();
    }
  }, [isGameStarted]);

  const generateQuestion = () => {
    const newNum1 = Math.floor(Math.random() * 10);
    const newNum2 = Math.floor(Math.random() * 10);
    setNum1(newNum1);
    setNum2(newNum2);
    setCorrectAnswer(newNum1 * newNum2);
    setAnswer('');
    setMessage(`Vamos lá, ${playerName}! Quanto é ${newNum1} x ${newNum2}?`);
  };

  const startGame = () => {
    if (playerName.trim() && boardSize > 0) {
      setCells(Array(boardSize).fill(null));
      setFeedback(Array(boardSize).fill(null));
      setIsGameStarted(true);
    } else {
      alert("Por favor, insira um nome válido e um tamanho de tabuleiro maior que zero.");
    }
  };

  const checkAnswer = () => {
    const newFeedback = [...feedback];

    if (parseInt(answer) === correctAnswer) {
      newFeedback[currentPosition] = '❤️';
      setFeedback(newFeedback);
      setCorrectCount(correctCount + 1);  // Incrementa o contador de acertos
      setMessage(`Parabéns, ${playerName}! Resposta correta!`);
    } else {
      newFeedback[currentPosition] = '😢';
      setFeedback(newFeedback);
      setWrongCount(wrongCount + 1);  // Incrementa o contador de erros
      setMessage(`Não desanime, ${playerName}! A resposta correta é ${correctAnswer}. Vamos tentar outra vez!`);
    }
  };

  const nextQuestion = () => {
    if (parseInt(answer) === correctAnswer) {
      movePlayer();
    }
    generateQuestion();
  };

  const movePlayer = () => {
    const newCells = [...cells];
    newCells[currentPosition] = null;

    if (currentPosition < boardSize - 1) {
      newCells[currentPosition + 1] = 'player';
      setCurrentPosition(currentPosition + 1);
      setMessage(`Boa, ${playerName}! Você avançou uma casa!`);
    } else {
      setMessage(`Fantástico, ${playerName}! Você é incrível!`);
      endGame();  // Chama o fim do jogo
    }
    setCells(newCells);
  };

  const endGame = () => {
    alert(`Jogo Finalizado!\nAcertos: ${correctCount}\nErros: ${wrongCount}`);
    resetGame();
  };

  const resetGame = () => {
    setCurrentPosition(0);
    setCells(Array(boardSize).fill(null));
    setFeedback(Array(boardSize).fill(null));
    setCorrectCount(0);  // Reseta o contador de acertos
    setWrongCount(0);  // Reseta o contador de erros
    generateQuestion();
  };

  if (!isGameStarted) {
    return (
      <div className="App">
        <h1>Bem-vindo ao jogo da Tabuada!</h1>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Nome do Jogador"
          style={{ marginBottom: '20px' }}
        />
        <input
          type="number"
          min="1"
          value={boardSize}
          onChange={(e) => setBoardSize(parseInt(e.target.value))}
          placeholder="Tamanho do Tabuleiro"
          style={{ marginBottom: '20px' }}
        />
        <button onClick={startGame}>Iniciar Jogo</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Tabuada da {playerName}</h1>
      <div className="board" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(60px, 1fr))` }}>
        {cells.map((cell, index) => (
          <div key={index} className="cell">
            {cell === 'player' && <div className="player"></div>}
            {feedback[index]}
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
