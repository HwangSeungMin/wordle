const answer = "APPLE";

let index = 0;
let attempts = 0;
let timer = 0;
function appStart() {
  const gameover = () => {
    displayGameOver();
    clearInterval(timer);
    return;
  };

  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "Game Clear !!";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:45vh; left:40vw; background-color:white; border:1px solid black; width:200px;height:50px;";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    attempts++;
    index = 0;
  };
  const question = () => {
    let check;
    check = prompt("One more try ? ( Y/N )");
    if (check.toUpperCase() === "Y") {
      location.reload();
    } else {
      clearInterval(timer);
      return;
    }
  };

  const handleEnterKey = () => {
    if (attempts === 5) {
      const div = document.createElement("div");
      div.innerText = "Game Over";
      div.style =
        "display:flex; justify-content:center; align-items:center; position:absolute; top:45vh; left:40vw; background-color:red; color:white; "
        +"border:1px solid black; width:200px;height:50px;";
      document.body.appendChild(div);
      setTimeout(() => {
        question();
      }, 0);
    }

    let answer_cnt = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      
      if (block.innerText === answer[i]) {
        block.style.background = "#6AAA64"; 
        document.querySelector(
          `.keyboard-column[data-key='${answer[i]}']`
        ).style.background = "#6AAA64"; 
        answer_cnt++;
      } else if (answer.includes(block.innerText)) {
        block.style.background = "#C9B458";
        document.querySelector(
          `.keyboard-column[data-key='${block.innerText}']`
        ).style.background = "#C9B458";
      } else {
        block.style.background = "grey";
        document.querySelector(
          `.keyboard-column[data-key='${answer[i]}']`
        ).style.background = "#d3d6da";
      }
    }

    if (answer_cnt === 5) {
      gameover();
    }

    nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preblock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preblock.innerText = "";
      if (index !== 0) index--;
    }
  };

  const handleKeydown = (event) => {
    const key = event.key;
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );
    if (key === "Backspace") {
      handleBackspace();
    }
    if (index === 5) {
      if (event.key == "Enter") {
        handleEnterKey();
      } else {
        return;
      }
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key.toUpperCase();
      index++;
    }
  };
  const handleKeyclick = (event) =>{
    const clickKey = event.target.innerText;
    const clickKeyCode = clickKey.charCodeAt(0);
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );
    if (clickKey === "Backspace") {
      handleBackspace();
    }
    if (index === 5) {
      if (clickKey == "Enter") {
        handleEnterKey();
      } else {
        return;
      }
    } else if (65 <= clickKeyCode && clickKeyCode <= 90 && clickKey.length == 1) {
      thisBlock.innerText = clickKey;
      index++;
    }
  }

  const startTimer = () => {
    const start_time = new Date();
    function setTime() {
      const now = new Date();
      const after = new Date(now - start_time);
      const min = after.getMinutes().toString().padStart(2, "0");
      const sec = after.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector(".time");
      timeDiv.innerHTML = `${min}:${sec}`;
    }

    timer = setInterval(setTime, 1000);
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("click", handleKeyclick);
}
appStart();
