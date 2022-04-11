
$(document).ready(function(){

    var operators = [];
    var interval;
    var currentQuestion;
    var timeLeft = 5;
    var score = 0;
    var highScore = 0;


    $('.op-btn').on('click',function(event){
        if(operators.includes(this.value) === false){
            operators.push(this.value);
            $(this).toggleClass('checked');
        }
        else if(operators.includes(this.value) === true){
            operators.splice(operators.indexOf(this.value),1);
            $(this).toggleClass('checked');
        };
            
        
        
        console.log(operators);
    })


    var startGame = function(){
        if(!interval){
            if(timeLeft === 0){
                updateTimeLeft(5);
                updateScore(-score);
            }
            interval = setInterval(function(){
                updateTimeLeft(-1);
                $('#time-left').text(timeLeft);
                if(timeLeft === 0){
                    clearInterval(interval);
                    interval = undefined;
                    
                }  
                
            }, 1000);
        }
    }


var randomNumberGenerator = function(size){
    return Math.ceil(Math.random() * size);
}

var randomOperatorGenerator = function(arr){
    var randomNum = Math.floor(Math.random() * arr.length) + 1;
    var selection = arr[randomNum];

    
}

var questionGenerator = function(){
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);
    
    //Add new question system so num1 and num2 are added to function with operator function to determine correct answer.
   
    question.answer = num1 +  num2;
    question.equation = String(num1) + " + " + String(num2);

    return question;
}


var renderNewQuestion = function(){
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
    
}



var checkAnswer = function(userInput, answer){
    if(userInput === answer){    
        renderNewQuestion();
        $('#user-input').val('');
        updateTimeLeft(+1);
        updateScore(+1);
        updateHighScore();
        
       
    };
}

$('#user-input').on('keyup', function(){
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
});




var updateTimeLeft = function(amount){
    timeLeft += amount;
    $('#time-left').text(timeLeft);
}

var updateScore = function(amount){
    score += amount;
    $('#score').text(score);
    
}

var updateHighScore = function(){
    if(score > highScore){
        highScore = score;
        $('#high-score').text(highScore);
        
    }
    
}


renderNewQuestion();


})
