document.addEventListener('DOMContentLoaded', function () {
    const scroller = new Scroller('#root');
    console.log(scroller)

    document.addEventListener('mousewheel', function (event) {
        scroller.listenScroll(event)
    })
})