game.Score = (function() {
    let _totalScore = 0;

    let addPoint = (function() {
        _totalScore = _totalScore + 1;
    });

    let getTotalScore = (function() {
        return _totalScore;
    });

    return {
        addPoint: addPoint,
        getTotalScore: getTotalScore
    }
})();