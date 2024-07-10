var scrollStatus = {
  wheeling: false,
  functionCall: false,
};
var scrollTimer = false;
var currentPageIndex = 0;
const pages = ["hero", "about", "feature1"];
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
  }
};

window.addEventListener("wheel", function (e) {
  scrollStatus.wheeling = true;
  if (!scrollStatus.functionCall) {
    //parseScroll here
    if (e.deltaY > 0) {
      console.log("scrolled down");
      if (!(currentPageIndex >= pages.length - 1)) {
        currentPageIndex = currentPageIndex + 1;
        handlePageMove(currentPageIndex, "down");
      }
    }
    if (e.deltaY < 0) {
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
});

const initializePages = () => {
  pages.forEach((page) => {
    document
      .querySelector(`.body-content[data-section="${page}"]`)
      .classList.add("hidden");
    // document
    //   .querySelector(`.body-content[data-section="${page}"]`)
    //   .classList.add("unanimated");
  });
};

// Move page
const loadingFirstPage = () => {
  loadSectionFunctions.hero.enter();
};
const nextPage = () => {
  loadSectionFunctions.hero.exit();
};
const handlePageMove = (pageIndex, direction) => {
  console.log("Page index", pageIndex);
  if (direction === "down") {
    loadSectionFunctions[pages[pageIndex - 1]].exit();
    loadSectionFunctions[pages[pageIndex]].enter();
  } else if (direction === "up") {
    loadSectionFunctions[pages[pageIndex + 1]].exit();
    loadSectionFunctions[pages[pageIndex]].enter();
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
initializePages();
loadingFirstPage();
