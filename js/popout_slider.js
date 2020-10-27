$(document).ready(function(){
  for (var i=1; i <= $('.slider__slide').length; i++){
    $('.slider__indicators').append('<div class="slider__indicator" data-slide="'+i+'"></div>')
  }
  setTimeout(function(){
    $('.slider__wrap').addClass('slider__wrap--hacked');
  }, 1000);
})

function goToSlide(number){
  $('.slider__slide').removeClass('slider__slide--active');
  $('.slider__slide[data-slide='+number+']').addClass('slider__slide--active');
}

$('.slider__next, .go-to-next').on('click', function(){
  var currentSlide = Number($('.slider__slide--active').data('slide'));
  var totalSlides = $('.slider__slide').length;
  currentSlide++;
  if (currentSlide > totalSlides){
    currentSlide = 1;
  }
  goToSlide(currentSlide);
})


//Forked from [Chrysto](http://codepen.io/bassta/)'s
TweenMax.set(".centered", {autoAlpha: 1, xPercent:-50, yPercent:-50, force3D:true});

//References to DOM elements
var $window = $(window);

//defaultEase for all animations - except ...
TweenLite.defaultEase = Linear.easeNone;

//The height of the window
var pageHeight = $window.innerHeight();

//Key codes for up and down arrows on keyboard. We'll be using this to navigate change slides using the keyboard
var keyCodes = {
  UP  : 38,
  DOWN: 40
};


var wrap = $("#wrap");

$window.on("mousewheel DOMMouseScroll", onMouseWheel);

function goToPrevSlide() {
  var currentSlide = Number($('.slider__slide--active').data('slide'));
  currentSlide--;
  if (currentSlide < 1){
    currentSlide = 1;
  }
  goToSlide(currentSlide);
}

function goToNextSlide() {
  var currentSlide = Number($('.slider__slide--active').data('slide'));
  var totalSlides = $('.slider__slide').length;
  currentSlide++;
  if (currentSlide > totalSlides){
    currentSlide = totalSlides;
  }
  goToSlide(currentSlide);
}

//Create Throttle for animation
var throttle = 500; // .5 seconds
var time = -1;

function onMouseWheel(event){
   var now = Date.now() // Current time, in milliseconds
   if (time !== -1 && now - time < throttle)
     return; // Get out, we haven't waited long enough
   time = now;

  //Normalize event wheel delta
  var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;
  if ($window.scrollTop() > 1.1 * $window.innerHeight() && $window.scrollTop() < 1.9 * $window.innerHeight()) {
    //If the user scrolled up, it goes to previous slide, otherwise - to next slide
    if (delta < -1) {
      goToNextSlide();
    } else if (delta > 1) {
      goToPrevSlide();
    }
  }
  //fixWhileScrolling();
  event.preventDefault();
}

//deprecated -> sticky
function fixWhileScrolling(event){
  if ($window.scrollTop() > $window.innerHeight()) {
    wrap.addClass("fix_element");
  } else {
    wrap.removeClass("fix_element");
  }
}