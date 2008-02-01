function Robots(arena) {
    this.bots = [];
    this.arena = arena;


    this.findBot = function (x, y) {
        for (var i = 0; i < this.bots.length; i++) {
            if (this.bots[i].x == x && this.bots[i].y == y) {
                return this.bots[i];
            }
        }
    }

    this.addBot = function(bot) {
        this.bots.push(bot);
        this.arena.newBot(bot);
    }

    this.rnd = function(ceiling) {
        return Math.floor(Math.random() * ceiling)
    }

    this.makeOrder = function() {
        var i;
        for (i in this.bots) {
            this.bots[i].pri = Math.random();
        }
        this.bots.sort(function(a, b) {return a.pri - b.pri});
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

    this.performCommand = function(currentBot, command) {
        if (command.move) {
            var newY = currentBot.y;
            var newX = currentBot.x;

            if (currentBot.dir == Bot.DIRNORTH || currentBot.dir == Bot.DIRSOUTH) {
                newY += (currentBot.dir - 2);
            }

            if (currentBot.dir == Bot.DIRWEST || currentBot.dir == Bot.DIREAST) {               
                newX += ((currentBot.dir - 3) * -1);
            }

            if(this.checkForCrash(newY, newX)) {
                try {
                  currentBot.botBrain.blocked();
                } catch(e) {
                    console.error('Failed in blocked');
                    console.dir(e);
                    console.dir(currentBot.botBrain);
                }
               return; 
            }

            currentBot.y = this.limitY(newY);
            currentBot.x = this.limitX(newX);
            this.arena.moveRobot(currentBot);
        } else if(command.turn) {
            currentBot.dir += command.turn;

            if(currentBot.dir < 1) {
                currentBot.dir = 4;
            }
            if(currentBot.dir > 4) {
                currentBot.dir = 1;
            }

            this.arena.turnRobot(currentBot);
        } else if(command.look) {
            try {
                currentBot.botBrain.radar(this.bots);
            } catch(e) {
               console.error('Failed in radar');
               console.dir(e);
               console.dir(currentBot.botBrain);
            }
            this.arena.radar(currentBot);
        } else if(command.shoot) {
            this.arena.laser(currentBot);
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
        var i;
        for (i in this.bots) {
           if(this.bots[i].y == y && this.bots[i].x == x) {
               return true;
           }
        }
        return false;
    }

}