const pieces = document.querySelectorAll(".board-piece");
pieces.forEach(piece => piece.addEventListener('click', handleClick, {once: true}));
const congratsMessage = document.querySelector('.congrats');

const board = (() => {
    let winner = 'undecided';
    let xTurn = true;
    let board = [
        ['empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty'],
    ];
    const posToBoard = (num) => {
        let row = 0;
        let col = 0;
        while(num > 3){
            row++;
            num -= 3;
        }
        while(num > 1){
            col++;
            num--;
        }
        return([row, col]);
    };
    const makeMove = (num) => {
        let [row, col] = posToBoard(num);
        if(xTurn){
            board[row][col] = 'X';
            xTurn = !xTurn;
        }else{
            board[row][col] = 'O';
            xTurn = !xTurn;
        }
    }
    const getLastMark = (() => {
        if(xTurn){
            return 'O';
        }else{
            return 'X';
        }
    });
    const vertWinner = (() => {
        for(let i = 0; i < 3; i++){
            if(board[0][i] != 'empty' && board[0][i] == board[1][i] && board[1][i] == board[2][i]){
                winner = board[0][i];
                return true;
            }
        }
        return false;
    });
    const horiWinner = (() => {
        for(let i = 0; i < 3; i++){
            if(board[i][0] != 'empty' && board[i][0] == board[i][1] && board[i][1] == board[i][2]){
                winner = board[i][0];
                return true;
            }
        }
        return false;
    });
    const diagWinner = (() => {
        if(board[0][0] != 'empty' && board[0][0] == board[1][1] && board[1][1] == board[2][2]){
            winner = board[0][0];
            return true;
        }
        if(board[2][0] != 'empty' && board[2][0] == board[1][1] && board[1][1] == board[0][2]){
            winner = board[2][0];
            return true;
        }
        return false;
    });
    const checkForWinners = (() => {
        if(vertWinner() || horiWinner() || diagWinner()){
            return true;
        }
        return false;
    });
    const isNotDecided = (() => {
        return (winner == 'undecided');
    });
    const getWinner = (() => {
        return winner;
    });
    return {isNotDecided, makeMove, getLastMark, checkForWinners, getWinner};
})();

function handleClick(){
    if(board.isNotDecided()){
        board.makeMove(this.classList[1]);
        this.textContent = board.getLastMark();
        if(board.checkForWinners()){
            congratsMessage.textContent = `${board.getWinner()} wins!`
        }
    }
}
    