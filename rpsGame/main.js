const htmlElements = {
  options: ["paper", "scissors", "rock"],
  paper: document.getElementById("paper"),
  rock: document.getElementById("rock"),
  scissors: document.getElementById("scissors"),
  messageDiv: document.getElementById("winner"),
  divContainer: document.getElementById("container"),
  startButton: document.getElementById("startGame"),
  startContainer: document.getElementById("start"),
  round: 1,

  imageEvent: () => {    
        for (let i = 0; i < htmlElements.options.length; i++) {
          const element = document.getElementById(htmlElements.options[i]);
          element.addEventListener("click", () => {  
            if (gameService.userPoints === 9 || gameService.computerPoints === 9) {
                gameService.resetGame();
                return;
            } 
            let user = element.getAttribute("alt");
            document.getElementById("userChoice").innerText = `Your choice is ${user}`;
            let chooseForComputer = Math.floor(Math.random() * 3);
            console.log(chooseForComputer)
            let computer = htmlElements.options[chooseForComputer];
            document.getElementById("computerChoice").innerText = `Computer choice is ${computer}`;
            gameService.checkWinner(user, computer);
            htmlElements.round++;
            document.getElementById("round").innerText = `Round ${htmlElements.round}`;
          });
        }
      },
    }


const gameService = {
  startGame: () => {
    htmlElements.startContainer.style.display = "none";
    htmlElements.divContainer.innerHTML += `
                <h4 id="round">Round ${htmlElements.round}</h4>
                <div class="imgContainer">
                    <img src="./rock.png" alt="rock" id="rock">
                    <img src="./paper.png" alt="paper" id="paper">
                    <img src="./scissors.png" alt="scissors" id="scissors">
                </div>
                <div id="winner"></div>
                <div class="pointsContainer">
                    <h4 id="userChoice"></h4>
                    <h4 id="computerChoice"></h4>
                </div>
                <div class="pointsContainer" >
                    <section id="userStars"></section>
                    <section id="computerStars"></section>
                </div>
                <div class="pointsContainer">
                    <p class="points" id="userPoints">Your score: <span id="yourPoints">0</span></p>
                    <p class="points" id="pointsOfComputer">Computer score: <span id="computerPoints">0</span></p>
                </div>            
            `;
            
    htmlElements.imageEvent();
  },
  userPoints: 0,
  computerPoints: 0,
  checkWinner: (user, computer) => {
    const rules = {
      rock: "scissors",
      paper: "rock",
      scissors: "paper",
    };
    if (user === computer) {
      gameService.displayMessage("Tie!");
    } else if (rules[user] === computer) {
      gameService.win("user");
    } else {
      gameService.win("computer");
    }
  },
  win: (winner) => {
    
    if (winner === "user") {
      gameService.userPoints++;
      document.getElementById("yourPoints").innerText = gameService.userPoints;
      starService.createStar(gameService.userPoints,'userStars')
      gameService.displayMessage("You win!");
    } else {
      gameService.computerPoints ++;
      document.getElementById("computerPoints").innerText = gameService.computerPoints;
      starService.createStar(gameService.computerPoints,'computerStars')
      gameService.displayMessage("You lose!");
    }
  },
  displayMessage: (message) => {
    document.getElementById("winner").innerHTML = `
                <span id="msg">${message}</span>
        `;
    let span= document.getElementById('msg')
    switch (message) {
        case 'You lose!':
            span.style.color = 'red'
            break;
        case "You win!":
            span.style.color = 'green'
        break;    
        default: span.style.color = 'white'
            break;
    }
    if(gameService.userPoints>gameService.computerPoints){
        document.getElementById('userPoints').style.backgroundColor = 'green'
        document.getElementById('pointsOfComputer').style.backgroundColor = 'red'
    }else if(gameService.userPoints<gameService.computerPoints){
        document.getElementById('userPoints').style.backgroundColor = 'red'
        document.getElementById('pointsOfComputer').style.backgroundColor = 'green'
    }else{
        document.getElementById('userPoints').style.backgroundColor = 'red'
        document.getElementById('pointsOfComputer').style.backgroundColor = 'red'
    }
  },
  resetGame:()=>{
    
        confirm("Do you want to play again?")
        document.getElementById("winner").innerHTML=''
        gameService.userPoints = 0
        gameService.computerPoints=0
        htmlElements.round = 1
        htmlElements.divContainer.innerHTML = ''
        gameService.startGame();
  }
};

const starService = {
  createStar: (points, id) => {
    if (points <= 9 && points % 3 === 0) {
      document.getElementById(id).innerHTML +=`<img src="./star.png" alt="star" class="star">`;
      
    } 
    
  },
};
 window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
       gameService.startGame();
    }, 2000);
});