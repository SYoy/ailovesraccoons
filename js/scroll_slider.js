
//Forked from [Chrysto](http://codepen.io/bassta/)'s

console.clear();

TweenMax.set(".centered", {autoAlpha: 1, xPercent:-50, yPercent:-50, force3D:true});


//References to DOM elements
var $window = $(window);
var $document = $(document);


var $slidesContainer = $(".slides-container");
var $allSlides = $(".slide");
var $currentSlide = $allSlides.first();


//defaultEase for all animations - except ...
TweenLite.defaultEase = Linear.easeNone;

//Animating flag - is our app animating
var isAnimating = false;

//The height of the window
var pageHeight = $window.innerHeight();

//Key codes for up and down arrows on keyboard. We'll be using this to navigate change slides using the keyboard
var keyCodes = {
  UP  : 38,
  DOWN: 40
};

// individual animations per slide ======
var currentIndex = 0;

const el = document.querySelectorAll(".slide");
const slides = [].slice.call(el);
slidesNo = slides.length;
let animations = [];

// create animation timelines
for(let [i] of slides.entries()) {
  animations[i] = new TimelineMax({});
}

animations[0]
  .to('.slide01 .close',1,{left:'-100%'})
  .from('.slide01 h1',0.5,{y:65})
  .reverse();

animations[1]
  .to('.slide02 .close',1,{left:'-100%'})
  .from('.slide02 h1',0.5,{y:65})
  .reverse();

animations[2]
  .to('.slide03 .close',1,{left:'-100%'})
  .from('.slide03 h1',0.5,{y:65})
  .reverse();


//Going to the first slide

animations[currentIndex].reversed(false);

/*  Adding event listeners  */

$window.on("resize", onResize).resize();
$window.on("mousewheel DOMMouseScroll", onMouseWheel);

/* When user scrolls with the mouse, we have to change slides */
function onMouseWheel(event){
  //Normalize event wheel delta
  var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;

  //If the user scrolled up, it goes to previous slide, otherwise - to next slide
  if(delta < -1){
    goToNextSlide();
  }
  else if(delta > 1){
    goToPrevSlide();
  }
  event.preventDefault();
}

/*  If there's a previous / next slide, slide to it */

function goToPrevSlide() {
  if($currentSlide.prev().length) {
    goToSlide($currentSlide.prev());
  }
}

function goToNextSlide() {
  if($currentSlide.next().length){
    goToSlide($currentSlide.next());
  }
}

/*  Actual transition between slides */

function goToSlide($slide){

  if(!isAnimating && $slide.length){

    isAnimating = true;
    $currentSlide = $slide;

    var currentTime = animations[currentIndex].time();

    function rev(){
      animations[currentIndex].timeScale(2).reversed(true);
    }

    //Sliding to current slide
    var action = new TimelineMax()
    .add(rev)
    .to($slidesContainer, 0, {scrollTo: {y: pageHeight * $currentSlide.index() }, ease: Power2.easeOut, onComplete: onSlideChangeEnd, onCompleteScope: this},currentTime/2+0.2)
    }
}

  /*  Once the sliding is finished, we need to restore "isAnimating" flag.*/

  function onSlideChangeEnd() {
    isAnimating = false;

    // Change the index
    currentIndex = $currentSlide.index();

    // Play the timeline for the current slide
    animations[currentIndex].timeScale(1).reversed(false);

  }

  /*
	*   When user resize it's browser we need to know the new height, so we can properly align the current slide
	* */
  function onResize(event){

    //This will give us the new height of the window
    var newPageHeight = $window.innerHeight();

    /*
		*   If the new height is different from the old height ( the browser is resized vertically ), the slides are resized
		* */
    if(pageHeight !== newPageHeight){
      pageHeight = newPageHeight;

      //This can be done via CSS only, but fails into some old browsers, so I prefer to set height via JS
      TweenLite.set([$slidesContainer, $allSlides], {height: pageHeight + "px"});

      //The current slide should be always on the top
      TweenLite.set($slidesContainer, {scrollTo: {y: pageHeight * $currentSlide.index() }});
    }

  }

// =======================================

$("img")
  .mousedown(function() {
  TweenLite.to('img',0.5,{scale:2})
})
  .mouseup(function() {
  TweenLite.to('img',0.5,{scale:1})
});