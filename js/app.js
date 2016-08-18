//When the page loads, the startup screen should appear.
//Use the tictactoe-01-start.png mockup,
//and the start.txt HTML snippet to guide you.

$(function(){
   load_start;
   $('#player1').addClass("active");
})


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
})





window.onhashchange= function(e){
  if(e.newURL.length < e.oldURL.length){
    window.location.href = e.newURL;
  }
}
