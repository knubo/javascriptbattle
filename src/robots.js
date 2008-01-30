function Robots(arena) {
    this.bots = [];
    this.arena = arena;

    this.findBot = function (x,y) {
    	for (var i = 0; i< this.bots.length; i++) {
    		if (this.bots[i].x == x && this.bots[i].y == y) {
				return this.bots[i];
    		}
    	}
    }

    this.addBot = function(bot) {
        this.bots.push(bot);
//        this.arena.newBot(bot);
    }

	this.gameLoop = function() {
	    for (var i=0; i<this.bots.length; i++) {
            var currentBot = this.bots[i];
            var command = currentBot.botBrain.decide(currentBot);
            this.performCommand(currentBot, command);
        }
	}

    this.performCommand = function(currentBot, command) {
    	if (command.move) {
    		if (currentBot.dir == Bot.DIRNORTH || currentBot.dir == Bot.DIRSOUTH) {
        		var posDelta = command.move-2;
                var newY = currentBot.y + posDelta;
            }
            
    		if (currentBot.dir == Bot.DIRWEST || currentBot.dir == Bot.DIREAST) {
        		var posDelta = (command.move-3)*-1;
                var newX = currentBot.x +posDelta;
            }

            currentBot.y = this.limitY(newY);
            currentBot.x = this.limitX(newX);
            this.arena.moveRobot(currentBot.img, currentBot.y, currentBot.x);
        }
    }
    	

    this.limitX = function(x) {
        if (x < 0) {
            return 0;
        }
        if (x > this.arena.width-1) {
            return this.arena.width-1;
        }
    }            

    this.limitY = function(y) {
        if (y < 0) {
            return 0;
        }
        if (y > this.arena.height-1) {
            return this.arena.height-1;
        }
    }            
    
}