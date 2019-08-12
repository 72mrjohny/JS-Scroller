class Scroller {
    constructor(rootSelector) {
        const rootElement = document.querySelector(rootSelector);
        this.sections = document.querySelectorAll('section');
        const sectionsArr = [...this.sections];

        const currentSectionIndex = sectionsArr.findIndex(element => {
            return this.isScrolledIntoView(element);
        })
        this.currentSectionIndex = currentSectionIndex

        this.isThrottled = false;

        this.drawNavigation();

    }

    isScrolledIntoView(el) {
        const rect = el.getBoundingClientRect();
        const elemTop = rect.top;
        const elemBottom = Math.floor(rect.bottom);

        const isVisible = (elemTop >= 0) && (elemBottom >= window.innerHeight)

        return isVisible;
    }

    listenScroll = (event) => {
        if (this.isThrottled) return;
        this.isThrottled = true;

        setTimeout(() => {
            this.isThrottled = false;
        }, 1000);


        const direction = event.wheelDelta < 0 ? 1 : -1;
        this.scroll(direction);
    }


    scroll = (direction) => {
        if (direction === 1) {
            const isLastSection = this.currentSectionIndex === this.sections.length - 1;
            if (isLastSection) return;
        } else if (direction === -1) {
            const firstSection = this.currentSectionIndex === 0;
            if (firstSection) return;
        }

        this.currentSectionIndex = this.currentSectionIndex + direction;

        this.scrollToCurrentSection();
    }

    scrollToCurrentSection = () => {
        this.sections[this.currentSectionIndex].scrollIntoView({
            behavior: 'smooth',
            block: "start"
        })
    }

    drawNavigation = () => {
        this.navigationContainer = document.createElement('aside');
        this.navigationContainer.setAttribute('class', 'scroller_navigation');
        const list = document.createElement('ul');

        this.sections.forEach(section => {
            const listItem = document.createElement('li');
            list.appendChild(listItem);

        })

        this.navigationContainer.appendChild(list);
        document.body.appendChild(this.navigationContainer);
    }
}