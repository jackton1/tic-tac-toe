//When the page loads, the startup screen should appear.
//Use the tictactoe-01-start.png mockup,
//and the start.txt HTML snippet to guide you.

$(function(){
   load_start;
   $('#player1').addClass("active");
});

var load_start = (function(){
  $('#board')[0].style.display="none";
  var $div = $("<div>").attr({class: "screen screen-start", id :"start"})
  var $header = $("<header>");
  $header.append("<h1 style='font-size:100px'>Tic Tac Toe</h1>");
  $header.append('<a href="#" class="button">Start game</a>');
  $div.append($header);
  $('body').append($div);
  $('div')[1].style.backgroundColor = "lightgreen";
  $('div')[1].style.height = $(document).height()+'px';
})();

$('#start .button').on("click", function(){
  $('#start')[0].style.display = "none";
  $('#board')[0].style.display="block";
});

$('.players').on("click", function(){
  $('.players').removeClass("active");
  var index = $('ul li').index(this);
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
        $(this).children().remove();
    }
}).hover(function(){
    //Show the image of the selected

    //Check the index of the selected element and return the class name selected
    var source =  (($('.players.active').index() == 0) ? 'img/o.svg' :  'img/x.svg');

    if ($(this).children().length != 0) {
        $(this).children().remove();
    } else if(this.classList.length == 1){
        $(this).append('<img src ='+ source +" height = \"100px\" width =\"100px\" >");
    }
});





//When the user Presses the Back button restarts the game
window.onhashchange= function(e){
  if(e.newURL.length < e.oldURL.length){
    window.location.href = e.newURL;
  }
};


//When the window if resized reload the start page
$(window).resize(function(){
  load_start;
});