/* Define this and save a warning. Will be redefined and set by firebug. */
var console;

function Robots(arena) {
    /* The live bots */
    this.bots = [];
    /* All added bots */
    this.allBots = [];

    this.arena = arena;
    /* board elements indexed y then x */
    this.boardElements = new Array();
    /* The round the game is in */
    this.turn = 0;

    /* Counter used for giving bots uniqe id */
    this.botId = 1;

    for (var y = 0; y < arena.height; y++) {
        this.boardElements[y] = new Array(Math.floor(arena.width));
    }

    this.removeBot = function(bot) {

        this.boardElements[bot.y][bot.x] = null;
        var i;
        for (i in this.bots) {
            if (this.bots[i] === bot) {
                this.bots.splice(i, 1);
                return;
            }
        }
    }

    this.addBotRandomLocation = function(botbrain) {
        var posy;
        var posx;

        do {
            posy = Math.floor(Math.random() * this.arena.height);
            posx = Math.floor(Math.random() * this.arena.width);
        } while (this.checkForCrash(posy, posx));

        botbrain.boardInfo()

        this.addBot(new Bot(botbrain, posy, posx, Math.floor(Math.random(4)) + 1));
    }

    this.moveBotRandomLocation = function(bot) {
        var posy;
        var posx;

        do {
            posy = Math.floor(Math.random() * this.arena.height);
            posx = Math.floor(Math.random() * this.arena.width);
        } while (this.checkForCrash(posy, posx));

        this.boardElements[bot.y][bot.x] = null;
        bot.y = posy;
        bot.x = posx;
        this.boardElements[bot.y][bot.x] = bot;

        this.arena.moveRobot(bot);
    }

    this.addBot = function(bot) {
        this.bots.push(bot);
        this.allBots.push(bot);
        this.arena.newBot(bot);

        bot.id = this.botId++;

        this.boardElements[bot.y][bot.x] = bot;
    }

    this.rnd = function(ceiling) {
        return Math.floor(Math.random() * ceiling)
    }

    this.makeOrder = function() {
        var i;
        for (i in this.bots) {
            this.bots[i].pri = Math.random();
        }
        this.bots.sort(function(a, b) {
            return a.pri - b.pri
        });
    }

    this.robotsWithMostPoints = function() {
        this.allBots.sort(function(a, b) {
            return b.points - a.points
        });

        var winners = [];

        for (i in this.allBots) {
            if (this.allBots[i].points == this.allBots[0].points) {
                winners.push(this.allBots[i]);
            } else {
                return winners;
            }
        }


        return winners;
    }


    this.validateCommand = function(command) {
        var actionCount = 0;

        if (command.move || command.turn) {
            actionCount++;

            if (command.move && (command.move < Command.MOVEFRONT || command.move > Command.MOVEFRONT2)) {
                console.log("Illegal move command:" + command.move);
                return false;
            }
            if (command.turn && (command.turn != Command.TURNLEFT && command.turn != Command.TURNRIGHT)) {
                console.log("Illegal turn command:" + command.turn);
                return false;
            }
        }
        if (command.shoot) {
            actionCount++;
        }

        if (command.look) {
            actionCount++;
        }

        if (actionCount > 1) {
            console.log("Too many commands:" + actionCount);
            return false;
        }

        return true;
    }

    this.gameLoop = function() {
        this.makeOrder();
        for (var i = 0; i < this.bots.length; i++) {
            var currentBot = this.bots[i];
            try {
                //var surroundings = this.findSurroundingBots(currentBot);
                var command = currentBot.botBrain.decide(this.clone(currentBot));

                command = Object.clone(command);
                if (this.validateCommand(command)) {
                    this.performCommand(currentBot, command);
                }
            } catch(e) {
                console.error('Failed in decide');
                console.dir(e);
                console.dir(currentBot.botBrain);
            }
        }
        this.turn++;

        if ((this.turn % 5) == 0) {
            this.teleportFromCorners();
        }
    }

    this.findSurroundingBots = function(bot) {
        var starty = bot.y - 3;
        var startx = bot.x - 3;

        if (starty < 0) {
            starty = 0;
        }

        if ((starty + 6) > (this.arena.height - 1)) {
            starty = this.arena.height - 6;
        }

        if (startx < 0) {
            startx = 0;
        }

        if ((startx + 6) > (this.arena.width - 1)) {
            startx = this.arena.width - 6;
        }

        var itemFound = new Array();

        var lookX;
        var lookY;


        for (lookY = starty; lookY < starty + 6; lookY++) {
            for (lookX = startx; lookX < startx + 6; lookX++) {

                /* Skip self */
                if (bot.x == lookX && bot.y == lookY) {
                    continue;
                }
                if (this.boardElements[lookY][lookX]) {
                    itemFound.push(this.clone(this.boardElements[lookY][lookX]));
                }
            }
        }

        return itemFound;
    }

    this.nextY = function(posInfo) {
        var newY = posInfo.y;
        if (posInfo.dir == Bot.DIRNORTH || posInfo.dir == Bot.DIRSOUTH) {
            newY += (posInfo.dir - 2);
        }
        return newY;
    }

    this.nextX = function(posInfo) {
        var newX = posInfo.x;
        if (posInfo.dir == Bot.DIRWEST || posInfo.dir == Bot.DIREAST) {
            newX += ((posInfo.dir - 3) * -1);
        }

        return newX;
    }

    this.performCommand = function(currentBot, command) {
        if (command.move) {
            do {
                var newY = this.nextY(currentBot);
                var newX = this.nextX(currentBot);

                if (this.checkForCrash(newY, newX)) {
                    try {
                        currentBot.botBrain.blocked();
                    } catch(e) {
                        console.error('Failed in blocked');
                        console.dir(e);
                        console.dir(currentBot.botBrain);
                    }
                    this.arena.moveRobot(currentBot);
                    return;
                }

                this.boardElements[currentBot.y][currentBot.x] = null;

                currentBot.y = newY;
                currentBot.x = newX;

                this.boardElements[currentBot.y][currentBot.x] = currentBot;

            } while (--command.move > 0);

            this.arena.moveRobot(currentBot);

        } else if (command.turn) {
            currentBot.dir += command.turn;

            if (currentBot.dir < 1) {
                currentBot.dir = 4;
            }
            if (currentBot.dir > 4) {
                currentBot.dir = 1;
            }

            this.arena.turnRobot(currentBot);
        } else if (command.look) {
            var clonedList = new Array(this.bots.length);

            var i;
            for (i in this.bots) {
                clonedList.push(this.clone(robots[i]));
            }

            try {
                currentBot.botBrain.radar(clonedList);
            } catch(e) {
                console.error('Failed in radar');
                console.dir(e);
                console.dir(currentBot.botBrain);
            }
            this.arena.radar(currentBot);
        } else if (command.shoot) {
            var length = this.robotShoots(currentBot);
            this.arena.laser(currentBot, length);
        }
    }

    this.clone = function(bot) {
        var c = Object.clone(bot);
        c.botBrain = null;

        return c;
    }

    /* Returns crash if out of bounds */
    this.checkForCrash = function(y, x) {
        if (x < 0) {
            return true;
        }
        if (x > this.arena.width - 1) {
            return true;
        }

        if (y < 0) {
            return true;
        }
        if (y > this.arena.height - 1) {
            return true;
        }

        return this.boardElements[y][x] != null;
    }

    this.teleportFromCorners = function() {

        var possibleTarget = this.boardElements[0][0];
        if (possibleTarget) {
            this.moveBotRandomLocation(possibleTarget);
        }

        possibleTarget = this.boardElements[0][this.arena.width - 1];
        if (possibleTarget) {
            this.moveBotRandomLocation(possibleTarget);
        }

        possibleTarget = this.boardElements[this.arena.height - 1][this.arena.width - 1];
        if (possibleTarget) {
            this.moveBotRandomLocation(possibleTarget);
        }

        possibleTarget = this.boardElements[this.arena.height - 1][0];
        if (possibleTarget) {
            this.moveBotRandomLocation(possibleTarget);
        }
    }

    /* If return false, the laser will go through to next robot. */
    this.hurtRobotAt = function(shootingBot, y, x) {
        if (y >= this.arena.height || y < 0 || x < 0 || x > this.arena.width) {
            return true;
            /* Out of bounds */
        }
        var possibleTarget = this.boardElements[y][x];


        if (possibleTarget) {
            possibleTarget.health--;
            possibleTarget.points--;
            shootingBot.points++;
            this.arena.explode(possibleTarget);

            try {
                possibleTarget.botBrain.hurt(this.clone(shootingBot));
            } catch(e) {
                console.error('Failed in hurt');
                console.dir(e);
                console.dir(possibleTarget.botBrain);

            }
            try {
                shootingBot.botBrain.hit(this.clone(possibleTarget));
            } catch(e) {
                console.error('Failed in hit');
                console.dir(e);
                console.dir(shootingBot.botBrain);

            }

            this.arena.updateHealth(possibleTarget);
            this.arena.updatePoints(possibleTarget);
            this.arena.updatePoints(shootingBot);

            if (possibleTarget.health == 0) {
                this.arena.die(possibleTarget);
                this.removeBot(possibleTarget);
            }

            return false;
        }

        return false;
    }

    /* Returns how long the laser should be */
    this.robotShoots = function(currentBot) {
        var beam = new Object();
        beam.dir = currentBot.dir;
        beam.x = currentBot.x;
        beam.y = currentBot.y;

        /* 4 could be replaced with max length of beam */
        var i;
        for (i = 0; i < 4; i++) {
            beam.y = this.nextY(beam);
            beam.x = this.nextX(beam);
            if (this.hurtRobotAt(currentBot, beam.y, beam.x)) {
                return i + 1;
            }
        }

        return 3;
    }
}