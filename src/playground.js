
function Arena(width, height) {
    this.width = width;
    this.height = height;

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
      
    this.newBot = function(bot) {
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

}


function startBattle() {
    var arena = new Arena(20, 20);
    var robots = new Robots(arena);

    arena.drawArena($('playground'));

    robots.addBot(new Bot(new BotBrain1(), 12, 3, Bot.DIRNORTH));
    robots.addBot(new Bot(new BotBrain2(), 10, 1, Bot.DIRNSOUTH));


    /* Just for testing */
    $('playground').observe('click', function() {
	robots.gameLoop();
    });

}    


