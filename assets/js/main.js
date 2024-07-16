let mobileStartX, mobileStartY, mobileEndX, mobileEndY;
var scrollStatus = {
  wheeling: false,
  functionCall: false,
};
var scrollTimer = false;
var currentPageIndex = 0;
const pages = ["hero", "about", "feature1", "feature2", "feature3", "technology_chart", "acknowledgments", "knowledgebase"];
const pageMoveDelay = parseFloat(
  getComputedStyle(document.querySelector(":root"))
    .getPropertyValue("--page-move-delay")
    .slice(0, -1)
);

const loadSectionFunctions = {
  hero: {
    enter: heroSectionEnter,
    exit: heroSectionExit,
  },
  about: {
    enter: aboutSectionEnter,
    exit: aboutSectionExit,
  },
  feature1: {
    enter: feature1SectionEnter,
    exit: feature1SectionExit
  },
  feature2: {
    enter: feature2SectionEnter,
    exit: feature2SectionExit
  },
  feature3: {
    enter: feature3SectionEnter,
    exit: feature3SectionExit
  },
  technology_chart: {
    enter: (direction) => technologyChartEnter(direction),
    exit: (direction) => technologyChartExit(direction)
  },
  acknowledgments: {
    enter: (direction) => acknowledgmentsEnter(direction),
    exit: (direction) => acknowledgmentsExit(direction)
  },
  knowledgebase: {
    enter: (direction) => knowledgebaseEnter(direction),
    exit: (direction) => knowledgebaseExit(direction)
  }
};

window.addEventListener("wheel", function (e) {
  let direction = null;
  if (e.deltaY > 0) direction = 'down'
  else if (e.deltaY < 0) direction = 'up'
  onScrollFunc(direction)
});

window.addEventListener('touchstart', function(event) {
  mobileStartX = event.touches[0].clientX;
  mobileStartY = event.touches[0].clientY;
});

window.addEventListener('touchmove', function(event) {
  mobileEndX = event.touches[0].clientX;
  mobileEndY = event.touches[0].clientY;
});

window.addEventListener('touchend', function() {
  if (!mobileStartX || !mobileStartY || !mobileEndX || !mobileEndY) {
      return;
  }

  const diffX = mobileEndX - mobileStartX;
  const diffY = mobileEndY - mobileStartY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
          console.log('Swiped right');
      } else {
          console.log('Swiped left');
      }
  } else {
      if (diffY > 0) {
          console.log('Swiped down');
          onScrollFuncMobile('down')
      } else {
          console.log('Swiped up');
          onScrollFuncMobile('up')
      }
  }
})

// function onScrollFunc (e) {
//   scrollStatus.wheeling = true;
//   if (!scrollStatus.functionCall) {
//     //parseScroll here
//     if (e.deltaY > 0) {
//       console.log("scrolled down");
//       if (!(currentPageIndex >= pages.length - 1)) {
//         currentPageIndex = currentPageIndex + 1;
//         handlePageMove(currentPageIndex, "down");
//       }
//     }
//     if (e.deltaY < 0) {
//       if (!(currentPageIndex <= 0)) {
//         currentPageIndex = currentPageIndex - 1;
//         handlePageMove(currentPageIndex, "up");
//       }
//     }
//     scrollStatus.functionCall = true;
//   }
//   window.clearInterval(scrollTimer);
//   scrollTimer = window.setTimeout(function () {
//     scrollStatus.wheeling = false;
//     scrollStatus.functionCall = false;
//   }, 50); //set this millisecond to your liking
// }
function onScrollFunc (direction) {
  scrollStatus.wheeling = true;
  if (!scrollStatus.functionCall) {
    //parseScroll here
    if (direction === 'down') {
      console.log("scrolled down");
      if (!(currentPageIndex >= pages.length - 1)) {
        currentPageIndex = currentPageIndex + 1;
        handlePageMove(currentPageIndex, "down");
      }
    }
    if (direction === 'up') {
      if (!(currentPageIndex <= 0)) {
        currentPageIndex = currentPageIndex - 1;
        handlePageMove(currentPageIndex, "up");
      }
    }
    scrollStatus.functionCall = true;
  }
  window.clearInterval(scrollTimer);
  scrollTimer = window.setTimeout(function () {
    scrollStatus.wheeling = false;
    scrollStatus.functionCall = false;
  }, 50); //set this millisecond to your liking
}
function onScrollFuncMobile (swipe) {
  if (swipe === 'up') {
    console.log("scrolled down");
    if (!(currentPageIndex >= pages.length - 1)) {
      currentPageIndex = currentPageIndex + 1;
      handlePageMove(currentPageIndex, "down");
    }
  }
  if (swipe === 'down') {
    if (!(currentPageIndex <= 0)) {
      currentPageIndex = currentPageIndex - 1;
      handlePageMove(currentPageIndex, "up");
    }
  }
}

