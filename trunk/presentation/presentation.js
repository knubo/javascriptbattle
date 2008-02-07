function PageSelect() {

    this.loadSlide = function(slideNumber) {

        var pageSelect = this;

        new Ajax.Request('slides/slide' + slideNumber + ".html", {
            onSuccess: function(transport) {
                var matchResult = transport.responseText.match("@T:(.*)@");

                if(matchResult && matchResult.length == 2) {
                    pageSelect.addSlide(slideNumber, matchResult[1]);
                }

                if (!transport.responseText.match("@LastSlide@")) {
                    pageSelect.loadSlide(slideNumber+1);
                }

            }
        });
    }

    this.show = function() {
        var options = $('pages').childElements();

        if(!options || options.length == 0) {
            this.loadSlide(1);
        }
    }

    this.addSlide = function(slideNumber, title) {
        var option = new Element('option', {'value': slideNumber});
        option.innerHTML = slideNumber+" - "+title;

        $('pages').insert(option);
    }
    
}


var currentSlide = 1;

/* Define this and save a warning. Will be redefined and set by firebug. */
var console;

var pageSelect = new PageSelect();

function viewSlide(slideNumber) {
    currentSlide = slideNumber;
    loadSlide();
    $('pageselect').setStyle("display:none;");
}

function loadSlide() {
    new Ajax.Updater('presentationInner', "slides/slide" + currentSlide + ".html", {evalScripts:true});
    $('pageNumber').innerHTML = currentSlide;
}

function lastSlide() {
    return $('presentationInner').innerHTML.match("@LastSlide@");
}


function showPageselect() {
    $('pageselect').setStyle("display:block");
    pageSelect.show();
    $('pages').focus();

}

function setup() {
    loadSlide();

    document['onkeypress'] = function(e) {

        if (e.charCode == 99) {
            showPageselect();
            Event.stop(e);
            return;
        }

        if (!lastSlide() && (e.charCode == 32 || e.keyCode == 39 || e.charCode == 110)) {
            currentSlide++;
            loadSlide();
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