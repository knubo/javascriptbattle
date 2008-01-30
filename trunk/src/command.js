Command.TURNLEFT = -1;
Command.TURNRIGHT = 1;

Command.MOVEFRONT = 1;

function Command() {
	this.shoot = false;
	this.move = false;
	this.turn = undefined;
	this.look = false;
}
