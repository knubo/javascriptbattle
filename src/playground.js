fieldWidth = 30;

function Arena(width, height) {
    this.width = width;
    this.height = height;
    this.bots = [];

    this.draw = function (target) {
        var table = new Element('table', {'class':'arena'});

        target.insert(table);

        for (y = 0; y < this.height; y++) {
            var row = new Element('tr');
            table.insert(row);
            for (x = 0; x < this.width; x++) {
                var cell = new Element('td');
                row.insert(cell);

                if (bot = this.findBot(x, y)) {
                	var pic = new Element('img', {'class':'fieldImage', 'src':bot.botBrain.picUrl, 'alt':'Player icon', 'title':'Player '+bot.botBrain.name});
                	cell.insert(pic);
                }
            }
        }
    }
    
    this.findBot = function (x,y) {
    	for (var i = 0; i< this.bots.length; i++) {
    		if (this.bots[i].x == x && this.bots[i].y == y) {
				return this.bots[i];
    		}
    	}
    }
    
    this.addBot = function (bot) {
    	this.bots[this.bots.length] = bot;
    }


}


function startBattle() {
    var arena = new Arena(20, 20);

    arena.addBot(new Bot(new BotBrain1(), 0, 3, Bot.DIRNORTH));
    arena.addBot(new Bot(new BotBrain2(), 2, 1, Bot.DIRNORTH));

    arena.draw($('playground'));
    for (var i=0; i<arena.bots.length; i++) {
    	var theBot = arena.bots[i];
    	var command = theBot.botBrain.decide(theBot);
    	move();
    }
    arena.draw($('playground'));

    
    function move() {
    	if (command.move) {
    		var posDelta = (command.move-1)*2-1;
    		
    		if (theBot.dir == Bot.DIRNORTH && theBot.y < 20) {
    			theBot.y = theBot.y + posDelta;
    		}
    		if (theBot.dir == Bot.DIRSOUTH && theBot.y > 0) {
    			theBot.y = theBot.y - posDelta;
    		}
    	}    
    }
}

