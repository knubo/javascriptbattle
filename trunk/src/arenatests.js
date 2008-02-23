var queBrainA = null;
var queBrainB = null;
var botA = null;
var botB = null;

var shootCommand = {shoot:true};

function setupTests() {

    queBrainA = new QueueBrain("BOT A");
    queBrainB = new QueueBrain("BOT B");

    botA = new Bot(queBrainA, 0, 0, 1);
    botB = new Bot(queBrainB, 1, 0, 1);

    robots.addBot(botA);
    robots.addBot(botB);
    arena.updatePlayerInfo(robots.bots);
}

function testLaserRangeWest() {

    botB.health = 3;
    robots.setBotLocation(botA, {x:4, y:0, dir:4});
    robots.setBotLocation(botB, {x:1, y:0, dir:1});
    queBrainA.addCommand(shootCommand);

    robots.gameLoop();
    assertEquals("Failed to hurt bot", botB.health, 2);

    robots.setBotLocation(botA, {x:5, y:0, dir:4});

    queBrainA.addCommand(shootCommand);
    robots.gameLoop();
    assertEquals("Shouldn't have hurt bot", botB.health, 2);

}

function testLaserRangeNorth() {


    robots.setBotLocation(botA, {x:1, y:4, dir:1});
    robots.setBotLocation(botB, {x:1, y:1, dir:1});
    botB.health = 3;
    queBrainA.addCommand(shootCommand);

    robots.gameLoop();
    assertEquals("Failed to hurt bot", botB.health, 2);

    robots.setBotLocation(botA, {x:1, y:5, dir:1});

    queBrainA.addCommand(shootCommand);
    robots.gameLoop();
    assertEquals("Shouldn't have hurt bot", botB.health, 2);
}

