$(document).ready(function () {
    $(".reset").click(function() {
    location.reload(true);
});
    $(".start").click(trivia);

    function trivia() {
        var scoreAry = [];
        var questions = [{
            q: "What is the name of the Professor you meet in the beginning of Gen I pokemon?",
            s: ["Matt", "Oak", "Evan", "Bob"],
            a: "Oak",
            correct: 0
        }, {
            q: "What is the Pokemon that Ash uses in the anime series, the main mascot of the show?",
            s: ["Jigglypuff", "Snorlax", "Pikachu", "Meowth"],
            a: "Pikachu",
            correct: 0
        }, {
            q: "What is the first gym leader's name?",
            s: ["Brock", "Samson", "Dirk", "Brent"],
            a: "Brock",
            correct: 0
        }, {
            q: "Which pokemon is #151?",
            s: ["Zapdos", "Dragonite", "Snorlax", "Mewtwo"],
            a: "Mewtwo",
            correct: 0
        }, {
            q: "Who is Ash's rival?",
            s: ["Peter", "Gary", "Chico", "Grey"],
            a: "Gary",
            correct: 0
        }, {
            q: "How many gym badges could ash get in the first season of the anime series?",
            s: ["four", "six", "eight", "ten"],
            a: "eight",
            correct: 0
        }, {
            q: "How many pokemon are there now in total?",
            s: ["151", "369", "874", "756"],
            a: "756",
            correct: 0
        }, {
            q: "Who is the creator of pokemon?",
            s: ["Satoshi Tajiri", "Nobuo Uematsu", "Shigeru Miyamoto", "Tetsuya Nomura"],
            a: "Satoshi Tajiri",
            correct: 0
        }, {
            q: "What year was pokemon red and blue released in the US?",
            s: ["1996", "2000", "1993", "1998"],
            a: "1996",
            correct: 0
        }, {
            q: "Whos is Ash's real dad?",
            s: ["Peter", "Drake", "Giovanni", "Al"],
            a: "Giovanni",
            correct: 0
        }];

        var counter = questions.length;

        //This grabs the question and answer data from the questions array and appends it to the #questions div:
        function createQuestion(questions) {
            for (var i = 0; i < questions.length; i++) {
                $(".start").hide();
                $("#questions").append('<form id="' + i + '" class="center-text"><p>Question ' + (i + 1) + ' of ' + questions.length + '</p><h3 class="question">' + questions[i].q + '</h3>' + radioButtons(questions[i].s, i) + '<button type="submit" class="next">NEXT &#8594;</button></p></form>');
            }
            //This hides all except the first question:
            for (var k = questions.length - 1; k > 0; k--) {
                $('#' + k).hide();
            }
        }
        //This grabs the answer choices from the questions array and returns them to createQuestion():
        function radioButtons(ary, qNum) {
            var answers = [];
            for (i = 0; i < ary.length; i++) {
                answers.push('<label><input type="radio" name="' + qNum + '" value="' + ary[i] + '">' + ary[i] + '</label>');
            }
            return answers.join(" ");
        }
        
        //This sums the correct values in the questions array:
        function sumScore(questions) {
            return scoreAry.reduce(function (previousValue, currentValue, index, array) {
                return previousValue + currentValue;
            });
        }
        
        //This checks the user's answer and updates the score:
        function checkAnswer(answer, qNum, questions) {
            if (answer == questions[qNum].a) {
                questions[qNum].correct = 1;
                scoreAry.push(questions[qNum].correct);
            } else {
                scoreAry.push(questions[qNum].correct);
            }
        }
        
        createQuestion(questions);
        
        $(".next").click(function (event) {
            event.preventDefault(); //This stops the form from submitting
            var qNum = $(this).closest("form").attr("id"); //This gives us the question number
            var userInput = $('input[name=' + qNum + ']:radio:checked').val(); //This grabs the user's selected answer
            if (counter > 1) {
                checkAnswer(userInput, qNum, questions);
                $("#" + qNum).hide();
                $("#" + qNum).next().show();
                counter--;
            } else if (counter == 1) {
                checkAnswer(userInput, qNum, questions);
                $("#questions").find("form").remove();
                $("#questions").append('<h3 class="result"></h3>');
                $(".result").text('You answered ' + sumScore(questions) + ' questions correctly out of 10.');
                   for (j = 0; j < scoreAry.length; j++) {
                        if (scoreAry[j] === 0) {
                            console.log(questions[j].q, questions[j].a);
                            $("#questions").append('<p class="missed-' + j + '">You missed: ' + questions[j].q + ' ' + questions[j].a + '</p>');      
                        }
                    }
            } else {
                return false;
            }
        });
    }
});
