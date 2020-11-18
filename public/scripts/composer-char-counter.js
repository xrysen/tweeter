
$(document).ready(function() {
  const maxChars = 140;
  $(".tweet-username").css("visibility", "hidden");

  console.log("jQuery is ready!");

  $(".tweet-text").on("input", function() {

    if($(this).val().length > 140) {
      $(this).parent().find("output").css("color","red");
    } else {
      $(this).parent().find("output").css("color", "#545149");
    }

    $(this).parent().find("output").html(maxChars - $(this).val().length);
    
  });

  $("#tweet-container").mouseenter(function() {
    $(".tweet-username").css("visibility", "visible");
  });

  $("#tweet-container").mouseleave(function() {
    $(".tweet-username").css("visibility", "hidden");
  });

});

