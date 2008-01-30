function BotBrain1() {
    this.name = 'Klaus';
    this.picUrl = 'images/kst.jpg';
    this.count = 0;

	//Should return a Command object.
	this.decide = function(bot) {
		var command = new Command();

		if (count % 4 == 0) {
            command.turn = Command.TURNLEFT;
		} else {
			command.move = Command.MOVEFRONT;
		}

        count++;
		return command;
	}

	this.hitted = function(hitInfo) {
	}

	this.radar = function(view) {
	}
}
