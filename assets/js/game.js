let game = (function() {
    let horizontalSize = 600;
    let verticalSize = 400;
    let gridSize = 20;

    var _foodH;
    var _foodV;

    let Game = (function() {
        game.Handlebars.setScore();
        setFoodLocation();
    });

    let buildGameBoard = (function(snakeH = 15, snakeV = 15) {
        let verticalRows = verticalSize / gridSize;
        let horizontalRows = horizontalSize / gridSize;

        let gameFieldsArray = [];
        for (let v = 0; v < verticalRows; v++) {
            if(!gameFieldsArray[v]) {
                gameFieldsArray[v] = [];
            }
            for (let h = 0; h < horizontalRows; h++) {
                if (h === snakeH && v === snakeV) {
                    gameFieldsArray[v][h] = 'snake';
                } else if (h === _foodH && v === _foodV) {
                    gameFieldsArray[v][h] = 'food';
                } else {
                    gameFieldsArray[v][h] = null;
                }

                if ((h === snakeH && v === snakeV) &&
                    (h === _foodH && v === _foodV)) {
                    gameFieldsArray[v][h] = 'snake & food';
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
                    case 'snake & food': //collision detected
                        game.Score.addPoint();
                        $('.score').remove();
                        game.Handlebars.setScore();
                        setFoodLocation();
                        gameFieldsArray[v][h] = 'snake';
                        break;
                    case null:
                        let emptyTile = createGameElement('game__tile', h.toString(), v.toString());
                        $(emptyTile).appendTo('.game__container');
                        break;
                    case 'snake':
                        let snake = createGameElement('snake', h.toString(), v.toString());
                        $(snake).appendTo('.game__container');
                        break;
                    case 'food':
                        let food = createGameElement('food', h.toString(), v.toString());
                        $(food).appendTo('.game__container');
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

    let decideFoodLocation = (function(max) {
        let num = Math.floor(Math.random() * max) + 1;
        return (num === 15) ? decideFoodLocation(max) : num;
    });

    let setFoodLocation = (function() {
        _foodH = decideFoodLocation(30);
        _foodV = decideFoodLocation(20);
    });

    return {
        Game: Game,
        buildGameBoard: buildGameBoard,
        drawGameBoard: drawGameBoard,
        createGameElement: createGameElement
    }
})();