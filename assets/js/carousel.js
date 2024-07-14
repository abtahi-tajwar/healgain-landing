class Carousel {
    /**
     * 
     * @param {*} id 
     * @param {*} config = {
     *  autoSlide: boolean = true
     *  autoSlideInterval: number = 2000
     * }
     */
    constructor(id, config) {
        this.dom = document.getElementById(id);
        this.slider = this.dom.querySelector(".carousel-slides");
        this.window = document.createElement("div");
        this.slides = this.dom.querySelectorAll(".slide");
        this.slideWidth = this.dom.offsetWidth;
        this.totalSlides = this.slides.length;
        this.lastSlideIndex = this.totalSlides - 1;
        this.navigationDotsContainer = this.dom.querySelector(".carousel-dots");
        this.navigationDots = [];
        this.currentSlide = 0;
        this.autoSlideInterval = config?.autoSlideInterval ? config.autoSlideInterval : 5000
        this.autoSlideIntervalInstance = null;

        this.initializeStyles();
        if (config?.autoSlide) {
            this.enableAutoSlide()
        }
    }
    initializeStyles () {
        this.dom.classList.add("carousel-wrapper");
        this.slides.forEach((slide, slideIndex) => {
            slide.style.width = `${this.dom.offsetWidth}px`;
            const dot = document.createElement("div");
            if (slideIndex === this.currentSlide) dot.classList.add("selected")
            dot.classList.add("carousel-navigation-dot");
            this.navigationDotsContainer.appendChild(dot);
            this.navigationDots.push(dot);

            dot.addEventListener('click', () => {
                this.moveToSlide(slideIndex);
            })
        })
        this.window.style.width = `${this.dom.offsetWidth}px`
        this.slider.style.width = `${this.dom.offsetWidth * this.slides.length}px`
        this.window.classList.add("carousel-window-styles");
        this.slider.classList.add("carousel-slides-styles");
        this.slider.remove();
        this.window.appendChild(this.slider);
        this.dom.insertBefore(this.window, this.dom.firstChild);
    }
    enableAutoSlide () {
        this.autoSlideIntervalInstance = setInterval(() => {
            this.moveSlide();
        }, [this.autoSlideInterval])
    }
    resetAutoSlideInterval () {
        if (this.autoSlideIntervalInstance) {
            clearInterval(this.autoSlideIntervalInstance)
            this.autoSlideIntervalInstance = setInterval(() => {
                this.moveSlide();
            }, [this.autoSlideInterval])
        }
    }
    updateDots () {
        this.navigationDots.forEach((dot, dotIndex) => {
            if (dotIndex === this.currentSlide) {
                dot.classList.add("selected")
            } else {
                dot.classList.remove("selected")
            }
        })
    }
    updateSlidePosition () {
        this.slider.style.marginLeft = `-${this.currentSlide * this.slideWidth}px`;
    }
    // to = "next" | "previous"
    moveSlide(to = "next") {
        if (to === "next") {
            this.currentSlide = (this.currentSlide === this.lastSlideIndex) ? 0 : this.currentSlide + 1;
        } else {
            this.currentSlide = (this.currentSlide === 0) ? this.lastSlideIndex : this.currentSlide - 1;
        }

        this.updateDots();
        this.updateSlidePosition();
    }
    moveToSlide (slideIndex) {
        this.currentSlide = slideIndex;
        this.updateDots();
        this.updateSlidePosition();
        this.resetAutoSlideInterval();
    }
}