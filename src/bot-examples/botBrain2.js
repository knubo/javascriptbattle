
function BotBrain2(picUrl, name) {
    this.name = 'Knut Erik';
    this.picUrl = 'images/keb.jpg';

	//Should return a Command object.
	this.decide = function(bot) {

		var command = new Command();

        if(Math.random() > 0.5) {
            command.look = true;

        } else {
            command.move = Command.MOVEFRONT;
        }

		return command;
	}

	this.hitted = function(hitInfo) {
	}

	this.looked = function(view) {
	}
}
