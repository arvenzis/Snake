let game = (function() {
    let horizontalSize = 600;
    let verticalSize = 400;
    let gridSize = 20;

    let buildGameBoard = (function() {
        let verticalRows = verticalSize / gridSize;
        let horizontalRows = horizontalSize / gridSize;

        let targetH = decideTargetLocation(30);
        let targetV = decideTargetLocation(20);

        let gameFieldsArray = [];
        for (let h = 0; h < horizontalRows; h++) {
            if(!gameFieldsArray[h]) {
                gameFieldsArray[h] = [];
            }
            for (let v = 0; v < verticalRows; v++) {
                if (h === 15 && v === 15) {
                    gameFieldsArray[h][v] = 'snake';
                } else {
                    gameFieldsArray[h][v] = null;
                }

                if (h === targetH && v === targetV) {
                    gameFieldsArray[h][v] = 'target';
                }
            }
        }

        return gameFieldsArray;
    });

    let drawGameBoard = (function(gameFieldsArray) {
        for (let h = 0; h < gameFieldsArray.length; h++) {
            for (let v = 0; v < gameFieldsArray[1].length; v++) {
                switch(gameFieldsArray[h][v]) {
                    case null:
                        let emptyTile = createGameElement('game__tile', h.toString(), v.toString());
                        $(emptyTile).appendTo('.game__container');
                        break;
                    case 'snake':
                        let snake = createGameElement('snake', h.toString(), v.toString());
                        $(snake).appendTo('.game__container');
                        break;
                    case 'target':
                        let target = createGameElement('target', h.toString(), v.toString());
                        $(target).appendTo('.game__container');
                        break;
                }
            }
        }
    });

    let createGameElement = (function(classValue, dataH, dataV) {
        let element = document.createElement('div');
        element.setAttribute('class', classValue);
        element.setAttribute('data-h', dataH);
        element.setAttribute('data-v', dataV);

        return element;
    });

    let decideTargetLocation = (function(max) {
        let num = Math.floor(Math.random() * max) + 1;
        return (num === 15) ? decideTargetLocation(max) : num;
    });

    return {
        buildGameBoard: buildGameBoard,
        drawGameBoard: drawGameBoard
    }
})();