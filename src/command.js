Command.TURNLEFT = -1;
Command.TURNRIGHT = 1;

Command.MOVEFRONT = 1;
Command.MOVEFRONT2 = 2;

function Command() {
	this.shoot = false;
	this.move = undefined;
	this.turn = undefined;
	this.look = false;
}
