
function BotBrain2(picUrl, name) {
    this.name = 'Knut Erik';
    this.picUrl = 'images/keb.jpg';
    this.count= 0;

    //Should return a Command object.
	this.decide = function(bot) {

		var command = new Command();

        if(Math.random() > 0.5) {
            command.look = true;
            return command;
        }


        if (this.count % 4 == 0) {
            command.turn = Command.TURNRIGHT;
        } else {
            command.move = Command.MOVEFRONT;
        }

        this.count++;
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
