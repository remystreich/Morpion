let activePlayer = 1;
let tab = [
    [],
    [],
    [],
    [],
    [],
    []
];
let gameOver = false;
let nmbrPlayer = 0;
let turn = 0;

//////////////////random
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//////////////fonction nombre de joueurs
function howMuch(elem){
    if(nmbrPlayer == 0){
    nmbrPlayer = elem.innerHTML;
    gameOver = true;
    if (nmbrPlayer == "1 Joueur"){
       elem.style.borderBottom = "solid 6px"; //souligner le bouton sélectionné
       elem.style.borderRight = "solid 6px"; //souligner le bouton sélectionné 
       gameOver = false;
       againstCpu()
    }else if (nmbrPlayer == "2 Joueurs"){
        elem.style.borderBottom = "solid 6px"; //souligner le bouton sélectionné
        elem.style.borderRight = "solid 6px"; //souligner le bouton sélectionné
        gameOver = false;
    }
    }
}
//////////////fonction recommencer
function replay() {
    turn = 0;   // réinitialiser les tour 
    document.querySelector("#result").innerHTML = ""; // réinistialiser la ligne de fin de partie
    activePlayer = random(1,2); 
    altern(); //souligner le joueur actif
    document.querySelectorAll(".case").forEach(element => { //vider les cases
    element.innerHTML = ""
    element.style.backgroundColor = "gray";
       });
    if (nmbrPlayer == "1 Joueur" && activePlayer == 2 ){ //si le cpu commence 
        gameOver = true; //empecher de jouer
        againstCpu();
    }else{
        gameOver = false;
    }
    
}
///////////////fonction jouer sur case
function play(elem) {
    if (elem.innerHTML == "" && gameOver == false) {  //si case vide on peut jouer dessus
        if (activePlayer == 1){                       //2 joueurs 
            elem.innerHTML = "X";
            elem.style.backgroundColor = "red";
            arrayPush()
        }else if(activePlayer == 2 && nmbrPlayer == "2 Joueurs"){
            elem.style.backgroundColor = "yellow";
            elem.innerHTML = "O"                     //2 joueurs définition du signe qui sera posé, puis appel de la fonctoin arrayPush pour convertir en tableau
            arrayPush()                              // ensuite on alterne de joueur et vérification des conditions de victoire
        }
        altern();
        checkWin(tab)
        if(nmbrPlayer== "1 Joueur" && activePlayer == 2 && !gameOver){  //1joueur
            againstCpu()
        }
    }
}
///////////fonction remplissage tableau
function arrayPush(){
    let index = 0
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            tab[i][j] = document.querySelectorAll(".case")[index].innerHTML; //parcourir les 2 niveaux de tableaux et les case .case pour récupérer leurs valeurs et les stocker dedans dans l'ordre
            index++;  
        }
    }
    console.log(tab);
    turn++;  //plus un tour pour la condition d'égalité
}
/////////////////////////alternance joueurs
function altern(){
    if (activePlayer == 1){
        activePlayer = 2
        document.querySelector("#gamerTwo").style.borderBottom = "solid rgb(0, 221, 255)"; //couleur du soulignage
        document.querySelector("#gamerOne").style.borderBottom = "none"; //couleur du soulignage
    } else{
        activePlayer = 1;
        document.querySelector("#gamerOne").style.borderBottom = "solid rgb(0, 221, 255)"; //couleur du soulignage
        document.querySelector("#gamerTwo").style.borderBottom = "none" //couleur du soulignage
        }
}
//////////////fonction conditions de victoire
function checkWin(morpion) {
    let result ="";  //stocke la valeur du signe gagnant
    let scoreOne= 0;  // stocke les score à afficher
    let scoreTwo = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (morpion[i][j] == morpion[i][j+1]  && (morpion[i][j+1] == morpion[i][j+2]) && morpion[i][j+2] == morpion[i][j+3]  && morpion[i][j] != "") {
                result = morpion[i][j];
                gameOver = true;
            }
            if (i<=2 && morpion[i][j] == morpion[i+1][j]  && (morpion[i+1][j] == morpion[i+2][j]) && morpion[i+2][j] == morpion[i+3][j] && morpion[i][j] != "") {
                result = morpion[i][j];
                gameOver = true;
            }
            if (i<=2 && morpion[i][j] == morpion[i+1][j+1] && morpion[i+1][j+1] == morpion[i+2][j+2] && morpion[i+2][j+2] == morpion[i+3][j+3] && morpion[i][j] !=""){
                result = morpion[i][j];
                gameOver = true;
             }
             if (i<=2 && morpion[i][j] == morpion[i+1][j-1] && morpion[i+1][j-1] == morpion[i+2][j-2] && morpion[i+2][j-2] == morpion[i+3][j-3] && morpion[i][j] !=""){
                result = morpion[i][j];
                gameOver = true;
             } 
             
        }
        if (turn == 42){
            document.querySelector("#result").innerHTML = "Egalité";
            gameOver = true
         }
    }
    if(result == "X"){
        scoreOne++;
        document.querySelector("#scoreOne").innerHTML = scoreOne;
        document.querySelector("#result").innerHTML = "Le Joueur 1 gagne!";

    }else if (result == "O"){
        scoreTwo++;
        document.querySelector("#scoreTwo").innerHTML = scoreTwo;
        document.querySelector("#result").innerHTML = "Le Joueur 2 gagne!";
    }
}
////////////////////// fonction pour jouer à un joueur
function againstCpu() {
    let indexCpu = random(0,41); //sert à parcourir les 9 cases
    gameOver = true; //empeche le joueur de jouer en meme temps
    let tabhtlm = document.querySelectorAll('.case'); //définir la classe que l'on va parcourir
    while (tabhtlm[indexCpu].innerHTML != "" ){ //tant que la case parcourue n'est pas vide tire une autre case aléatoire
        indexCpu =random(0,41);
    }
    setTimeout(()=>{                       //délai d'action du cpu
        tabhtlm[indexCpu].innerHTML = "O";
        tabhtlm[indexCpu].style.backgroundColor = "yellow"; 
        arrayPush();
        gameOver =false;    //redonne la main au joueur
        checkWin(tab);
        altern();
    },500)
}
//////////// initialisation du jeu
replay()
if (nmbrPlayer == "" ) {
    gameOver =true;
}