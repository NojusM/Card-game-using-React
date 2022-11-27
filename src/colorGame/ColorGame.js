import React, { useState } from "react";
import "./color.css";

export default function ColorGame() {
  const [colors, setColors] = useState(["#FF0000", "#00FF00", "#0000FF"]);
  const [answer, setAnswer] = useState("#FF0000");
  const hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  const [isCorrect, setIsCorrect] = useState(null);

  //Get random color array
  var tempColor = ["#", "#", "#"];
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 6; i++) {
      tempColor[j] += hex[Math.floor(Math.random() * hex.length)];
    }
  }

  function handleColorPick(color) {
    if (color === answer) {
      setIsCorrect(true);
      setColors(tempColor);
      setAnswer(tempColor[Math.floor(Math.random() * tempColor.length)]);
    } else {
      setIsCorrect(false);
    }
  }

  return (
    <>
      <div className="cardGame">
        <div className="color" style={{ backgroundColor: answer }}></div>

        {colors.map((color, index) => (
          <button
            key={index}
            className="button"
            onClick={() => {
              handleColorPick(color);
            }}
          >
            {color}
          </button>
        ))}
        <div className={isCorrect ? "answer green" : "answer"}>
          {isCorrect ? "Correct!" : "False!"}
        </div>
      </div>
    </>
  );
}
