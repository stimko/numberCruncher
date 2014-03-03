var level = 1,
    diffculty = 1,
    score = 0,
    base = 25,
    operators = ["+", "-", "*"],
    currentExpression = "",
    currentSolution;
    
function Timer(startTime, targetTime, cb){
  this.startTime = startTime;
  this.targetTime = targetTime;
  this.mode = startTime < targetTime ? 'stopwatch' : 'timer';
  this.cb = cb;
};

Timer.prototype = {
  time: 0,
  start: function(){
    this.startDate = new Date().getTime();
    setTimeout(this.tick.bind(this), 100);
  },

  tick: function(){
    this.time += 100;
    var elapsed = Math.floor(Math.floor(this.time / 100) / 10);
    var displayTime = this.mode === 'stopwatch' ? elapsed : this.startTime - elapsed;
    document.getElementById('timer').innerText = displayTime;
    if (displayTime === this.targetTime) return this.cb();
    var diff = (new Date().getTime() - this.startDate) - this.time;
    setTimeout(this.tick.bind(this), (100 - diff));
  }
};

function generateNumbers(){
  var operands = 4,
      currentOperand = 0,
      operand, numberItem, operator;

  while(currentOperand < operands){
    operand = Math.round(Math.random()*(25*diffculty));
    operator = (currentOperand !== 0) ? operators[Math.floor(Math.random()*3)] : "";
    currentExpression += (currentOperand !== 0) ? operator + operand : operand;   
    currentOperand++;
  }
  document.getElementById('expression').innerText = currentExpression;
  currentSolution = eval(currentExpression);
  console.log(eval(currentExpression));
}


function startGame(){
  generateNumbers();
  var timer = new Timer(10, 0, function(){alert('Time has expired')});
  timer.start();
}

startGame();
