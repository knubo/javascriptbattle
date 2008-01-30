
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
        var boom = new Element('img', {'class': 'boom', 'src':'images/Explosion.gif'});
        var radar = new Element('img', {'class': 'radar', 'src':'images/radar1.gif'});
        var star = new Element('img', {'class':'starImg','src':'images/star.png'});
        var laser = new Element('div', {'class':'laser'});

        boom.setStyle("display:none");
        radar.setStyle("display:none");

        bot.img = div;
        bot.boom = boom;
        bot.radar = radar;
        bot.star = star;
        bot.laser = laser;

        div.insert(pic);
        div.insert(radar);
        div.insert(boom);
        div.insert(star);
        div.insert(laser);

        this.turnRobot(bot);
        this.moveRobot(bot, -1, -1);


        $('playground').insert(div);

    }

    this.explode = function(bot) {
        var boom = bot.boom;
        bot.img.insert(boom);
        
        boom.setStyle("display:block");

        new Effect.Shrink(boom);
    }

    this.radar = function(bot) {
        var radar = bot.radar;
        radar.setStyle("display:block");

        new Effect.Fade(radar);
    }

    this.laser = function(bot) {
        var laser = bot.laser;

        if(bot.dir == Bot.DIRSOUTH) {
            laser.setStyle("display:block; width:5;height:85;left:13;top:25");
        } else if(bot.dir == Bot.DIRNORTH) {
            laser.setStyle("display:block; width:5;height:90;left:13;top:-70");            
        } else if(bot.dir == Bot.DIRWEST) {
            laser.setStyle("display:block; width:85;height:5;left:-75;top:13");
        } else if(bot.dir == Bot.DIREAST) {
            laser.setStyle("display:block; width:90;height:5;left:20;top:13");
        }
        new Effect.Fade(laser, { duration: 0.5 });

    }

}


function startBattle() {
    var arena = new Arena(20, 20);
    var robots = new Robots(arena);

    arena.drawArena($('playground'));

    robots.addBot(new Bot(new BotBrain1(), 12, 3, Bot.DIRNORTH));
    robots.addBot(new Bot(new BotBrain2(), 10, 1, Bot.DIRSOUTH));


    /* Just for testing */
    $('playground').observe('click', function() {
	robots.gameLoop();
    });


    var toWatch = robots.bots[0];

    toWatch.img.observe('click', function() {
        arena.laser(toWatch);
    });

    var toWatch2 = robots.bots[1];

    toWatch2.img.observe('click', function() {
        arena.explode(toWatch2);
    });

}    


