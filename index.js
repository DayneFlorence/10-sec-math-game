
$(document).ready(function(){


    var currentQuestion;


var randomNumberGenerator = function(size){
    return Math.ceil(Math.random() * size);
}

var questionGenerator = function(){
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);

    question.answer = num1 + num2;
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
    };
}

$('#user-input').on('keyup', function(){
    checkAnswer(Number($(this).val()), currentQuestion.answer);
});

renderNewQuestion();

})
