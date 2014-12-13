/*
 * Customized mutable plugin boilerplate
 * Author: @pankajparashar
 * Last Edited: 07Dec2014
 * Licensed under the MIT license
 *
 */

(function ($, window, document) {

    "use strict";

    // Plugin constructor
    var Game = function (options) {
        this.options = options;
    };

    // Plugin hook
    $.fn.connectFour = function (options) {
        return new Game(options);
    };

    // Plugin prototype
    Game.prototype = {
        config: {
            rows: 4,
            cols: 7,
            countTo: 4,
            activePlayer: 1
        },

        init: function () {
            this.config = $.extend({}, this.config, this.options);
            this.config.grid = this.createMatrix(this.config.rows, this.config.cols, 0);

            this.createGrid();
            $(document).on('click', '.grid-cell', {
                self: this
            }, this.play);
            $(document).on('click', '.js-reset', $.proxy(this.reset, this));
        },

        createMatrix: function (numRows, numCols, initialValue) {
            var arr = [];
            for (var i = 0; i < numRows; i++) {
                var columns = [];
                for (var j = 0; j < numCols; j++) {
                    columns[j] = initialValue;
                }
                arr[i] = columns;
            }
            return arr;
        },

        play: function (event) {
            var self = event.data.self,
                closest_tr = $(this).closest('tr'),
                closest_td = $(this).closest('td'),
                x = closest_tr.index(),
                y = closest_td.index();

            $(this).remove();
            var cell = $('<span></span>').appendTo(closest_td);
            cell.addClass('player' + self.config.activePlayer);

            // Capture the player no. in the grid
            self.config.grid[x][y] = self.config.activePlayer;

            // Enable the button right above the clicked button
            self.activateCell(closest_tr, closest_td);

            if (self.isHorizontalWin() || self.isVerticalWin() || self.isDiagonalWin()) {
                $('output').text('Player ' + self.config.activePlayer + ' wins!');
                $('.grid').addClass('game-end');
                $('.grid-cell').prop('disabled', true);
                return;
            } else if (self.isDraw()) {
                $('output').text('Game is draw!');
                $('.grid').addClass('game-end');
                $('.grid-cell').prop('disabled', true);
                return;
            }

            self.togglePlayer();
        },

        activateCell: function (x, y) {
            var prev_row = x.prev(),
                curr_col = prev_row.find('td').eq(y.index());

            // Enable the button right above the clicked button
            curr_col.children().eq(0).prop('disabled', false);
        },

        reset: function () {
            $('.grid').remove();
            $('output').text("Player 1's turn");

            this.init();
        },

        createGrid: function () {
            var grid = $('<table class="grid"></table>');

            for (var i = 0; i < this.config.rows; i++) {
                var row = $('<tr class="grid-row"></tr>').appendTo(grid);
                for (var j = 0; j < this.config.cols; j++) {
                    $('<td class="grid-col"><button class="grid-cell" disabled></button></td>').appendTo(row);
                }
            }

            grid.appendTo('body');
            $('.grid-row:last-child .grid-cell').prop('disabled', false);
        },

        togglePlayer: function () {
            this.config.activePlayer = (this.config.activePlayer === 1) ? 2 : 1;
            $('output').text('Player ' + this.config.activePlayer + "'s turn");
        },

        isVerticalWin: function () {
            for (var j = 0; j < this.config.cols - 1; j++) {
                var arr = [];
                for (var i = this.config.rows - 1; i >= 0; i--) {
                    arr.push(this.config.grid[i][j]);
                }
                if (this.isWinner(arr)) {
                    return true;
                }
            }
            return false;
        },

        isHorizontalWin: function () {
            for (var i = this.config.rows - 1; i >= 0; i--) {
                if (this.isWinner(this.config.grid[i])) {
                    return true;
                }
            }
            return false;
        },

        isDiagonalWin: function () {
            var grid = this.config.grid,
                rows = this.config.rows,
                cols = this.config.cols,
                i, j, k, arr;

            // Top-left to bottom-right
            for (i = 0; i <= (cols + rows - 2); i++) {
                arr = [];
                for (j = 0, k = i; j <= i; j++, k--) {
                    if (j < rows && k < cols) {
                        arr.push(grid[j][k]);
                    }
                }
                if (arr.length >= 4 && this.isWinner(arr)) {
                    return true;
                }
            }

            // Bottom-left to Top-right
            for (i = 1 - rows; i < cols; i++) {
                arr = [];
                for (j = 0; j < rows; j++) {
                    if ((i + j) >= 0 && (i + j) < cols) {
                        arr.push(grid[j][i + j]);
                    }
                }
                if (arr.length >= 4 && this.isWinner(arr)) {
                    return true;
                }
            }

            return false;
        },

        isWinner: function (arr) {
            var tally = 0;

            for (var i = 0; i < arr.length - 1; i++) {
                if (arr[i] === arr[i + 1] && arr[i] !== 0) {
                    tally += 1;
                } else {
                    tally = 0;
                }
                if (tally === this.config.countTo - 1) {
                    return true;
                }
            }

            return false;
        },

        isDraw: function () {
            for (var i = 0; i < this.config.rows; i++) {
                for (var j = 0; j < this.config.cols; j++) {
                    if (this.config.grid[i][j] === 0) {
                        return false;
                    }
                }
            }

            // No locations were empty. Return true to indicate that the game is a draw.
            return true;
        }
    };
})(jQuery, window, document);