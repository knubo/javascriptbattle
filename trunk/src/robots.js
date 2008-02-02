function Robots(arena) {
    this.bots = [];
    this.arena = arena;
    this.boardElements = new Array(arena.height);
    for (var y = 0; y < arena.height; y++) {
        this.boardElements[y] = new Array(arena.width);
    }

    this.findBot = function (x, y) {
        for (var i = 0; i < this.bots.length; i++) {
            if (this.bots[i].x == x && this.bots[i].y == y) {
                return this.bots[i];
            }
        }
    }

    this.removeBot = function(bot) {

        this.boardElements[bot.y][bot.x] = null;
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

        this.addBot(new Bot(botbrain, posy, posx, Math.floor(Math.random(4)) + 1));

    }

    this.addBot = function(bot) {
        this.bots.push(bot);
        this.arena.newBot(bot);

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

    this.gameLoop = function() {
        this.makeOrder();
        for (var i = 0; i < this.bots.length; i++) {
            var currentBot = this.bots[i];
            try {
                var command = currentBot.botBrain.decide(currentBot);
                this.performCommand(currentBot, command);
            } catch(e) {
                console.error('Failed in decide');
                console.dir(e);
                console.dir(currentBot.botBrain);
            }
        }
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
                return;
            }

            this.boardElements[currentBot.y][currentBot.x] = null;

            currentBot.y = this.limitY(newY);
            currentBot.x = this.limitX(newX);

            this.boardElements[currentBot.y][currentBot.x] = currentBot;

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
            try {
                currentBot.botBrain.radar(this.robots);
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


    this.limitX = function(x) {
        if (x < 0) {
            return 0;
        }
        if (x > this.arena.width - 1) {
            return this.arena.width - 1;
        }

        return x;
    }

    this.limitY = function(y) {
        if (y < 0) {
            return 0;
        }
        if (y > this.arena.height - 1) {
            return this.arena.height - 1;
        }

        return y;
    }

    this.checkForCrash = function(y, x) {
        return this.boardElements[y][x] != null
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
            this.arena.explode(possibleTarget);
            //TODO try catch paranoia 
            possibleTarget.botBrain.hurt(shootingBot);
            shootingBot.botBrain.hit(possibleTarget);

            this.arena.updateHealth(possibleTarget);

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