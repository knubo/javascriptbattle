function BotBrain1() {
    this.name = 'Klaus';
    this.picUrl = 'images/kst.jpg';
    this.roundCount = 0;

	//Should return a Command object.
    this.decide = function(bot) {
        var command = new Command();

        if(Math.random() > 0.8) {
            command.shoot = true;
            return command;
        }

        if (this.roundCount % 4 == 0) {
            command.turn = Command.TURNLEFT;
        } else {
            command.move = Command.MOVEFRONT;
        }

        this.roundCount++;
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

    this.boardInfo = function(height, width) {

    }
    
}
