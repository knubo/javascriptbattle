function Arena(width, height) {

    this.draw = function (target) {
        var table = new Element('table', {'class':'arena'});

        target.insert(table);

        for (y = 0; y < this.height; y++) {
            var row = new Element('tr');
            table.insert(row);
            for (x = 0; x < this.width; x++) {
                var col = new Element('td');
                row.insert(col);
            }
        }
    }

    this.width = width;
    this.height = height;


}


function startBattle() {
    var arena = new Arena(20, 20);

    arena.draw($('playground'));


}