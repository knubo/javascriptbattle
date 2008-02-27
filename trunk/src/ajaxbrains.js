var availableBrains = null;

function pickRobots() {
    showBox();

    new Ajax.Request("../server/ajax/bot.php?action=list", {
        method:'get',
        onSuccess: function(transport) {
            availableBrains = new Hash();
            var brains = transport.responseJSON;
            var i;
            $('brainlist').innerHTML = "";

            for (i = 0; i < brains.length; i++) {
                availableBrains.set(brains[i].name, brains[i]);

                var tr = new Element('tr');
                $('brainlist').insert(tr);

                tr.innerHTML = '<td>' + (brains[i].name) + "</td><td>" +
                               (brains[i].owner) + "</td><td>" + (brains[i].created) +
                               "</td><td><input type='checkbox' name='robot' value='" + (brains[i].name) + "'></td>";
            }
        }
    });
}

function pickAllRobots() {
    var elems = $('brainListForm').getElements('checkbox');
    elems.each(function(checkbox) {
        checkbox.checked = true;
    });
}

function useSelectedRobots() {

    var elems = $('brainListForm').getElements('checkbox');

    robots.removeAllBots();

    elems.each(function(checkbox) {
        if ($F(checkbox)) {
            loadBrain($F(checkbox));
        }
    });
}

function loadBrain(brainName) {
    var brainInfo = availableBrains.get(brainName);

    new Ajax.Request("../server/ajax/bot.php?action=get&name=" + brainName, {
        method:'get',
        onSuccess: function(transport) {
            /* Load robots */
            eval(transport.responseText);

            eval("robots.addBotRandomLocation(new " + brainInfo.func + "())");

            $('robotpick').hide();
            $('page_overlay').hide();
            arena.updatePlayerInfo(robots.bots);

        }
    });
}

/* Some lightbox stuff */


/****************************************\
 * Show Overlay and box
 \****************************************/
function showBox() {
    $('page_overlay').show();
    overlayReload();

    center('robotpick');
}
/****************************************\
 * Adjust overlay to new window size
 \****************************************/
function overlayReload()
{
    if (window.innerHeight && window.scrollMaxY || window.innerWidth && window.scrollMaxX) {
        yScroll = window.innerHeight + window.scrollMaxY;
        xScroll = window.innerWidth + window.scrollMaxX;
        var deff = document.documentElement;
        var wff = (deff && deff.clientWidth) || document.body.clientWidth || window.innerWidth || self.innerWidth;
        var hff = (deff && deff.clientHeight) || document.body.clientHeight || window.innerHeight || self.innerHeight;
        xScroll -= (window.innerWidth - wff);
        yScroll -= (window.innerHeight - hff);
    } else if (document.body.scrollHeight > document.body.offsetHeight || document.body.scrollWidth > document.body.offsetWidth) { // all but Explorer Mac
        yScroll = document.body.scrollHeight;
        xScroll = document.body.scrollWidth;
    } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
        yScroll = document.body.offsetHeight;
        xScroll = document.body.offsetWidth;
    }

    $('page_overlay').style.height = yScroll;
    $('page_overlay').style.width = xScroll;
}

function center(element) {
    try {
        element = $(element);
    } catch(e) {
        return;
    }

    var my_width = 0;
    var my_height = 0;

    if (typeof( window.innerWidth ) == 'number') {
        my_width = window.innerWidth;
        my_height = window.innerHeight;
    } else if (document.documentElement &&
               ( document.documentElement.clientWidth ||
                 document.documentElement.clientHeight )) {
        my_width = document.documentElement.clientWidth;
        my_height = document.documentElement.clientHeight;
    }
    else if (document.body &&
             ( document.body.clientWidth || document.body.clientHeight )) {
        my_width = document.body.clientWidth;
        my_height = document.body.clientHeight;
    }

    element.style.position = 'absolute';
    element.style.zIndex = 99;

    var scrollY = 0;

    if (document.documentElement && document.documentElement.scrollTop) {
        scrollY = document.documentElement.scrollTop;
    } else if (document.body && document.body.scrollTop) {
        scrollY = document.body.scrollTop;
    } else if (window.pageYOffset) {
        scrollY = window.pageYOffset;
    } else if (window.scrollY) {
        scrollY = window.scrollY;
    }

    var elementDimensions = Element.getDimensions(element);

    var setX = ( my_width - elementDimensions.width  ) / 2;
    var setY = ( my_height - elementDimensions.height ) / 2 + scrollY;

    setX = ( setX < 0 ) ? 0 : setX;
    setY = ( setY < 0 ) ? 0 : setY;

    element.style.left = setX + "px";
    element.style.top = setY + "px";

    element.style.display = 'block';
}
/****************************************\
 *
 \****************************************/
function getPageSize() {
    var de = document.documentElement;
    var w = window.innerWidth || self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
    var h = window.innerHeight || self.innerHeight || (de && de.clientHeight) || document.body.clientHeight
    arrayPageSize = new Array(w, h)
    return arrayPageSize;
}
/****************************************\
 *
 \****************************************/
function getPageScrollTop() {
    var yScrolltop;
    var xScrollleft;
    if (self.pageYOffset || self.pageXOffset) {
        yScrolltop = self.pageYOffset;
        xScrollleft = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop || document.documentElement.scrollLeft) {     // Explorer 6 Strict
        yScrolltop = document.documentElement.scrollTop;
        xScrollleft = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
        yScrolltop = document.body.scrollTop;
        xScrollleft = document.body.scrollLeft;
    }
    arrayPageScroll = new Array(xScrollleft, yScrolltop)
    return arrayPageScroll;
}