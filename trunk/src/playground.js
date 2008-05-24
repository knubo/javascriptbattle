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

    this.moveRobot = function(theBot, instant) {
        var cellToMoveTo = $('y' + theBot.y + 'x' + theBot.x);

        var cellPosition = cellToMoveTo.viewportOffset();

		var ypos = cellPosition.top;
		var xpos = cellPosition.left;

		if (!(/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))){
			xpos++;
			ypos++;
		}  

        if (instant) {
            theBot.img.setStyle({
                top: ypos+'px',
                left: xpos+'px'
            });
        } else {
            new Effect.Move(theBot.img, {y:ypos, x:xpos, mode: 'absolute'});
        }
    }

    this.drawArena = function () {
        var table = $('arenatable');

		if ( table.hasChildNodes() ) {
    	    while ( table.childNodes.length >= 1 ) {
        	  table.removeChild( table.firstChild );       
    		} 
		}

	
        for (y = 0; y < this.height; y++) {
            var row = new Element('tr');
            table.insert(row);
           
            for (x = 0; x < this.width; x++) {
                var col = new Element('td', {'id':'y' + y + 'x' + x});
                col.innerHTML = ' ';
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

    this.hideBot = function(bot) {
        bot.img.setStyle("display:none;");
    }

    this.die = function(bot) {
        this.hideBot(bot);
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
            laser.setStyle("display:block; width:5px;height:85px;left:13px;top:25px");
        } else if (bot.dir == Bot.DIRNORTH) {
            laser.setStyle("display:block; width:5px;height:90px;left:13px;top:-70px");
        } else if (bot.dir == Bot.DIRWEST) {
            laser.setStyle("display:block; width:85px;height:5px;left:-75px;top:13px");
        } else if (bot.dir == Bot.DIREAST) {
            laser.setStyle("display:block; width:90px;height:5px;left:20px;top:13px");
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

		var table = $('playerlist');

		if ( table.hasChildNodes() ) {
    	    while ( table.childNodes.length >= 1 ) {
        	  table.removeChild( table.firstChild );       
    		} 
		}

        for (i = 0; i < bots.length; i++) {
        	var tr = new Element('tr', {'id':bots[i].botBrain.name});

        	var td = new Element('td');
        	td.innerHTML = "<img src='" + bots[i].botBrain.picUrl +
                   "' id='img" + bots[i].botBrain.name + "' class='robotImg'>";
        	tr.insert(td);
        	
        	td = new Element('td');
        	td.innerHTML = bots[i].botBrain.name;
        	tr.insert(td);
        	
        	td = new Element('td', {'id':"health"+bots[i].botBrain.name});
            td.innerHTML = bots[i].health;
            tr.insert(td);
            
        	td = new Element('td', {'id':"points"+bots[i].botBrain.name});
            td.innerHTML = bots[i].points;
            tr.insert(td);
        
        	table.insert(tr);
        }

        
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
    arena.drawArena();

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

        arena.updatePlayerInfo(robots.bots);
    }
    $('rounds').setValue(200);
}

function restart() {
    var allBots = robots.allBots;
    init(false);

    for (i = 0; i < allBots.length; i++) {
        if(allBots[i].botBrain.isRandomBrain) {
            robots.addBotRandomLocation(new RandomBotBrain(allBots[i].botBrain.name));
        } else {
            robots.addBotRandomLocation(eval("new "+allBots[i].botBrain.constructor+"()"));
        }
        allBots[i].img.setStyle("display:none");
    }
    

    arena.updatePlayerInfo(robots.bots);
}

function setupBattle() {

    /* If run locally, skip the ajax loading part - must be on suitable server for that beeing a point */
    if (document.location.href.startsWith('file')) {
        $$('TR.mustBeOnServer').invoke("toggle");
    }

    init(true);

    $('startButton').observe('click', function() {
        runLoop();
    });

    $('pauseButton').observe('click', function() {
        stopLoop();
    });

    $('restartButton').observe('click', function() {
        stopLoop();
        restart();
    });

    $('pickButton').observe('click', function() {
        pickRobots();
    });

    $('useSelected').observe('click', function() {
        useSelectedRobots();
    })

    $('pickAll').observe('click', function() {
        pickAllRobots();
    })
}    


