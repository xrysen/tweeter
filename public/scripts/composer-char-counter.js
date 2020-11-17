let characters = 140;

$(document).ready(function() {
  console.log("jQuery is ready!");
  $(".tweet-text").on("keydown", function(key) {
    if (key.which !== 8) {
      characters--;
    } else {
      characters++;
    }

    if(characters > 140) {
      characters = 140;
    }

    if(characters < 0) {
      $(this).parent().find("output").css("color","red");
    }

    if(characters === 0) {
      $(this).parent().find("output").css("color", "#545149");
    }

    $(this).parent().find("output").html(characters);
    
  });
});

