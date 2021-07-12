# blackjack-javascript
Simplified version of Blackjack game in Javascript

# javascript-challanges

Simple Javascript Project. 

User interface implementation: HTML, CSS, Bootrstap
Game implementation: Javascript

Launch index.html to play. 
                                                                                                            
  #Modalità di gioco                                                                                             
  L'utente deve svolgere la partita contro il computer, il quale giocherà il suo turno in automatico.             
  L'utente gioca il suo turno realizzando un punteggio, successivamente il computer giocherà il suo turno         
  realizzando un suo punteggio. I due punteggi vengono messi a confronto e quello più alto vince.                 
                                                                                                                  
  #I punteggi                                                                                                    
  Per il calcolo dei punteggi si esegue la somma dei valori delle carte estratte casualmente.                     
  - le carte da 2 a 10 hanno valore equivalente al loro numero                                                    
  - K, J, Q valgono 10 punti                                                                                      
  - A può assumere valori 1 o 10 a seconda del caso più favorevole                                                
                                                                                                                  
  #Regole del gioco                                                                                               
  L'unica regola del gioco è quella di non superare i 21 punti. Se l'utente o il computer, superano 21 punti,     
  il turno è perso (o eventualmente pareggiato). Esempio:                                                         
  Utente = 18 punti vs Computer = 12 punti       VITTORIA UTENTE                                                  
  Utente = 18 punti vs Computer = +20            VITTORIA UTENTE                                                  
  Utente = 15 punti vs Computer = 20 punti       VITTORIA COMPUTER                                                
  Utente = +21 punti vs Computer = 20 punti      VITTORIA COMPUTER                                                
  Utente = +21 punti vs Computer = +21 punti     PAREGGIO                                                         
  Utente = 17 vs Computer = 17                   PAREGGIO                                                        
                                                                                                                  
  #Come giocare                                                                                                  
  Per avviare la partita l'utente deve cliccare sul tasto 'hit' che metterà sul tavolo la prima carta             
  selezionata in modo randomico. Successivamente l'utente può decidere di continuare a premere 'hit' per          
  ogni carta aggiuntiva che vuole giocare, tenendo a mente che appena il punteggio supera il valore 21 il         
  turno sarà perso. Una volta giocate le proprie carte l'utente preme il tasto 'stand' che passerà il turno      
  al computer il quale a sua volta giocherà le carte. Al termine del turno verrà mostrato il punteggio.           
  Per effettuare una nuova partita l'utente deve premere il tasto 'deal'.                                                 
