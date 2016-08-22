/*
 When the page loads, the startup screen should appear.
 Use the tictactoe-01-start.png mockup,
 and the start.txt HTML snippet to guide you.
 */


var gameModule;

gameModule = (function (exports) {
    exports = {
        playerName: "",
        player1: [],
        player2: []
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
        $header.append("<h2>Enter Player Name:</h2><input type='text' id='player-name'>");
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
            //Show the board  //Show a welcome message with the players name
            $("#board").css("display" , "block").find("header").append("<h3 id='welcome' style = 'text-align:center'>Welcome to the game " + exports.playerName + "</h3>");
            $("#welcome").fadeOut(5000 , function () {
            });
        });
    };

    exports.play = function(selection){
      //
        $(".box").each( function () {
            //Get the index of the players selection and the computer selection
            if ($(this).hasClass(selection) && selection == 'box-filled-2'){
                var indexOfPlayer = $(this).index();
                exports.player2.push(indexOfPlayer);
                jQuery.unique(exports.player2);
                var winPattern1 = [2,4,6];
                var winPattern2 = [0,1,2];
                var winPattern3 = [0,3,6];
                var winPattern4 = [6,7,8];
                checkWinner(winPattern1);
                checkWinner(winPattern2);
                checkWinner(winPattern3);
                checkWinner(winPattern4);
            }
            if ($(this).hasClass(selection) && selection == 'box-filled-1'){
                exports.player1.push($(this).index());
            }
        });
    };

    var checkWinner = function (pattern) {
        var ret =0;
        $.each( pattern, function (index , value){
            if ($.inArray(value,exports.player2) != -1){
                ret += 1;
            }
            else{
                ret = 0
            }
            if(ret == 3){
                exports.win('two');
            }
        });
    };

    exports.changePlayer =  function () {
      //Switch to the next player
        $( ".players" ).each(function() {
            if ( !$(this).hasClass("active") ) {
                $(this).addClass("active").addClass("players-turn");
            } else {
                $(this).removeClass("active").removeClass("players-turn");

            }
        });
    };

    exports.removeActive = function () {
        //Remove active class from players x and o
        $( ".players" ).each(function() {
            $( this ).removeClass( "active" ).removeClass("players-turn");
        });
    };

    exports.win = function (value) {
        var $windiv;
        $('#board').css("display" , "none");
        $windiv = $("<div>").attr({
            class: "screen screen-win screen-win-"+value,
            id: "finish"
        });
        var $header = $("<header>");
        $header.append("<h1>Tic Tac Toe</h1>");
        $header.append('<p class="message">' + exports.playerName + ' WINS</p>');
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

//
//Event to each player selected
$('.players').on("click", function(){
   gameModule.removeActive();
    //Add an active class to the current selected player
  $(this).addClass("active").addClass("players-turn");
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
        //Switch to the the next player
        gameModule.changePlayer();
    }
     gameModule.play(selection);
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



































//When the user Presses the Back button restarts the game
window.onhashchange= function(e){
  if(e.newURL.length < e.oldURL.length){
    window.location.href = e.newURL;
  }
};
