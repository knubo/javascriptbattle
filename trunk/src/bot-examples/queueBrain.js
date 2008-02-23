function QueueBrain(name) {
    this.name = name;
    this.picUrl = 'http://www.knubo.no/bilder/testRobot.jpg';

    this.commandQueue = [];

    //Should return a Command object.
    this.decide = function(bot) {
        this.myself = bot;

        if(this.commandQueue.length == 0) {
            return {};
        }

        return this.commandQueue.shift();
    }

    this.addCommand = function(command) {
        this.commandQueue.push(command);
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
        this.height = height;
        this.width = width;
        this.commandQueue = [];
    }

}
