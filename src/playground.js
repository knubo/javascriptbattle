
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
        var div = new Element('div', {'class':'robot'});
        var pic = new Element('img', {'class':'robotImg', 'src':bot.botBrain.picUrl, 'alt':'Player icon', 'title':'Player ' + bot.botBrain.name});
        bot.img = div;

        div.insert(pic);

        var star = new Element('img', {'class':'starImg','src':'images/star.png'});
        bot.star = star;
        div.insert(star);

        this.turnRobot(bot);
        this.moveRobot(bot, -1, -1);


        $('playground').insert(div);

    }

    this.explode = function(bot) {

        var boom = $('boom');
        bot.img.insert(boom);
        
        boom.setStyle("display:block");

        new Effect.Shrink(boom);
    }

    this.radar = function(bot) {
        var radar = $('radar');
        bot.img.insert(radar);

        radar.setStyle("display:block");

        new Effect.Fade(radar);
    }
}


function startBattle() {
    var arena = new Arena(20, 20);
    var robots = new Robots(arena);

    arena.drawArena($('playground'));

    var boom = new Element('img', {'class':'explosion', 'src':'images/Explosion.gif', 'id':'boom'});
    var radar = new Element('img', {'class':'radar', 'src':'images/radar1.gif', 'id':'radar'});

    $('playground').insert(boom);
    $('playground').insert(radar);

    robots.addBot(new Bot(new BotBrain1(), 12, 3, Bot.DIRNORTH));
    robots.addBot(new Bot(new BotBrain2(), 10, 1, Bot.DIRSOUTH));


    /* Just for testing */
    $('playground').observe('click', function() {
	robots.gameLoop();
    });


    var toWatch = robots.bots[0];

    toWatch.img.observe('click', function() {
        arena.explode(toWatch);
    });

    var toWatch2 = robots.bots[1];

    toWatch2.img.observe('click', function() {
        arena.radar(toWatch2);
    });

}    


