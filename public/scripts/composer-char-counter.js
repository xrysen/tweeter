
$(document).ready(function() {
  let maxChars = 140;
  console.log("jQuery is ready!");
  $(".tweet-text").on("input", function() {

    if($(this).val().length > 140) {
      $(this).parent().find("output").css("color","red");
    } else {
      $(this).parent().find("output").css("color", "#545149");
    }

    $(this).parent().find("output").html(maxChars - $(this).val().length);
    
  });
});
