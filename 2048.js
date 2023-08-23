import Game from "./engine/game.js";

export const handleReset = function(event) {
    event.preventDefault();
    $( ".board div" ).remove();
    document.getElementById('score').innerHTML = 0;
    let game = new Game(4);
    return loadIntoDOM(game);
};

export const updateBoard = function(game) {
    $( ".board div" ).remove();
    for (let i=0; i < 16; i++){
        let tile = document.createElement('div');
        tile.innerHTML = game.getGameState().board[i];
        document.querySelector('.board').appendChild(tile);
    }
    document.getElementById('score').innerHTML = game.getGameState().score;
    if (game.getGameState().over === true){
        $('#click').append("You Lost! Click Reset to play again.")
    }
    if (game.getGameState().won === true){
        $('#click').append("You Won! Click Reset to play again or keep going.")
    }

}

export const loadIntoDOM = function(game) {
        const $board = $('.board');
        $( ".board div" ).remove();
        for (let i=0; i < 16; i++){
            let tile = document.createElement('div')
            tile.innerHTML = game.getGameState().board[i];
            document.querySelector('.board').appendChild(tile);
        }

        $('#click').on("click", ".reset", (event) => {
            $board.append(handleReset(event));
        })
        $(document).on('keydown', function (event){
            switch (event.key) {
                case 'ArrowRight':
                    game.move('right');
                    updateBoard(game);
                    break;
                case 'ArrowLeft':
                    game.move('left');
                    updateBoard(game);
                    break;
                case 'ArrowDown':
                    game.move('down');
                    updateBoard(game);
                    break;
                case 'ArrowUp':
                    game.move('up');
                    updateBoard(game);
                    break;
            }
        })

    }
    
    $(function() {
        let game = new Game(4);
        loadIntoDOM(game);
});