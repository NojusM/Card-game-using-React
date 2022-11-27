import { useState } from "react";
import "./App.css";
import CardGame from "./cardGame/CardGame";
import ColorGame from "./colorGame/ColorGame";

function App() {
  const [game, setGame] = useState("Home");
  const games = ["Home", "Card Guesser", "Color Guesser"];

  return (
    <>
      <div className="nav">
        {games.map((game) => (
          <button key={game} onClick={() => setGame(game)}>
            {game}
          </button>
        ))}
      </div>
      <div className="games">
        {game === "Home" && (
          <div className="main">
            <h1>Hello!</h1>
            <p>Welcome to my demo games</p>
            <p>
              made using <b>React</b>
            </p>
          </div>
        )}
        {game === "Card Guesser" && <CardGame />}
        {game === "Color Guesser" && <ColorGame />}
      </div>
    </>
  );
}

export default App;
