/* Sidebar */
$(function() {
  $('#main-navigation a').click(function() {
    $('#main-navigation a').removeClass('active-tab');
    $(this).addClass('active-tab');
  });
});

/* Parallax */
$(window).scroll(function(e){
  parallax();
});
function parallax(){
  var scrolled = $(window).scrollTop();
  $('.background').css('top',-(scrolled*0.2)+'px');
}