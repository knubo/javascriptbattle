fieldWidth = 30;

function Arena(width, height) {
    this.width = width;
    this.height = height;
    this.bots = [];

    this.performCommand = function(theBot, command) {
        if (command.move) {
            var posDelta = (command.move - 1) * 2 - 1;

            if (theBot.dir == Bot.DIRNORTH && theBot.y < 20) {
                theBot.y = theBot.y + posDelta;
            }
            if (theBot.dir == Bot.DIRSOUTH && theBot.y > 0) {
                theBot.y = theBot.y - posDelta;
            }
            this.moveRobot(theBot);
        }
    }

    this.turnRobot = function(theBot) {

        theBot.star.removeClassName("dir1");
        theBot.star.removeClassName("dir2");
        theBot.star.removeClassName("dir3");
        theBot.star.removeClassName("dir4");

        theBot.star.addClassName("dir"+theBot.dir);
    }
    this.moveRobot = function(theBot) {
        var cellToMoveTo = $('y' + theBot.y + 'x' + theBot.x);

        var cellPosition = cellToMoveTo.viewportOffset();

        new Effect.Move(theBot.img, {y:cellPosition.top, x:cellPosition.left , mode: 'absolute'});

    }

    this.drawArena = function (target) {
        var table = new Element('table', {'class':'arena'});

        target.insert(table);

        for (y = 0; y < this.height; y++) {
            var row = new Element('tr');
            table.insert(row);
            for (x = 0; x < this.width; x++) {
                var col = new Element('td');
                col.id = 'y' + y + 'x' + x;
                row.insert(col);
            }
        }
    }

    this.findBot = function (x, y) {
        for (var i = 0; i < this.bots.length; i++) {
            if (this.bots[i].x == x && this.bots[i].y == y) {
                return this.bots[i];
            }
        }
    }

    this.addBot = function (bot) {
        this.bots.push(bot);
        var div = new Element('div', {'class':'robot'});
        var pic = new Element('img', {'class':'robotImg', 'src':bot.botBrain.picUrl, 'alt':'Player icon', 'title':'Player ' + bot.botBrain.name, 'name':bot.botBrain.name});
        bot.img = div;

        div.insert(pic);

        var star = new Element('img', {'class':'starImg','src':'images/star.png'});
        bot.star = star;
        div.insert(star);

        this.turnRobot(bot);
        this.moveRobot(bot, -1, -1);


        $('playground').insert(div);


    }
    this.bots = [];
    this.width = width;
    this.height = height;
}


function startBattle() {
    var arena = new Arena(20, 20);

    arena.drawArena($('playground'));

    arena.addBot(new Bot(new BotBrain1(), 12, 3, Bot.DIRNORTH));
    arena.addBot(new Bot(new BotBrain2(), 10, 1, Bot.DIRSOUTH));


    /* Just for testing */
    $('playground').observe('click', function() {
        for (var i = 0; i < arena.bots.length; i++) {
            var theBot = arena.bots[i];
            var command = theBot.botBrain.decide(theBot);
            arena.performCommand(theBot, command);
        }
    });

}    


