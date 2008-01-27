
function BotBrain1() {
    this.name = 'Klaus';
    this.picUrl = 'images/kst.jpg';

	//Should return a Command object.
	this.decide = function(bot) {
		var command = new Command();

		if (bot.y > 0 && bot.dir != Bot.DIRNORTH) {
			command.move = Command.MOVEFRONT;
		}
			
		return command;
	}

	this.hitted = function(hitInfo) {
	}

	this.looked = function(view) {
	}
}
