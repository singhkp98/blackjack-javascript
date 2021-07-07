/*******************************************BLACKJACK **************************************************************
 * Il codice sottostante rappresenta una versione semplificata del gioco del Blackjack.                            *
 *                                                                                                                 *
 * MODALITA' DI GIOCO:                                                                                             *
 * L'utente deve svolgere la partita contro il computer, il quale giocherà il suo turno in automatico.             *
 * L'utente gioca il suo turno realizzando un punteggio, successivamente il computer giocherà il suo turno         *
 * realizzando un suo punteggio. I due punteggi vengono messi a confronto e quello più alto vince.                 *
 *                                                                                                                 *
 * I PUNTEGGI:                                                                                                     *
 * Per il calcolo dei punteggi si esegue la somma dei valori delle carte estratte casualmente.                     *
 * - le carte da 2 a 10 hanno valore equivalente al loro numero                                                    *
 * - K, J, Q valgono 10 punti                                                                                      *
 * - A può assumere valori 1 o 10 a seconda del caso più favorevole                                                *
 *                                                                                                                 *
 * REGOLE DEL GIOCO:                                                                                               *
 * L'unica regola del gioco è quella di non superare i 21 punti. Se l'utente o il computer, superano 21 punti,     *
 * il turno è perso (o eventualmente pareggiato). Esempio:                                                         *
 * Utente = 18 punti vs Computer = 12 punti       VITTORIA UTENTE                                                  *
 * Utente = 18 punti vs Computer = +20            VITTORIA UTENTE                                                  *
 * Utente = 15 punti vs Computer = 20 punti       VITTORIA COMPUTER                                                *
 * Utente = +21 punti vs Computer = 20 punti      VITTORIA COMPUTER                                                *
 * Utente = +21 punti vs Computer = +21 punti     PAREGGIO                                                         *
 * Utente = 17 vs Computer = 17                   PAREGGIO                                                         *
 *                                                                                                                 *
 * COME GIOCARE:                                                                                                   *
 * Per avviare la partita l'utente deve cliccare sul tasto 'hit' che metterà sul tavolo la prima carta             *
 * selezionata in modo randomico. Successivamente l'utente può decidere di continuare a premere 'hit' per          *
 * ogni carta aggiuntiva che vuole giocare, tenendo a mente che appena il punteggio supera il valore 21 il         *
 * turno sarà perso. Una volta giocate le proprie carte l'utente preme il tasto 'stand' che passerà il turno       *
 * al computer il quale a sua volta giocherà le carte. Al termine del turno verrà mostrato il punteggio.           *
 * Per effettuare una nuova partita l'utente deve premere il tasto 'deal'.                                         *        
 *******************************************************************************************************************/

//Oggetto blackJack 
let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'J':10, 'Q':2, 'A':[1,10]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false, 
};

//utente
const YOU = blackjackGame['you'];

//computer
const DEALER = blackjackGame['dealer'];

//suoni di gioco
const hitSound = new Audio('static/sound/deal-card.wav');
const winSound = new Audio('static/sound/winning.wav'); 
const lossSound = new Audio('static/sound/game-over.wav'); 

//1= win, 0= lost
let winner; 

/* window.onload aspetta che si carichi completamente la pagina prima di estrarre i dati */
window.onload=function(){
    /* al click del bottone 'blackjack-x-button', l'eventListener ascolta l'evento di click,
    al seguito del quale chiama la funzione blackjackhit/blackjackDeal/dealerLogic */
    var hitButton = document.querySelector('#blackjack-hit-button');
    hitButton.addEventListener('click', blackjackHit);

    var dealButton = document.querySelector('#blackjack-deal-button');
    dealButton.addEventListener('click', blackjackDeal);

    var dealButton = document.querySelector('#blackjack-stand-button');
    dealButton.addEventListener('click', dealerLogic);
}

//Funzione di gioco per l'utente (tasto 'Hit')
function blackjackHit() {
    if(blackjackGame['isStand']===false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

//funzione per ripulire la schermata ed iniziare una nuova partita
function blackjackDeal() {
    if(blackjackGame['turnsOver'] === true) {

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        for(let i=0; i<yourImages.length; i++) {
            yourImages[i].remove();
        }

        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for(let j=0; j<dealerImages.length; j++) {
            dealerImages[j].remove(); 
        }

        YOU['score'] = 0; 
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

        document.querySelector('#blackjack-results').textContent = 'LET\'S TRY AGAIN!';
        document.querySelector('#blackjack-results').style.color = 'white';
    }
}

//funzione per mostrare le carte a schermo
function showCard(card, activePlayer) {
    if(activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/blackjack/${card}.png`; 
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

//funzione che restituisce una carta random
function randomCard() {
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

//funzione per aggiornare il punteggio
function updateScore(card, activePlayer) {
    //se la carta è un Asso (può avere valore 1 o 11)
    if(card === 'A'){
        //se aggiungere 11 mantiene il valore sotto 21 allora aggiungi 11 altrimenti aggiungi 1
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1]<=21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

//funzione per mostare il punteggio
function showScore(activePlayer) {
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

//dichiaro la funzione sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*la funzione asincrona permette al codice di non essere eseguito in modo lineare. 
* Dunque nel lasso di tempo in cui il computer gioca le sue carte, l'utente può scrollare la pagina
* ed effettuare altre operazioni. */

//funzione di gioco del computer
async function dealerLogic() {
    //stand mode has been activated
    blackjackGame['isStand'] = true;
    blackjackGame['turnsOver'] = false; 

    while(DEALER['score'] < 16 ) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        //richiamo la funzione sleep sopra dichiarata
        await sleep(1000);
    }
    
    blackjackGame['isStand'] = false; 
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner); 
}


//funzione che computa il vincitore 
function computeWinner() {

    if(YOU['score'] <= 21) {
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            winner = 1;
            blackjackGame['wins']++; 
        }
        else if (YOU['score'] < DEALER['score']){
            winner = 0;
            blackjackGame['losses']++; 
        }
        else if (YOU['score'] == DEALER['score']) {
            blackjackGame['draws']++; 
        }
    }

    //l'utente ha bustato ma il computer no
    else if(YOU['score'] > 21 && DEALER['score'] <= 21) {
        winner = 0; 
        blackjackGame['losses']++; 
    }
    //entrambi i giocatori hanno bustato (Pareggio)
    else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++; 
    }

    return winner; 
}

//funzione che mostra il risultato della partita (vittoria, sconfitta, pareggio)
function showResult(Winner) {
    let message, messageColor;

    if(blackjackGame['turnsOver'] === true) {
        if(winner === 1) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = "YOU WON!";
            messageColor = 'green'; 
            winSound.play();
            console.log("the winner is: " + winner);
        }
        else if(winner === 0) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = "YOU LOST!"; 
            messageColor = 'red';
            lossSound.play(); 
            console.log("the winner is: " + winner);
        }
        else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = "YOU DREW!";
            messageColor = 'yellow';
            lossSound.play(); 
            console.log("you drew");
        }

        document.querySelector('#blackjack-results').textContent = message;
        document.querySelector('#blackjack-results').style.color = messageColor;
    }
}