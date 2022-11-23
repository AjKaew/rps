let userScore = 0;
let compScore = 0;
const userScore_span = document.querySelector('#user-score');
const compScore_span = document.querySelector('#comp-score');
const result_div = document.querySelector('#result');
const user_choice = document.querySelector('#user-choice');
const comp_choice = document.querySelector('#comp-choice');
const message = document.querySelector('#message');
const overlay = document.querySelector('#overlay');
const playerName = document.querySelector('#player_name');
const userLabel = document.querySelector('#user-label');
const choices = document.querySelector('#choices');
const startPanel = document.querySelector('#start_panel');
const resultPanel = document.querySelector('#result_panel');
const finalResult = document.querySelector('#final_result');

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function win(user, computer) {
  userScore_span.innerHTML = ++userScore;
  result_div.innerHTML = `${user.toUpperCase()} beats ${computer.toUpperCase()}. You win!</p>`;
  user_choice.classList.add('winner');
}

function loses(user, computer) {
  compScore_span.innerHTML = ++compScore;
  result_div.innerHTML = `${computer.toUpperCase()} beats ${user.toUpperCase()}. You lose!</p>`;
  comp_choice.classList.add('comp-winner');
}

function draw(user, computer) {
  result_div.innerHTML = `It was a draw! You both chose ${user.toUpperCase()}`;
}

function game(userChoice) {
  gameCount++;
  choices.hidden = true;
  user_choice.classList.remove('ready', 'winner');
  comp_choice.classList.remove('ready', 'comp-winner');

  const compChoice = getComputerChoice();

  user_choice.setAttribute('src', `images/${userChoice}.png`);
  comp_choice.setAttribute('src', `images/${compChoice}.png`);

  const battle = userChoice + compChoice;
  if((battle == 'rockscissors') || 
     (battle == 'scissorspaper') || 
     (battle == 'paperrock')) {
    win(userChoice, compChoice);
  }
  else if((battle == 'scissorsrock') || 
          (battle == 'paperscissors') || 
          (battle == 'rockpaper')) {
    loses(userChoice, compChoice);
  }
  else {
    draw(userChoice, compChoice);
  }

  setTimeout(()=>{
    choices.hidden = false;
    user_choice.classList.remove('winner');
    comp_choice.classList.remove('comp-winner');
      if(gameCount==5) {
      startPanel.hidden = true;
      resultPanel.hidden = false
      finalResult.innerHTML = userScore > compScore ? 'ดวงดีนี่!!! ไปเป็นประธานบริษัทเถอะ 🎊' : 'ดวงยังไม่ถึง 😅 พยายามเข้านะ';
      overlay.hidden = false;
    }
  }, 1500);
}

let gameCount = 0;
function start() {
  if(playerName.value != '') {
    overlay.hidden = true;
    userLabel.innerHTML = playerName.value;
    user_choice.classList.remove('winner');
    comp_choice.classList.remove('winner');
    user_choice.setAttribute('src', `images/rock.png`);
    comp_choice.setAttribute('src', `images/rock.png`);
    user_choice.classList.add('ready');
    comp_choice.classList.add('ready');
    message.hidden = false;
  }
  // overlay.hidden = true;
}

function restart() {
  location.reload();
}

for(let choice of document.querySelectorAll('.choice')) {
  choice.addEventListener('click', function() {game(this.id);});
}
resultPanel.hidden = true;