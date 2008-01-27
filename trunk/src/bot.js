//Directions
Bot.DIRNORTH = 1;
Bot.DIREAST = 2;
Bot.DIRSOUTH = 3;
Bot.DIRWEST = 4;

function Bot(botBrain, x, y, direction) {
	this.botBrain = botBrain;
    this.x = x;
    this.y = y;
    this.dir = direction;
}
