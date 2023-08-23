export {Game as default};
let Game = function (size) {
    var sizeSq = size*size;
    var boardArr = new Array(sizeSq);
    for (let i=0; i < sizeSq; i++){
        boardArr[i] = 0;
    }
    var tile = Math.floor(Math.random() * sizeSq);
    var tileNum = Math.floor(Math.random() * 10) + 1;
    if (tileNum === 1){
        boardArr[tile] = 4;
    } else {
        boardArr[tile] = 2;
    }

    var tile2 = Math.floor(Math.random() * sizeSq);
    for (let i=0; i < 1000000; i++){
        if (tile !== tile2){
            break;
        } else if (tile === tile2){
            tile2 = Math.floor(Math.random() * sizeSq);
        }
    }
    var tileNum2 = Math.floor(Math.random() * 10) + 1;
    if (tileNum2 === 1){
        boardArr[tile2] = 4;
    } else {
        boardArr[tile2] = 2;
    }

    let gameState = {
        board: boardArr,
        score: 0,
        won: false,
        over: false
    }
    
    var onMoveArr = [];
    var onWinArr = [];
    var onLoseArr = [];

    this.setupNewGame = function() {
    var sizeSq = size*size;
    var boardArr = new Array(sizeSq);
    for (let i=0; i < sizeSq; i++){
        boardArr[i] = 0;
    }

    var tile = Math.floor(Math.random() * sizeSq);
    var tileNum = Math.floor(Math.random() * 10) + 1;
    if (tileNum === 1){
        boardArr[tile] = 4;
    } else {
        boardArr[tile] = 2;
    }

    var tile2 = Math.floor(Math.random() * sizeSq);
    for (let i=0; i < boardArr.length; i++){
        if (boardArr[tile2] === 0){
            break;
        } else if (boardArr[tile2] !== 0){
            tile2 = Math.floor(Math.random() * sizeSq);
        }
    }
    var tileNum2 = Math.floor(Math.random() * 10) + 1;
    if (tileNum2 === 1){
        boardArr[tile2] = 4;
    } else {
        boardArr[tile2] = 2;
    }
    this.getGameState().board = boardArr;
    this.getGameState().score = 0;
    this.getGameState().won = false;
    this.getGameState().over = false;
    
    }

    this.loadGame = function(gameState){
        this.getGameState().board = gameState.board;
        this.getGameState().score = gameState.score;
        this.getGameState().won = gameState.won;
        this.getGameState().over = gameState.over;
    }
    
    this.move = function(direction){
        let canMove = true;
        let nextMove = true;
        let board1 = [];
        for (let i=0; i < this.getGameState().board.length; i++){
            board1.push(this.getGameState().board[i]);
        }
        if (direction === "up"){
            var upArr = [];
            for (let i=0; i < size; i++){
                var tempArr = [];
                for (let j=0; j < size; j++){
                    tempArr.push(this.getGameState().board[(size*j) + i]);
                }
                upArr.push(tempArr)
            }
            for (let i=0; i < size; i++){
                var tempUpArr = upArr[i];
                this.moveTiles(tempUpArr);   
            }
            let holder = 0;
            for (let i=0; i < size; i++){
                for (let j=0; j < size; j++){
                    var holdArr = upArr[j];
                    this.getGameState().board[holder] = holdArr[i];
                    holder++;
                } 
            }
            let board2 = this.getGameState().board;
            if (this.arrEquals(board1, board2)){
                canMove = false;
            }
            if (canMove === true){
                this.addTile();
            }
            if (this.checkForMove() === false){
                nextMove = false;
            }
        } else if (direction === "down"){
            var downArr = [];
            for (let i=0; i < size; i++){
                var tempArr = [];
                for (let j=size-1; j >= 0; j--){
                    tempArr.push(this.getGameState().board[(size*j) + i]);
                }
                downArr.push(tempArr)
            }
            for (let i=0; i < size; i++){
                var tempDownArr = downArr[i];
                this.moveTiles(tempDownArr);   
            }
            let holder = 0;
            for (let i=size-1; i >= 0; i--){
                for (let j=0; j < size; j++){
                    var holdArr = downArr[j];
                    this.getGameState().board[holder] = holdArr[i];
                    holder++;
                } 
            }
            let board2 = this.getGameState().board;
            if (this.arrEquals(board1, board2)){
                canMove = false;
            }
            if (canMove === true){
                this.addTile();
            }
            if (this.checkForMove() === false){
                nextMove = false;
            }
        } else if (direction === "left"){
            var leftArr = [];
            for (let i=0; i < size; i++){
                var tempArr = [];
                for (let j=0; j < size; j++){
                    tempArr.push(this.getGameState().board[(size*i) + j]);
                }
                leftArr.push(tempArr)
            }
            for (let i=0; i < size; i++){
                var tempLeftArr = leftArr[i];
                this.moveTiles(tempLeftArr);   
            }
            let holder = 0;
            for (let i=0; i < size; i++){
                for (let j=0; j < size; j++){
                    var holdArr = leftArr[i];
                    this.getGameState().board[holder] = holdArr[j];
                    holder++;
                } 
            }  
            let board2 = this.getGameState().board;
            if (this.arrEquals(board1, board2)){
                canMove = false;
            }
            if (canMove === true){
                this.addTile();
            }
            if (this.checkForMove() === false){
                nextMove = false;
            }
        } else if (direction === "right"){
            var rightArr = [];
            for (let i=0; i < size; i++){
                var tempArr = [];
                for (let j=0; j < size; j++){
                    tempArr.push(this.getGameState().board[(size*(i+1)) - (j+1)]);
                }
                rightArr.push(tempArr)
            }
            for (let i=0; i < size; i++){
                var tempRightArr = rightArr[i];
                this.moveTiles(tempRightArr);   
            }
            let holder = 0;
            for (let i=0; i < size; i++){
                for (let j=size-1; j >= 0; j--){
                    var holdArr = rightArr[i];
                    this.getGameState().board[holder] = holdArr[j];
                    holder++;
                } 
            }
            let board2 = this.getGameState().board;
            if (this.arrEquals(board1, board2)){
                canMove = false;
            }
            if (canMove === true){
                this.addTile();
            }
            if (this.checkForMove() === false){
                nextMove = false;
            }
        }     
        
        if (nextMove === false){
            this.getGameState().over = true;
        }
        
        if (this.getGameState().won === true){
            onWinArr.forEach(cb =>{
                cb(this.getGameState())
            })
        }
        if (this.getGameState().over === true){
            onLoseArr.forEach(cb =>{
                cb(this.getGameState())
            })
        } 
        onMoveArr.forEach(cb => {
            cb(this.getGameState())
        })  
    }

    this.moveTiles = function(array) {
        let hasComb = false;
        let canComb = true;
        for (let i=0; i < size-1; i++){
            hasComb = false;
            for (let j=i+1; j < size; j++){
                canComb = true;
                if (array[i] === 0 && array[j] === 0){
                    continue;
                } 
                if (array[i] !== 0 && array[j] === 0){
                    continue;
                }
                if (array[i] === 0 && array[j] !== 0){
                    array[i] = array[j];
                    array[j] = 0;
                }
                if (array[i] === array[j]){
                    let x = i+1;
                    while(x < j){
                        if (array[x] !== 0 && array[x] !== array[i]){
                            canComb = false;
                        }
                        x++;
                    }
                    if(canComb === false){
                        continue;
                    }
                    if (hasComb === true){
                        continue;
                    } else {
                        array[i] = array[i] + array[j];
                        array[j] = 0;
                        this.getGameState().score += array[i];
                        if (array[i] === 2048){
                            this.getGameState().won = true;
                        }
                        hasComb = true;
                    }
                }
            }
        }
    }

    this.testMove = function(array){
        let hasComb = false;
        let canComb = true;
        for (let i=0; i < size-1; i++){
            hasComb = false;
            for (let j=i+1; j < size; j++){
                canComb = true;
                if (array[i] === 0 && array[j] === 0){
                    continue;
                } 
                if (array[i] !== 0 && array[j] === 0){
                    continue;
                }
                if (array[i] === 0 && array[j] !== 0){
                    array[i] = array[j];
                    array[j] = 0;
                }
                if (array[i] === array[j]){
                    let x = i+1;
                    while(x < j){
                        if (array[x] !== 0 && array[x] !== array[i]){
                            canComb = false;
                        }
                        x++;
                    }
                    if(canComb === false){
                        continue;
                    }
                    if (hasComb === true){
                        continue;
                    } else {
                        array[i] = array[i] + array[j];
                        array[j] = 0;
                        hasComb = true;
                    }
                }
            }
        }
    }

    this.addTile = function() {
        var newTile = Math.floor(Math.random() * sizeSq);
        for (let i=0; i < 1000000; i++){
            if (this.getGameState().board[newTile] === 0){
                break;
            } else if (this.getGameState().board[newTile] !== 0){
                newTile = Math.floor(Math.random() * sizeSq);
            }
        }
        var newTileNum = Math.floor(Math.random() * 10) + 1;
        if (newTileNum === 1){
            this.getGameState().board[newTile] = 4;
        } else {
            this.getGameState().board[newTile] = 2;
        }   
    }

    this.arrEquals = function(b1, b2){
        if (b1.length === b2.length){
            for (let i=0; i < b1.length; i ++){
                if (b1[i] !== b2[i]){
                    return false;
                }
            }
        } else {
            return false;
        }
        return true;
    }

    this.checkForMove = function(){
        var upArr = [];
        for (let i=0; i < size; i++){
            var tempArr = [];
            for (let j=0; j < size; j++){
                tempArr.push(this.getGameState().board[(size*j) + i]);
            }
            upArr.push(tempArr)
        }
        for (let i=0; i < size; i++){
            var tempUpArr = upArr[i];
            this.testMove(tempUpArr);   
        }
        let upHolder = 0;
        let upBoard = [];
        for (let i=0; i < size; i++){
            for (let j=0; j < size; j++){
                var holdArr = upArr[j];
                upBoard[upHolder] = holdArr[i];
                upHolder++;
            } 
        }

        var downArr = [];
        for (let i=0; i < size; i++){
            var tempArr = [];
            for (let j=size-1; j >= 0; j--){
                tempArr.push(this.getGameState().board[(size*j) + i]);
            }
            downArr.push(tempArr)
        }
        for (let i=0; i < size; i++){
            var tempDownArr = downArr[i];
            this.testMove(tempDownArr);   
        }
        let downHolder = 0;
        let downBoard = [];
        for (let i=size-1; i >= 0; i--){
            for (let j=0; j < size; j++){
                var holdArr = downArr[j];
                downBoard[downHolder] = holdArr[i];
                downHolder++;
            } 
        }

        var leftArr = [];
        for (let i=0; i < size; i++){
            var tempArr = [];
            for (let j=0; j < size; j++){
                tempArr.push(this.getGameState().board[(size*i) + j]);
            }
            leftArr.push(tempArr)
        }
        for (let i=0; i < size; i++){
            var tempLeftArr = leftArr[i];
            this.testMove(tempLeftArr);   
        }
        let leftHolder = 0;
        let leftBoard = [];
        for (let i=0; i < size; i++){
            for (let j=0; j < size; j++){
                var holdArr = leftArr[i];
                leftBoard[leftHolder] = holdArr[j];
                leftHolder++;
            } 
        }  

        var rightArr = [];
        for (let i=0; i < size; i++){
            var tempArr = [];
            for (let j=0; j < size; j++){
                tempArr.push(this.getGameState().board[(size*(i+1)) - (j+1)]);
            }
            rightArr.push(tempArr)
        }
        for (let i=0; i < size; i++){
            var tempRightArr = rightArr[i];
            this.testMove(tempRightArr);   
        }
        let rightHolder = 0;
        let rightBoard = [];
        for (let i=0; i < size; i++){
            for (let j=size-1; j >= 0; j--){
                var holdArr = rightArr[i];
                rightBoard[rightHolder] = holdArr[j];
                rightHolder++;
            } 
        }
            for (let i=0; i < upBoard.length; i++){
                if (upBoard[i] !== downBoard[i] || downBoard[i] !== leftBoard[i] 
                    || leftBoard[i] !== rightBoard[i] || upBoard[i] !== rightBoard[i]){
                    return true;
                }
            }
        return false;
        
        
    }

    this.toString = function(){
        console.log(this.getGameState());
    }

    this.onMove = function(callback){
        onMoveArr.push(callback);

    }

    this.onWin = function(callback){
        onWinArr.push(callback);
    }

    this.onLose = function(callback){
        onLoseArr.push(callback);
    }

    this.getGameState = function(){
        return gameState;
    }
}