let game = (function() {
    let horizontalSize = 600;
    let verticalSize = 400;
    let gridSize = 20;

    let buildGameField = (function() {
        let verticalIterations = verticalSize / gridSize;
        let horizontalIterations = horizontalSize / gridSize;

        let gameFieldArray = [];
        for (let i = 0; i < horizontalIterations ; i++) {
            if(!gameFieldArray[i]) {
                gameFieldArray[i] = [];
            }
            for (let j = 0; j < verticalIterations ; j++) {
                gameFieldArray[i][j] = null;
            }
        }
        console.log(gameFieldArray);
    });

    return {
        buildGameField: buildGameField
    }
})();