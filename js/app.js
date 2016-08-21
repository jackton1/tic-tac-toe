/*
 When the page loads, the startup screen should appear.
 Use the tictactoe-01-start.png mockup,
 and the start.txt HTML snippet to guide you.
 */


var gameModule;
gameModule = (function (exports) {
    var exports = {
        playerName: ""
    };

    //Check of the player name has a value
    exports.checkName = function () {
        $('#player-name').bind("blur" , function () {

            exports.playerName = $(this).val();
            //Display a red box indicating empty field
            if ( exports.playerName === "" ) {
                $(this).css("border" , "2px solid red");

            } else {
                //Green box indicating field not empty
                $(this).css("border" , "2px solid green");
                exports.startGame();
            }

        });
    };

    exports.load_start = function () {
        var $div;
        $('#board').css("display" , "none");
        $('#finish').css("display" , "none");
        $div = $("<div>").attr({
            class: "screen screen-start" ,
            id: "start"
        });
        var $header = $("<header>");
        $header.append("<h2>Enter Player Name:</h2><input type='text' id='player-name'>")
        $header.append("<h1>Tic Tac Toe</h1>");
        $header.append('<a href="#" class="button">Start game</a>');
        $div.append($header);
        $("body").append($div);
    };

    exports.startGame = function () {
        $('#start').find('.button').on("click" , function () {
            //Hide the start page
            $('#start').css("display" , "none");
            //Start with the first player
            $('#player1').addClass("active");
            //Show the board
            $("#board").css("display" , "block");
            //Show a welcome message with the players name
            $("#board").find("header").append("<h3 id='welcome' style = 'text-align:center'>Welcome to the game " + exports.playerName + "</h3>")
            $("#welcome").fadeOut(5000 , function () {
            });
        });
    };

    exports.play = function(){
      //



    };

    exports.win = function () {
        var $windiv;
        $('#board').css("display" , "none");
        $windiv = $("<div>").attr({
            class: "screen screen-win screen-win-tie" ,
            id: "finish"
        });
        var $header = $("<header>");
        $header.append("<h1>Tic Tac Toe</h1>");
        $header.append('<p class="message">' + exports.playerName + 'WINS</p>');
        $header.append('<a href="#" class="button">New game</a>');
        $windiv.append($header);
        $("body").append($windiv);
        $("#finish").find(".button").click(function () {
            window.location.href = window.location.pathname;
        });
    };

    return exports

}(gameModule || {}));

$(function(){
    //Load the Start page on load
   gameModule.load_start();
    //Focus on the player name input
    $('#player-name').focus();
    //Play the game
    gameModule.checkName();

});


//Event to each player selected
$('.players').on("click", function(){
    //Remove active class from players x and o
  $('.players').removeClass('active');
    //Add an active class to the current selected player
  $(this).toggleClass("active");
});


//Store the classes of both x and o
//When the user selects x or o and clicks the boxes
//Display the selected element in the boxes

$('.box').click(function(){
    //Check the index of the selected element and return the class name selected
    var selection =  (($('.players.active').index() == 0) ? 'box-filled-1' :  'box-filled-2');
    //Check if the class contains more than one class e.g [box, box-filled1]
    if (this.classList.length != 1) {
        //Check if the classList doesn't contain the selection
        if (!this.classList.contains(selection)) {
            //remove the class selection
            $(this).removeClass(selection);
        }
    } else {
        //Add the class of selection
        $(this).addClass(selection);
        //Remove the appended image
        $(this).children().remove();
    }
}).hover(function(){
    //Show the image of the selected

    //Check the index of the selected element and return the class name selected
    var source =  (($('.players.active').index() == 0) ? 'img/o.svg' :  'img/x.svg');
    //Check if image already appended to the box
    if ($(this).children().length != 0) {
        $(this).children().remove();
    } else {
        //Check if the box already doesn't contain box-filled class
        if (this.classList.length == 1) {
            //If no image append the image of the selected player
            $(this).append('<img src =' + source + " height = \"100px\" width =\"100px\" >");
        }
    }
});

setTimeout(function () {
    gameModule.win();
} , 10000);


//When the user Presses the Back button restarts the game
window.onhashchange= function(e){
  if(e.newURL.length < e.oldURL.length){
    window.location.href = e.newURL;
  }
};
