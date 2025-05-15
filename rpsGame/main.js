//user choose rock paper or scissors
// random bira za drugiot
//ako prviot e rock moze da e winner samo ako drugiot e scissors
//scissors moze da e win samo ako drugiot e paper
//paper moze da e win samo ako drugiot e rock
// stavi za score

// let user
// let computer
const htmlElements={
    options:["paper", "scissors", "rock"],
    paper: document.getElementById('paper'),
    rock: document.getElementById('rock'),
    scissors: document.getElementById('scissors'),
    userPointsElement: document.getElementById('yourPoints'),
    computerPointsElement: document.getElementById('computerPoints'),
    


    imageEvent:()=>{
        for (let i = 0; i < htmlElements.options.length; i++) {
            const element = document.getElementById(htmlElements.options[i]);

            element.addEventListener("click", ()=>{
                let user = element.getAttribute('alt')
                let chooseForComputer  = Math.floor(Math.random()* 3)
                computer = htmlElements.options[chooseForComputer]
    
                gameService.checkWinner(user,computer)
                
            })

            
        }
        
    },

    
}


const gameService = {
    userPoints:0,
    computerPoints:0,
    checkWinner:(user, computer)=>{
        if (user == computer){
            let message = "no winner"
            return
        }

        if(user =='paper' && computer == 'rock'){
            gameService.win('user')
        }
        if(computer =='paper' && user == 'rock'){
            gameService.win('computer')
        }

        if(user =='paper' && computer == 'scissors'){
            gameService.win('user')
        }
        if(computer =='paper' && user == 'scissors'){
            gameService.win('computer')
        }

        if(user =='rock' && computer == 'scissors'){
            gameService.win('user')
        }
        if(computer =='rock' && user == 'scissors'){
            gameService.win('computer')
        }
    },
    win: (winner)=>{
        if (winner=='user'){
            htmlElements.userPointsElement.innerText = gameService.userPoints+1
            gameService.userPoints = gameService.userPoints+1
        }
        else{
            htmlElements.computerPointsElement.innerText = gameService.computerPoints+1
            gameService.computerPoints = gameService.computerPoints+1
        }
    },
}
htmlElements.imageEvent()