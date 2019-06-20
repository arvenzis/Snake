let game = (function() {
    let horizontalSize = 600;
    let verticalSize = 400;
    let gridSize = 20;

    let buildGameBoard = (function() {
        let verticalIterations = verticalSize / gridSize;
        let horizontalIterations = horizontalSize / gridSize;

        let gameFieldsArray = [];
        for (let i = 0; i < horizontalIterations ; i++) {
            if(!gameFieldsArray[i]) {
                gameFieldsArray[i] = [];
            }
            for (let j = 0; j < verticalIterations ; j++) {
                if (i === 10 && j === 8) {
                    gameFieldsArray[i][j] = 'snake';
                } else {
                    gameFieldsArray[i][j] = null;
                }
            }
        }

        return gameFieldArray;
    });

    let drawGameBoard = (function(gameFieldsArray) {
        for (let i = 0; i < gameFieldsArray.length ; i++) {
            for (let j = 0; j < gameFieldsArray[1].length ; j++) {
                if (gameFieldsArray[i][j] === null) {
                    let emptyTile = createGameElement('game__tile', i.toString(), j.toString());
                    $(emptyTile).appendTo('.game__container');
                }
                if (gameFieldsArray[i][j] === 'snake') {
                    let snake = createGameElement('snake', i.toString(), j.toString());
                    $(snake).appendTo('.game__container');
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

    return {
        buildGameBoard: buildGameBoard,
        drawGameBoard: drawGameBoard
    }
})();