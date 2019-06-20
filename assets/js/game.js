let game = (function() {
    let horizontalSize = 600;
    let verticalSize = 400;
    let gridSize = 20;

    let buildGameBoard = (function() {
        let verticalIterations = verticalSize / gridSize;
        let horizontalIterations = horizontalSize / gridSize;

        let targetH = decideTargetLocation(30);
        let targetV = decideTargetLocation(20);

        let gameFieldsArray = [];
        for (let i = 0; i < horizontalIterations ; i++) {
            if(!gameFieldsArray[i]) {
                gameFieldsArray[i] = [];
            }
            for (let j = 0; j < verticalIterations ; j++) {
                if (i === 15 && j === 15) {
                    gameFieldsArray[i][j] = 'snake';
                } else {
                    gameFieldsArray[i][j] = null;
                }

                if (i === targetH && j === targetV) {
                    gameFieldsArray[i][j] = 'target';
                }
            }
        }

        return gameFieldsArray;
    });

    let drawGameBoard = (function(gameFieldsArray) {
        for (let i = 0; i < gameFieldsArray.length ; i++) {
            for (let j = 0; j < gameFieldsArray[1].length ; j++) {
                switch(gameFieldsArray[i][j]) {
                    case null:
                        let emptyTile = createGameElement('game__tile', i.toString(), j.toString());
                        $(emptyTile).appendTo('.game__container');
                        break;
                    case 'snake':
                        let snake = createGameElement('snake', i.toString(), j.toString());
                        $(snake).appendTo('.game__container');
                        break;
                    case 'target':
                        let target = createGameElement('target', i.toString(), j.toString());
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