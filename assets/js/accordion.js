class Accordion {
    /**
     * 
     * @param {*} id : string
     * @param {*} config : {
     *  cardBackground: 'glass' | HTMLColorValue
     * }
     */
    constructor (id, config) {
        this.dom = document.getElementById(id);
        this.items = document.querySelectorAll(".accordion-item");
        this.currentlyExpanded = -1;
        this.toggleIcon = null;

        this.cardBackground = config?.cardBackground ? config.cardBackground : 'glass';

        this.initialize();

    }
    initialize () {
        this.dom.classList.add("accordion-wrapper");
        this.items.forEach((item, itemIndex) => {
            const title = item.querySelector(".accordion-title");
            const toggleIcon = document.createElement("img");
            toggleIcon.src = "assets/images/plus-icon.svg";
            toggleIcon.classList.add("accordion-toggle-icon")
            item.style.height = `${title.clientHeight}px`
            if (this.cardBackground === "glass") {
                item.classList.add("glass-background-white")
            } else {
                item.style.backgroundColor = this.cardBackground;
            }
            this.toggleIcon = toggleIcon
            title.appendChild(toggleIcon)
            item.addEventListener("click", () => {
                this.currentlyExpanded = itemIndex;
                this.updateToggle();
            })
        })
    }
    updateToggle () {
        this.items.forEach((item, itemIndex) => {
            const title = item.querySelector(".accordion-title");
            const description = item.querySelector(".accordion-description");
            if (this.currentlyExpanded === itemIndex) {
                item.style.height = `${title.clientHeight + description.clientHeight}px`
                item.querySelector(".accordion-toggle-icon").src = "assets/images/minus-icon.svg"

                if (this.cardBackground === "glass") {
                    item.classList.remove("glass-background-white")
                    item.classList.add("glass-background-white-dense")
                }
            } else {
                item.style.height = `${title.clientHeight}px`
                item.querySelector(".accordion-toggle-icon").src = "assets/images/plus-icon.svg"
                if (this.cardBackground === "glass") {
                    item.classList.remove("glass-background-white-dense")
                    item.classList.add("glass-background-white")
                }
            }
        })
    }
}