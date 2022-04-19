
$(document).ready(function(){

    var operators = [];
    var interval;
    var currentQuestion;
    var timeLeft = 10;
    var score = 0;
    var highScore = 0;


    if(operators.length === 0){
        operators.push('+');
        $('#add').toggleClass('checked')
       
    }

    $('.op-btn').on('click',function(event){

        if(operators.includes(this.value) === false){
            operators.push(this.value);
            $(this).toggleClass('checked');
        }
        else if(operators.includes(this.value) === true){
            if(operators.length > 1){
                operators.splice(operators.indexOf(this.value),1);
            $(this).toggleClass('checked');
            }else{
                return;
            }
            
        };
            
        
        
        console.log(operators);
    })


    var startGame = function(){
        if(!interval){
            if(timeLeft === 0){
                updateTimeLeft(10);
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

var randomOperatorGenerator = function(){
     return operators[Math.floor(Math.random() * operators.length)]; 
    

    
}

var questionGenerator = function(){
    var question = {};

    $('#slider').on('input', function(){
        var val = $('#slider').val();
        $('#max-num').text(val);
    })
    randomOperatorGenerator();
    var num1 = randomNumberGenerator($('#slider').val());
    var num2 = randomNumberGenerator($('#slider').val());
    
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