const initializePages = () => {
  pages.forEach((page) => {
    var dom = document.querySelector(`.body-content[data-section="${page}"]`)
    if (!dom) dom = document.querySelector(`.sliding-section[data-section="${page}"]`)
    dom.classList.add("hidden");
    // document
    //   .querySelector(`.body-content[data-section="${page}"]`)
    //   .classList.add("unanimated");
  });
};

// Move page
const loadingFirstPage = () => {
  // loadSectionFunctions.hero.enter();
  loadSectionFunctions[pages[currentPageIndex]].enter();
};
const nextPage = () => {
  loadSectionFunctions.hero.exit();
};
const handlePageMove = (pageIndex, direction) => {
  console.log("Page index", pageIndex);
  if (direction === "down") {
    loadSectionFunctions[pages[pageIndex - 1]].exit(direction);
    loadSectionFunctions[pages[pageIndex]].enter(direction);
  } else if (direction === "up") {
    loadSectionFunctions[pages[pageIndex + 1]].exit(direction);
    loadSectionFunctions[pages[pageIndex]].enter(direction);
  }
};

function heroSectionEnter() {
  const sectionDom = document.querySelector(
    `.body-content[data-section="hero"]`
  );
  sectionDom.classList.remove("hidden");
  setTimeout(() => {

      sectionDom.classList.remove("unanimated");
  }, 300)

  //   sectionDom.querySelector(".s1_heading").classList.remove("unanimated");
  //   sectionDom.querySelector(".s1_subheading").classList.remove("unanimated");
  document
    .querySelector(`.left-background[data-section="hero"]`)
    .classList.remove("unanimated");
  document
    .querySelector(`.right-background[data-section="hero"]`)
    .classList.remove("unanimated");
  document
    .querySelector(`.left-background[data-section="hero"]`)
    .classList.remove("exit_animation");
  document
    .querySelector(`.right-background[data-section="hero"]`)
    .classList.remove("exit_animation");

  document.querySelector(".full-background").classList.add("section-hero")
  document.querySelector(".center-logo-container").classList.add("section-hero");
}
function heroSectionExit() {
  const sectionDom = document.querySelector(
    `.body-content[data-section="hero"]`
  );
  sectionDom.classList.add("exit_animation");
  document
    .querySelector(`.left-background[data-section="hero"]`)
    .classList.add("exit_animation");
  document
    .querySelector(`.right-background[data-section="hero"]`)
    .classList.add("exit_animation");
  
    document.querySelector(".full-background").classList.remove("section-hero");
    document.querySelector(".center-logo-container").classList.remove("section-hero");

  setTimeout(() => {
    sectionDom.classList.add("hidden");
    sectionDom.classList.remove("exit_animation");
    sectionDom.classList.add("unanimated");
  }, pageMoveDelay);
}
function aboutSectionEnter() {
  const sectionDom = document.querySelector(
    `.body-content[data-section="about"]`
  );
  sectionDom.classList.remove("hidden");
  setTimeout(() => {
    sectionDom.classList.remove("unanimated");
  }, 300);
  sectionDom.querySelector(".s2_subheading").classList.remove("unanimated");
  document.querySelector(".full-background").classList.add("section-about");
  document.querySelector(".center-logo-container").classList.add("section-about");
}
function aboutSectionExit() {
  const sectionDom = document.querySelector(
    `.body-content[data-section="about"]`
  );
  sectionDom.classList.add("exit_animation");

  
  document.querySelector(".full-background").classList.remove("section-about");
  document.querySelector(".center-logo-container").classList.remove("section-about");
  setTimeout(() => {
    sectionDom.classList.add("hidden");
    sectionDom.classList.remove("exit_animation");
    sectionDom.classList.add("unanimated");
  }, pageMoveDelay);
}
function feature1SectionEnter() {
  const sectionDom = document.querySelector(
    `.body-content[data-section="feature1"]`
  );
  sectionDom.classList.remove("hidden");
  setTimeout(() => {
    sectionDom.classList.remove("unanimated");
  }, 300);
  sectionDom.querySelector(".s3_subheading").classList.remove("unanimated");
  document.querySelector(".full-background").classList.add("section-feature1");
  document.querySelector(".center-logo-container").classList.add("section-feature1");

  document
    .querySelector(`.left-background[data-section="feature1"]`)
    .classList.remove("unanimated");
  document
    .querySelector(`.right-background[data-section="feature1"]`)
    .classList.remove("unanimated");
  document
    .querySelector(`.left-background[data-section="feature1"]`)
    .classList.remove("exit_animation");
  document
    .querySelector(`.right-background[data-section="feature1"]`)
    .classList.remove("exit_animation");
}
function feature1SectionExit() {
  const sectionDom = document.querySelector(
    `.body-content[data-section="feature1"]`
  );
  sectionDom.classList.add("exit_animation");

  document
    .querySelector(`.left-background[data-section="feature1"]`)
    .classList.add("exit_animation");
  document
    .querySelector(`.right-background[data-section="feature1"]`)
    .classList.add("exit_animation");

  document.querySelector(".full-background").classList.remove("section-feature1");
  document.querySelector(".center-logo-container").classList.remove("section-feature1");

  setTimeout(() => {
    sectionDom.classList.add("hidden");
    sectionDom.classList.remove("exit_animation");
    sectionDom.classList.add("unanimated");
  }, pageMoveDelay);
}
function feature2SectionEnter() {
  const sectionDom = document.querySelector(
    `.body-content[data-section="feature2"]`
  );
  sectionDom.classList.remove("hidden");
  setTimeout(() => {
    sectionDom.classList.remove("unanimated");
  }, 300);
  sectionDom.querySelector(".s4_subheading").classList.remove("unanimated");
  document.querySelector(".full-background").classList.add("section-feature2");
  document.querySelector(".center-logo-container").classList.add("section-feature2");

  document
    .querySelector(`.left-background[data-section="feature2"]`)
    .classList.remove("unanimated");
  document
    .querySelector(`.right-background[data-section="feature2"]`)
    .classList.remove("unanimated");
  document
    .querySelector(`.left-background[data-section="feature2"]`)
    .classList.remove("exit_animation");
  document
    .querySelector(`.right-background[data-section="feature2"]`)
    .classList.remove("exit_animation");
    
  document.querySelectorAll(".logo-leg-container .logo-leg-text").forEach(item => item.classList.remove('hidden'));
}
function feature2SectionExit() {
  const sectionDom = document.querySelector(
    `.body-content[data-section="feature2"]`
  );
  sectionDom.classList.add("exit_animation");

  document
    .querySelector(`.left-background[data-section="feature2"]`)
    .classList.add("exit_animation");
  document
    .querySelector(`.right-background[data-section="feature2"]`)
    .classList.add("exit_animation");

  document.querySelector(".full-background").classList.remove("section-feature2");
  document.querySelector(".center-logo-container").classList.remove("section-feature2");
  document.querySelectorAll(".logo-leg-container .logo-leg-text").forEach(item => item.classList.add('hidden'));

  setTimeout(() => {
    sectionDom.classList.add("hidden");
    sectionDom.classList.remove("exit_animation");
    sectionDom.classList.add("unanimated");
  }, pageMoveDelay);
}
function feature3SectionEnter() {
  const sectionDom = document.querySelector(
    `.body-content[data-section="feature3"]`
  );
  sectionDom.classList.remove("hidden");
  setTimeout(() => {
    sectionDom.classList.remove("unanimated");
  }, 300);
  sectionDom.querySelector(".s5_subheading").classList.remove("unanimated");
  document.querySelector(".full-background").classList.add("section-feature3");
  document.querySelector(".center-logo-container").classList.add("section-feature3");

  document
    .querySelector(`.left-background[data-section="feature3"]`)
    .classList.remove("unanimated");
  document
    .querySelector(`.right-background[data-section="feature3"]`)
    .classList.remove("unanimated");
  document
    .querySelector(`.left-background[data-section="feature3"]`)
    .classList.remove("exit_animation");
  document
    .querySelector(`.right-background[data-section="feature3"]`)
    .classList.remove("exit_animation");

    document.querySelectorAll(".logo-leg-container .secondary-leg").forEach(item => item.classList.remove("hidden"))
    document.querySelectorAll(".logo-leg-container .arrow-right").forEach(item => item.classList.remove("hidden"))
    
}
function feature3SectionExit() {
  const sectionDom = document.querySelector(
    `.body-content[data-section="feature3"]`
  );
  sectionDom.classList.add("exit_animation");

  document
    .querySelector(`.left-background[data-section="feature3"]`)
    .classList.add("exit_animation");
  document
    .querySelector(`.right-background[data-section="feature3"]`)
    .classList.add("exit_animation");

  document.querySelector(".full-background").classList.remove("section-feature3");
  document.querySelector(".center-logo-container").classList.remove("section-feature3");
  document.querySelectorAll(".logo-leg-container .secondary-leg").forEach(item => item.classList.add("hidden"))
  document.querySelectorAll(".logo-leg-container .arrow-right").forEach(item => item.classList.add("hidden"))

  setTimeout(() => {
    sectionDom.classList.add("hidden");
    sectionDom.classList.remove("exit_animation");
    sectionDom.classList.add("unanimated");
  }, pageMoveDelay);
}
function technologyChartEnter(direction) {
  const sectionDom = document.querySelector(
    `.sliding-section[data-section="technology_chart"]`
  );
  sectionDom.classList.remove("hidden");
  sectionDom.classList.remove("unanimated")
  sectionDom.classList.remove("exit_animation")
  document.querySelector(".center-logo-container").classList.add("exit_animation");
  document.querySelector(".full-background").classList.add("exit_animation");
}
function technologyChartExit(direction) {
  const sectionDom = document.querySelector(
    `.sliding-section[data-section="technology_chart"]`
  );
  if (direction === "up") {
    sectionDom.classList.add("unanimated")
    document.querySelector(".center-logo-container").classList.remove("exit_animation");
    document.querySelector(".full-background").classList.remove("exit_animation");
  } else {
    sectionDom.classList.add("exit_animation")
  }
  setTimeout(() => {
    // sectionDom.classList.add("hidden");
  }, pageMoveDelay);
}
function acknowledgmentsEnter(direction) {
  const sectionDom = document.querySelector(
    `.sliding-section[data-section="acknowledgments"]`
  );
  sectionDom.classList.remove("hidden");
  sectionDom.classList.remove("unanimated")
  sectionDom.classList.remove("exit_animation")
}
function acknowledgmentsExit(direction) {
  const sectionDom = document.querySelector(
    `.sliding-section[data-section="acknowledgments"]`
  );
  if (direction === "up") {
    sectionDom.classList.add("unanimated")
  } else {
    sectionDom.classList.add("exit_animation")
  }
  setTimeout(() => {
    // sectionDom.classList.add("hidden");

  }, pageMoveDelay);
}
function knowledgebaseEnter(direction) {
  const sectionDom = document.querySelector(
    `.sliding-section[data-section="knowledgebase"]`
  );
  sectionDom.classList.remove("hidden");
  sectionDom.classList.remove("unanimated")
  sectionDom.classList.remove("exit_animation")
}
function knowledgebaseExit(direction) {
  const sectionDom = document.querySelector(
    `.sliding-section[data-section="knowledgebase"]`
  );
  if (direction === "up") {
    sectionDom.classList.add("unanimated")
  } else {
    sectionDom.classList.add("exit_animation")
  }
  setTimeout(() => {
    // sectionDom.classList.add("hidden");

  }, pageMoveDelay);
}



// Initialize customer revenue carousel
const customerReviewCarousel = new Carousel("customer-review-carousel", {
  autoSlide: true
})

// Initialize knowledgebase accordion
const knowledgebaseAccordio = new Accordion("knowledgebase-accordion")


// window.odometerOptions = {
//   // auto: false, // Don't automatically initialize everything with class 'odometer'
//   selector: '#waitlist-odometer', // Change the selector used to automatically find things to be animated
//   format: '(,ddd).dd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
//   duration: 300, // Change how long the javascript expects the CSS animation to take
//   theme: 'car', // Specify the theme (if you have more than one theme css file on the page)
//   animation: 'count' // Count is a simpler animation method which just increments the value,
//                      // use it when you're looking for something more subtle.
// }
// var el = document.querySelector('#waitlist-odometer');

// od = new Odometer({
//   el: el,
//   value: 333555,

//   // Any option (other than auto and selector) can be passed in here
//   format: '',
//   theme: 'digital'
// });

// od.update(555)
// // or
// el.innerHTML = 555

initializePages();
loadingFirstPage();
