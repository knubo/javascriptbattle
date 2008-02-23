
var queBrainA = null;
var queBrainB = null;
var botA = null;
var botB = null;

function setupTests() {

    queBrainA = new QueueBrain("BOT A");
    queBrainB = new QueueBrain("BOT B");

    botA = new Bot(queBrainA, 0, 0, 1);
    botB = new Bot(queBrainB, 1, 0, 1);

    robots.addBot(botA);
    robots.addBot(botB);    
}

function testLaserRange() {
    fail("Not implemented");
}

function testOK() {
    assertTrue(true);
}

function testFail() {
    assertTrue(false);
}