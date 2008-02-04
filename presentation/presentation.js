var currentSlide = 1;

function loadSlide() {
    new Ajax.Updater('presentationInner', "slides/slide" + currentSlide + ".html", {evalScripts:true});
    $('pageNumber').innerHTML = currentSlide;
}

function doSomethingCool() {

}

function setup() {
    loadSlide();

    document['onkeypress'] = function(e) {

        if (e.charCode == 32 || e.keyCode == 39 || e.charCode == 110) {
            currentSlide++;
            loadSlide();
            doSomethingCool();
            Event.stop(e);
            return;
        }

        if (currentSlide > 1 && (e.keyCode == 8 || e.charCode == 112 || e.keyCode == 37)) {
            currentSlide--;
            loadSlide();
            Event.stop(e);
            return;
        }
        console.log(e);

    }


}