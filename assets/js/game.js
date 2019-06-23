let game = (function() {
    let horizontalSize = 600;
    let verticalSize = 400;
    let gridSize = 20;

    let buildGameBoard = (function(snakeH = 15, snakeV = 15) {
        let verticalRows = verticalSize / gridSize;
        let horizontalRows = horizontalSize / gridSize;

        let gameFieldsArray = [];
        for (let v = 0; v < verticalRows; v++) {
            if(!gameFieldsArray[v]) {
                gameFieldsArray[v] = [];
            }
            for (let h = 0; h < horizontalRows; h++) {
                if ((h === snakeH && v === snakeV) &&
                    (h === targetH && v === targetV)) {
                    game.Score.addPoint();
                    $('.score').remove();
                    $('body').prepend(Snake.assets.templates.score({score: game.Score.getTotalScore}));
                }

                if (h === snakeH && v === snakeV) {
                    gameFieldsArray[v][h] = 'snake';
                } else if (h === targetH && v === targetV) {
                    gameFieldsArray[v][h] = 'target';
                } else {
                    gameFieldsArray[v][h] = null;
                }
            }
        }

        return gameFieldsArray;
    });

    let drawGameBoard = (function(gameFieldsArray) {
        $('.game__container').empty();

        for (let v = 0; v < gameFieldsArray.length; v++) {
            for (let h = 0; h < gameFieldsArray[v].length; h++) {
                switch(gameFieldsArray[v][h]) {
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

    let targetH = decideTargetLocation(30);
    let targetV = decideTargetLocation(20);

    return {
        buildGameBoard: buildGameBoard,
        drawGameBoard: drawGameBoard
    }
})();