let game = (function() {
    let horizontalSize = 600;
    let verticalSize = 400;
    let gridSize = 20;

    let buildGameFieldArray = (function() {
        let verticalIterations = verticalSize / gridSize;
        let horizontalIterations = horizontalSize / gridSize;

        let gameFieldArray = [];
        for (let i = 0; i < horizontalIterations ; i++) {
            if(!gameFieldArray[i]) {
                gameFieldArray[i] = [];
            }
            for (let j = 0; j < verticalIterations ; j++) {
                if (i === 10 && j === 8) {
                    gameFieldArray[i][j] = 'snake';
                } else {
                    gameFieldArray[i][j] = null;
                }
            }
        }

        drawGameField(gameFieldArray);
    });

    let drawGameField = (function(gameFieldArray) {
        for (let i = 0; i < gameFieldArray.length ; i++) {
            for (let j = 0; j < gameFieldArray[1].length ; j++) {
                if (gameFieldArray[i][j] === null) {
                    let emptyTile = createGameElement('game__tile', i.toString(), j.toString());
                    $(emptyTile).appendTo('.game__container');
                }
                if (gameFieldArray[i][j] === 'snake') {
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
        buildGameFieldArray: buildGameFieldArray
    }
})();