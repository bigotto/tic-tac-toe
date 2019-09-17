const tic_tac_toe = {
    board: ['', '', '','','','','','',''],
    simbols: {
        options: ['X', 'O'],
        turn_index: 0,
        change: function(){
            this.turn_index = (this.turn_index === 0 ? 1: 0);
        }
    },
    container_element: null,
    gameover: false,

    winning_sequences: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    init: function(container){
        this.container_element = container;
    },

    make_play: function(position){
        if(this.gameover){
            return false;
        }
        if(this.board[position] === ''){
            //Casa vazia
            this.board[position] = this.simbols.options[this.simbols.turn_index];
            this.draw();
            let winning_sequences_index = this.check_winning_sequence(this.simbols.options[this.simbols.turn_index]);
            if(winning_sequences_index >= 0){
                //ganhador
                this.markWinnerSequence(this.winning_sequences[winning_sequences_index]);
                this.game_is_over();
            
            }else{
                this.simbols.change();
            }
            return true;
        } else{
            return false;
        }
    },

    check_winning_sequence: function(simbol) {
        for( i in this.winning_sequences){
            if(this.board[this.winning_sequences[i][0] ] == simbol &&
               this.board[this.winning_sequences[i][1] ] == simbol &&
               this.board[this.winning_sequences[i][2] ] == simbol ){
                console.log('Sequencia vencedora ' + i);   
                return i;       
            }
        };
        return -1;
    },

    defineWinner: function() {
        if( this.simbols.turn_index === 0)
            return "Jogador X venceu!";
        else
            return "Jogador O venceu!";
    },

    markWinnerSequence: function(sequence){
        console.log(sequence);
        for (let i=0; i<3;i++){           
            let item_id = sequence[i];
            document.querySelector('#winPos'+item_id).classList.add('winningPosition');
        }
    },

    renderMsg: function(){
        let h3Element = document.querySelector('h3');
        console.log(h3Element);
        let winner = this.defineWinner();
        let textNode = document.createTextNode(winner);
        h3Element.appendChild(textNode);
    },

    clearMsg: function(){
        let h3Element = document.querySelector('h3');
        h3Element.innerHTML = '';
    },

    playSong: function(){
        var audio = new Audio('victory-sound.mp3');
        audio.play();
    },
    
    game_is_over: function(){
       this.gameover = true;
       console.log('GAME OVER');
       this.renderMsg();
       this.playSong();
    },

    emptyTable: function(){
        this.start()
    },

    start: function(){
        this.clearMsg();
        this.board.fill('');
        this.draw();
        this.gameover = false;
    },

    checkDraw: function(){
        let mark = 0;
        for(i in this.board){
            if(this.board[i] !=='')
                mark++;
        }
        if(mark == this.board.length)
            return true;
        else
            return false;
    },

    drawMsg: function(){
        let h3Element = document.querySelector('h3');
        console.log(h3Element);
        let textNode = document.createTextNode('Empate!');
        h3Element.appendChild(textNode);
    },
    
    draw: function(){
        let content = '';
        if(this.checkDraw() === true){
            gameover = true;
            console.log("Velha");
            this.drawMsg();
        }
        for( i  in this.board) {
            content += '<div onclick="tic_tac_toe.make_play(' + i + ')"id="winPos' + i + '">' + this.board[i] + '</div>';
        }
        this.container_element.innerHTML = content;
        var buttonElement =  document.querySelector('button');
        buttonElement.onclick = reset;
    }
};
function reset(){
    tic_tac_toe.start();
}
