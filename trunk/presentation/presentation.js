var currentSlide = 1;

function loadSlide() {
    new Ajax.Updater('presentationInner', "slides/slide"+currentSlide+".html");
    $('pageNumber').innerHTML = currentSlide;
}

function doSomethingCool() {

}

function setup() {
    loadSlide();

    document['onkeypress'] = function(e) {

        if(e.charCode == 32) {
            currentSlide++;
            loadSlide();
            doSomethingCool();
            Event.stop(e);
            return;
        }

        if(e.keyCode == 8 || e.charCode == 112) {
            currentSlide--;
            loadSlide();
            Event.stop(e);
            return;
        }
        console.log(e);

    }


}