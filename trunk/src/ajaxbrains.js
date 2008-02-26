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

    var c = 0;

    elems.each(function(checkbox) {
        c++;
        if ($F(checkbox) != null) {
            loadBrain($F(checkbox), elems.length == c);
        }
    });
}

function loadBrain(brainName, isLast) {
    var brainInfo = availableBrains.get(brainName);

    new Ajax.Request("../server/ajax/bot.php?action=get&name=" + brainName, {
        method:'get',
        onSuccess: function(transport) {
            /* Load robots */
            eval(transport.responseText);

            eval("robots.addBotRandomLocation(new " + brainInfo.func + "())");

            if (isLast) {
                $('robotpick').toggle();
                arena.updatePlayerInfo(robots.bots);
            }

        }
    });
}