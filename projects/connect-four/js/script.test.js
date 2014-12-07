QUnit.test("createMatrixTest", function(assert) {
    
    var game = $.fn.connectFour(),
        arr = game.createMatrix(2, 2, -1);
    
    assert.strictEqual(arr.length, 2, "Matrix creation with 2 rows" );
    assert.strictEqual(arr[0].length, 2, "Matrix creation with 2 cols" );
    assert.strictEqual(arr[~~(Math.random()*2)][~~(Math.random()*2)], -1, "Random element check with initial value" );
});

QUnit.test("togglePlayerTest", function(assert) {
    
    var game = $.fn.connectFour();
    
    game.togglePlayer();
    assert.strictEqual(game.config.activePlayer, 2, "Active player 2" );
    
    game.togglePlayer();
    assert.strictEqual(game.config.activePlayer, 1, "Active player 1" );
});

QUnit.test("isVerticalWinTest", function(assert) {
    var game = $.fn.connectFour();
    
    game.config.grid = [[1, 0, 0, 0, 0, 0, 0], 
                        [1, 0, 0, 0, 0, 0, 0],
                        [1, 0, 0, 0, 0, 0, 0],
                        [1, 0, 0, 0, 0, 0, 0]];
    assert.strictEqual(game.isVerticalWin(), true, "Vertical win!" );
        
    game.config.grid = [[0, 0, 0, 0, 0, 0, 0], 
                        [1, 0, 0, 0, 0, 0, 0],
                        [1, 0, 0, 0, 0, 0, 0],
                        [1, 0, 0, 0, 0, 0, 0]];
    assert.strictEqual(game.isVerticalWin(), false, "No winner yet!" );    
});

QUnit.test("isHorizontalWinTest", function(assert) {
    var game = $.fn.connectFour();
    
    game.config.grid = [[1, 0, 0, 0, 0, 0, 0], 
                        [1, 0, 0, 0, 0, 0, 0],
                        [1, 0, 0, 0, 0, 0, 0],
                        [1, 1, 1, 1, 0, 0, 0]];
    assert.strictEqual(game.isHorizontalWin(), true, "Horizontal win!" );
        
    game.config.grid = [[0, 0, 0, 0, 0, 0, 0], 
                        [1, 0, 0, 0, 0, 0, 0],
                        [1, 0, 0, 0, 0, 0, 0],
                        [1, 0, 0, 1, 1, 1, 0]];
    assert.strictEqual(game.isHorizontalWin(), false, "No winner yet!" );    
});

QUnit.test("isDiagonalWinTest", function(assert) {
    var game = $.fn.connectFour();
    
    game.config.grid = [[1, 0, 0, 0, 0, 0, 0], 
                        [0, 1, 0, 0, 0, 0, 0],
                        [0, 0, 1, 0, 0, 0, 0],
                        [0, 0, 0, 1, 0, 0, 0]];
    assert.strictEqual(game.isDiagonalWin(), true, "Top-left to Bottom-right" );
    
    game.config.grid = [[0, 0, 0, 1, 0, 0, 0], 
                        [0, 0, 1, 0, 0, 0, 0],
                        [0, 1, 0, 0, 0, 0, 0],
                        [1, 0, 0, 0, 0, 0, 0]];
    assert.strictEqual(game.isDiagonalWin(), true, "Bottom-left to Top-right" );
    
    game.config.grid = [[0, 0, 0, 1, 0, 0, 0], 
                        [0, 0, 0, 0, 0, 0, 0],
                        [0, 1, 0, 0, 0, 0, 0],
                        [1, 0, 0, 0, 0, 0, 0]];
    assert.strictEqual(game.isDiagonalWin(), false, "No winner yet!" );    
});

QUnit.test("isWinnerTest", function(assert) {
    var game = $.fn.connectFour();
    
    var arr = [1, 1, 1, 1, 0];
    assert.strictEqual(game.isWinner(arr), true, "Player 1 wins!" );
    
    arr = [1, 1, 0, 1, 0];
    assert.strictEqual(game.isWinner(arr), false, "No winner yet!" );
});

QUnit.test("isDrawTest", function(assert) {
    var game = $.fn.connectFour();
    game.config.rows = 2;
    game.config.cols = 2;
    
    game.config.grid = [[0, 0], [0, 0]];
    assert.strictEqual(game.isDraw(), false, "Game is active" );
    
    game.config.grid = [[1, 1], [1, 1]];
    assert.strictEqual(game.isDraw(), true, "Game is drawn" );
});