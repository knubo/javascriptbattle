function RandomBotBrain(name) {
    this.name = name;
    this.picUrl = 'images/questionMark.jpg';

    //Should return a Command object.
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

    this.hurt = function(shootingBot) {

    }

    this.hit = function(hurtBot) {
	}

    this.radar = function(bots) {
    }

    this.blocked = function() {

    }

}
