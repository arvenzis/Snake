let _score = game.Score.getTotalScore();
if (_score === undefined) {
    _score = 0;
}
$('body').prepend(Snake.assets.templates.score({score: _score}));