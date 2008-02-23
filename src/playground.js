var timerID;
var arena;
var robots;


function Arena(width, height) {
    this.width = width;
    this.height = height;

    this.turnRobot = function(theBot) {

        theBot.starImg.removeClassName("dir1");
        theBot.starImg.removeClassName("dir2");
        theBot.starImg.removeClassName("dir3");
        theBot.starImg.removeClassName("dir4");

        theBot.starImg.addClassName("dir" + theBot.dir);
    }

    this.moveRobot = function(theBot) {
        var cellToMoveTo = $('y' + theBot.y + 'x' + theBot.x);

        var cellPosition = cellToMoveTo.viewportOffset();

        new Effect.Move(theBot.img, {y:cellPosition.top, x:cellPosition.left , mode: 'absolute'});
    }

    this.drawArena = function (target) {
        target.innerHTML = "";
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
        bot.boomImg = boom;
        bot.radarImg = radar;
        bot.starImg = star;
        bot.laserImg = laser;

        div.insert(pic);
        div.insert(radar);
        div.insert(boom);
        div.insert(star);
        div.insert(laser);

        this.turnRobot(bot);
        this.moveRobot(bot, bot.y, bot.x);


        $('playground').insert(div);

    }

    this.explode = function(bot) {
        var boom = bot.boomImg;

        boom.setStyle("display:block");

        new Effect.Shrink(boom);
    }

    this.radar = function(bot) {
        var radar = bot.radarImg;
        radar.setStyle("display:block");

        new Effect.Fade(radar);
    }

    this.die = function(bot) {
        bot.img.setStyle("display:none");
//        $("row"+bot.botBrain.name).setStyle("text-decoration: line-through;");
        $("img" + bot.botBrain.name).src = "images/skull.png";
    }

    this.winner = function(bots) {
        if (bots.length == 1) {
            alert(bots[0].botBrain.name + " wins!");
        } else {
            alert("We have a draw!");
        }
    }

    this.laser = function(bot, length) {
        var laser = bot.laserImg;

        if (bot.dir == Bot.DIRSOUTH) {
            laser.setStyle("display:block; width:5;height:85;left:13;top:25");
        } else if (bot.dir == Bot.DIRNORTH) {
            laser.setStyle("display:block; width:5;height:90;left:13;top:-70");
        } else if (bot.dir == Bot.DIRWEST) {
            laser.setStyle("display:block; width:85;height:5;left:-75;top:13");
        } else if (bot.dir == Bot.DIREAST) {
            laser.setStyle("display:block; width:90;height:5;left:20;top:13");
        }
        new Effect.Fade(laser, { duration: 0.5 });

    }

    this.updateHealth = function(bot) {
        $('health' + bot.botBrain.name).innerHTML = bot.health;
    }
    this.updatePoints = function(bot) {
        $('points' + bot.botBrain.name).innerHTML = bot.points;
    }

    this.countDownRounds = function() {
        $('rounds').setValue($('rounds').getValue() - 1);
    }

    this.updatePlayerInfo = function(bots) {

        var res = '';

        for (i = 0; i < bots.length; i++) {
            res += "<tr id='row" + bots[i].botBrain.name + "'><td><img src='" + bots[i].botBrain.picUrl +
                   "' id='img" + bots[i].botBrain.name + "' class='robotImg' ></td><td>";
            res += bots[i].botBrain.name + '</td><td id="health' + bots[i].botBrain.name + '">';
            res += bots[i].health + '</td><td id="points' + bots[i].botBrain.name + '">' + bots[i].points + '</tr>';
        }

        $('playerlist').innerHTML = res;
    }
}

function runLoop() {
    robots.gameLoop();
    arena.countDownRounds();

    if (timerID) {
        clearTimeout(timerID);
    }

    if (robots.bots.length == 1 || $('rounds').getValue() <= 0) {
        stopLoop();
        arena.winner(robots.robotsWithMostPoints());
        return;
    }

    timerID = setTimeout("runLoop()", $('delay').getValue());
}

function stopLoop() {
    if (timerID) {
        clearTimeout(timerID);
    }
}

function init(addBots) {
    arena = new Arena($('playgroundHeight').getValue(), $('playgroundWidth').getValue());
    robots = new Robots(arena);
    arena.drawArena($('playground'));


    if (addBots) {
        robots.addBotRandomLocation(new BotBrain1());
        robots.addBotRandomLocation(new BotBrain2());
        robots.addBotRandomLocation(new RandomBotBrain("Random 1"));
        robots.addBotRandomLocation(new RandomBotBrain("Random 2"));
        robots.addBotRandomLocation(new RandomBotBrain("Random 3"));
        robots.addBotRandomLocation(new RandomBotBrain("Random 4"));
        robots.addBotRandomLocation(new RandomBotBrain("Random 5"));
        robots.addBotRandomLocation(new RandomBotBrain("Random 6"));
        robots.addBotRandomLocation(new RandomBotBrain("Random 7"));
//        robots.addBotRandomLocation(new KEBBrain());
//        robots.addBotRandomLocation(new RunBotBrain());

        arena.updatePlayerInfo(robots.bots);
        $('rounds').setValue(200);
    }
}

function setupBattle() {
    init(true);

    $('startButton').observe('click', function() {
        runLoop();
    });

    $('pauseButton').observe('click', function() {
        stopLoop();
    });

    $('restartButton').observe('click', function() {
        stopLoop();
        init();
    });

}    


