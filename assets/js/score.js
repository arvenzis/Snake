game.Score = (function() {
    let _totalScore;
    let Score = (function(score) {
        _totalScore = score;
    });

    let addPoint = (function() {
        _totalScore =+ 1;
    });

    let getTotalScore = (function() {
        return _totalScore;
    });

    return {
        Score: Score,
        addPoint: addPoint,
        getTotalScore: getTotalScore
    }
})();