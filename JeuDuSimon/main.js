
// on selectionne les element du HTML et on  les met dans des 
// variable javascript
const button = document.querySelector('.dashboard button'); // on recupere l'element HTML button  ->  <button>Commencer</button>
const red =  document.querySelector('.red'); // on recupere l'element div .red .block 
const yellow =  document.querySelector('.yellow');  
const green =  document.querySelector('.green');
const blue =  document.querySelector('.blue');
const startButton = document.querySelector('.dashboard button');
const scoreSpan = document.querySelector('.dashboard p span');
const timing = 500;
// chaque tour, le jeu ajoutera une couleur dans ce teableau que le joueur devra reproduire à chaque tour
let TableauGenererParLeJeu = [];
//varible qui va contenir la couleur generer ce tour ci par le jeu
let couleurAuHasard;
// Tableau qui regroupe les reponses du joueurs et qui sera comparé au TableauGenererParLeJeu
let SerieDeReponseDuJoueur = [];
// varible qui definiera le score
let score = 0;
//variable que l'on va utiliser pour des comparaison de tableau
let index = 0;
scoreSpan.innerText = !score ? '0' : score; // on injecte 0 en tring dans le span qui est dans l'HTML pour avoir un score dynamique qui va changer


// Fonction qui donne le tour a l'ordinateur    
function tourDuPC(){
    // on empeche le joueur de cliqué sur les block en enlevant les ecouteur d'evenement
    removeEventListenerSurCouleur();
    // on creer un tableau avec des valeur dans lesquel une valeur aléatoire sera definie pour chaque tour de jeu
    let colors = ['blue','red','yellow','green'];
    // on stock le nombre aleatoire renvoyé par Math.random (entre 0 et 3) dans cette variable
    let NombreAuHasard = Math.floor(Math.random() * (colors.length - 0) + 0);
    // on definie la couleur choisie grace a l'index recuperer juste au dessus avec NombreAuHasard
    couleurAuHasard = colors[NombreAuHasard];
    //On ajoute cette couleur dans le TableauGenererParLeJeu
    TableauGenererParLeJeu.push(couleurAuHasard);
    // on creer une variable i pour la comparaison de tableau;
    let i = 0;
    // on creer un code qui se repetera toute les 700ms et qui s'arretera que si i >= TableauGenererParLeJeu
    // elle permet de parcourir le tableau element par element et de faire clignoter les couleurs contenue dans le tableau
    // pour cela, toute les 700 ms on ajoute 1 à i ( ligne 72 )
    let intervalID = setInterval(()=>{
        // ici on regarde si on regarde si on a parcourue tout le tableau TableauGenererParLeJeu
        // si i est superieur ou egal a TableauGenererParLeJeu, cela voudrais dire qu'on cherche quelque chose qui n'existe pas
        if(i < TableauGenererParLeJeu.length){
            // ensuite on regarde quel est l'element que l'on a dans le tableau
            // s'il est rouge :
            if(TableauGenererParLeJeu[i] === 'red'){
                //on ajoute la classe active a la div : div .block .red et celui ci augmente sa luminosité
                red.classList.add('active');
                // pour le reteindre, on lance un chrono avec la variable timing qui ets definie plus au (ligne 11) qui est de 500 ms
                // donc la classe active sera retirer 500 ms apres avoir été mise.
                // et donc la couleur sera plus brillante pendant 500 ms
                setTimeout(() => {
                    red.classList.remove('active');
                }, timing);
            }else if(TableauGenererParLeJeu[i] === 'blue'){
                blue.classList.add('active');
                setTimeout(() => {
                    blue.classList.remove('active');
                }, timing);
            }else if(TableauGenererParLeJeu[i] === 'yellow'){
                yellow.classList.add('active');
                setTimeout(() => {
                    yellow.classList.remove('active');
                }, timing);
            }else if(TableauGenererParLeJeu[i] === 'green'){
                green.classList.add('active');
                setTimeout(() => {
                    green.classList.remove('active');
                }, timing);
            }
            // on augmente i a chaque tour, car sinon i sera toujours = à 0 et il nous montrera la même couleur en boucle infinie.
            // or nous souhaitons parcourir le tableau, donc à chaque element qui a été parcourie, on passe au suivant.
            i++
        }else{
            // la fonction setInterval (ligne 42) est inifinie, elle ne s'arretera jamais, sauf si on recupere la cled id qu'elle nous retourne
            // et que on fait appelle a clearInterval() en y mettant la clé recuperer dans la variable intervalID ligne 42
            clearInterval(intervalID);
            // on remet i à 0 pour le prochain tour, car si nous somme dans le else, c'est que l'on a parcourue le tableau et que c'est le tour du joueur
            // on prepare quand même le tour suivant
            i=0;
            // on donne le tour du joueur
            tourDuJoueur();
        }
    },700);
}

// Fonction explicite ...
function tourDuJoueur(){
    // nous avions retirer les ecouteur d'evenements  lorsque l'ordinateur jouait, maintenant que c'est le tour du joueur, on lui remet les ecouteurs d'evenement
    AjoutEvenementSurLesCouleur();
    // on vide le tableau SerieDeReponseDuJoueur car a chaque tour, il doit commencer la serie de 0 ( il doit recliquer sur chaque couleur depuis le debut à chaque tour);
    SerieDeReponseDuJoueur = [];
    // on remet l'ibdex à 0, index est utilisé dans la fonction juste au dessus pour comparer les elements du tableau du pc et celui du joueur si les serie sont bonne
    // on le remet a 0 car à chaque tour, on recommence la comparaison du debut car nous pouvons nous tromper à chaque tour même sur les premieres couleurs.
    index = 0;
}

