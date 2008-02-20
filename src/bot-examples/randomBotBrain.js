function RandomBotBrain(name) {
    this.name = name;
    this.picUrl = 'images/questionMark.jpg';

    /* Should return a Command object. */
    this.decide = function(bot) {

        var command = new Command();

        var cmd = Math.floor(Math.random() * 4);

        switch (cmd) {
            case 0:
                command.turn = Command.TURNLEFT;
                break;
            case 1:
                command.turn = Command.TURNRIGHT;
                break;
            case 2:
                command.move = Command.MOVEFRONT;
                break;
            case 3:
                command.shoot = true;
                break;
        }

        return command;
    }

    /* Called when this bot is hit. */
    this.hurt = function(shootingBot) {

    }

    /* Called when this bot hits another bot. */
    this.hit = function(hurtBot) {
	}

    /* Called when decided to look. Gets info about all bots alive. */
    this.radar = function(bots) {
    }

    /* Movement was blocked. */
    this.blocked = function() {

    }

    /* Called initially so the botbrain can remember board size. */
    this.boardInfo = function(height, width) {

    }


}
