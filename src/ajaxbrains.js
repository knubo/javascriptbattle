var availableBrains = null;

function pickRobots() {
    $('robotpick').toggle();

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

function useSelectedRobots() {
    var elems = $('brainListForm').getElements('checkbox');

    robots.removeAllBots();

    elems.each(function(name) {
        loadBrain(name.getValue());
    });
}

function loadBrain(brainName) {

}