// fonction qui sera appelé à chaque clic, il nous permetra de verifier si la couleur cliqué est la bonne
function verifie(){
    //on verifie si index est = a la longueur du tableau -1 pour ne pas avoir à comparer des valeurs qui n'existent pas et donc qui renverons une erreurs
    // si on atteint la longueur du tableau, on verifie si la derniere couleur est la bonne et on redonne le tour au pc en incrementant le score
    if(index == TableauGenererParLeJeu.length - 1){
        // si les deux valeurs ( couleur choisie par le pc et le joueur) ne sont pas egal, on rentre dans le if
        if(TableauGenererParLeJeu[index] != SerieDeReponseDuJoueur[index]){
            // elle nous montre un popus qui nous annonce la defaite
            alert('Vous avez perdue');
            // on appelle la fonction resetScore qui remet le score a 0 et vide le tableau du PC pour pouvoir recommencer le jeu.
            resetScore();
            // a chaque modification de score, on doit l'envoyer au span dans l'HTML et lui injecter la valeur score
            startButton.innerText='Commencer'
        }else{
            // si les deux valeurs ( valeurdupc et du joueur) sont les même on incremente le score
            score++;
            // eto n l'injecte dans l'html pour qu'elle soit visible
            scoreSpan.innerText = score;
            // puis on redonne la main au pc pour qu'elle fasse une nouvelle serie
            tourDuPC();
        }
        
        
    }else{ // on compare a chaque clique si la couleur choisie est la bonne 
        if(TableauGenererParLeJeu[index] != SerieDeReponseDuJoueur[index]){
            alert('Vous avez perdue');
            resetScore();
            startButton.innerText='Commencer'
        }
        
    } 
}
// permet d'ajouter levenement du clique sur les div de l'html que l'on a stocké dans red, blue, green, yellow tout en haut
function AjoutEvenementSurLesCouleur(){
    //chaque block apelle une fonction differente qui permet a chaque couleur respective d'avoir la classe active pendant 100ms
    red.addEventListener('click',pushRed)
    blue.addEventListener('click',pushBlue)
    green.addEventListener('click',pushGreen)
    yellow.addEventListener('click',pushYellow);
}
// permet de retirer les ecouteur de click pour pas que le joueurs puisse jouer pendant que le pc joue
function removeEventListenerSurCouleur(){
    // removeEventListener ne fonctionne que si la function a un nom, elle ne fonctionne pas sur des functions anonymes
    red.removeEventListener('click',pushRed)
    blue.removeEventListener('click',pushBlue)
    green.removeEventListener('click',pushGreen)
    yellow.removeEventListener('click',pushYellow);
}
// fonction que l'on apelle lors du clic sur le boutton commencer ou arreter
function StartStopGame(){
    // si le bouton contient le texte 'Commencer' on rentre dans le if 
    if(startButton.innerText === 'Commencer'){
        // lorsque l'on clique sur commencer, le text du boutton change et prend la valeur 'Stop' 
        startButton.innerText = 'Stop';
        tourDuPC();
    }else{ // si le texte dans le button est 'Stop' on reset le score à 0 et on change le texte dans le boutton par 'Commencer'
        resetScore();
        startButton.innerText = 'Commencer';
        removeEventListenerSurCouleur();
    }
}
// elle permet de remetre el score a 0 et de vider le tableau du pc pour recommencer le jeu si l'on reclique sur commencer
function resetScore(){
    score = 0;
    TableauGenererParLeJeu = [];
    scoreSpan.innerText = '0';
}

// a chaque click, l'une de ces fonction est appelé, cela depend de la couleur sur lequel on a cliqué
function pushRed(){
    //si l'on clique sur le rouge, on ajoute rouge dans la teableau du joueur ( qui sera comparer avec la fonction verifie juste en dessous)
    SerieDeReponseDuJoueur.push('red');
    // on ajoute la classe active sur la couleur ( ca le rend plus brillant) et l'enleve avec le settimeout en 100ms
    red.classList.add('active')
    setTimeout(()=>{
        red.classList.remove('active')
    },100)
    // on verifie avec la fonction deja expliqué plus haut
    verifie();
    // et on incremente l'index car c'est celui si qui permet de dire qu'elle valeur de chaque tableau ( pc et joueur ) doit être comparé
    index++
}
function pushBlue(){
    SerieDeReponseDuJoueur.push('blue');
    blue.classList.add('active')
    setTimeout(()=>{
        blue.classList.remove('active')
    },100)
    verifie();
    index++
}
function pushGreen(){
    SerieDeReponseDuJoueur.push('green');
    green.classList.add('active')
    setTimeout(()=>{
        green.classList.remove('active')
    },100)
    verifie();
    index++
}
function pushYellow(){
    SerieDeReponseDuJoueur.push('yellow');
    yellow.classList.add('active')
    setTimeout(()=>{
        yellow.classList.remove('active')
    },100)
    verifie(); 
    index++
}
// pour commencer le jeu, on ajoute l'ecouteur d'evenement sur le bouton ('Commencer') qui lance la fonction StartStopGame quand on clique dessus.
button.addEventListener('click' , StartStopGame );










// sound :
// function play() {
//     var audio = new Audio(
// 'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');
//     audio.play();
// }