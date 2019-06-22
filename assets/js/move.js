game.Move = (function() {
    let getNewPosition = (function(direction) {
        let snake = $('.snake');
        let snakePositionH = parseInt(snake.attr('data-h'));
        let snakePositionV = parseInt(snake.attr('data-v'));

        switch (direction) {
            case 'left':
                snakePositionH = snakePositionH - 1;
                break;
            case 'right':
                snakePositionH = snakePositionH + 1;
                break;
            case 'up':
                snakePositionV = snakePositionV - 1;
                break;
            case 'down':
                snakePositionV = snakePositionV + 1;
                break;
        }

        return {
            snakePositionH: snakePositionH,
            snakePositionV: snakePositionV
        }
    });

    return {
        getNewPosition: getNewPosition
    }
})();