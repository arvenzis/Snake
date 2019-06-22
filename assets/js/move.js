game.Move = (function() {
    let getNewPosition = (function(direction) {
        let snake = $('.snake');
        let snakePositionH = parseInt(snake.attr('data-h'));
        let snakePositionV = parseInt(snake.attr('data-v'));

        if (direction === 'left') {
            snakePositionH = snakePositionH - 1;
            return {
                snakePositionH: snakePositionH,
                snakePositionV: snakePositionV
            }
        }

    });

    return {
        getNewPosition: getNewPosition
    }
})();