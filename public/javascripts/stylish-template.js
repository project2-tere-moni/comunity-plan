$(document).ready(function() {
  // Closes the sidebar menu
  $("#menu-close").click(function(e) {
    e.preventDefault();
    $("#menu-toggle").removeClass("hide");
    $("#sidebar-wrapper").toggleClass("active");
  });
  // Opens the sidebar menu
  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#menu-toggle").addClass("hide");
    $("#sidebar-wrapper").toggleClass("active");
  });
  
    $(".btn-pref .btn").click(function () {
    $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
    // $(".tab").addClass("active"); // instead of this do the below
    $(this).removeClass("btn-default").addClass("btn-primary");
});
});
