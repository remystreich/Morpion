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
function howMuch(elem) {
    if (nmbrPlayer == 0) {
        nmbrPlayer = elem.innerHTML;
        gameOver = true;
        if (nmbrPlayer == "1 Joueur") {
            elem.style.borderBottom = "solid 6px"; //souligner le bouton sélectionné
            elem.style.borderRight = "solid 6px"; //souligner le bouton sélectionné 
            gameOver = false;
            againstCpu()
        } else if (nmbrPlayer == "2 Joueurs") {
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
    activePlayer = random(1, 2);
    altern(); //souligner le joueur actif
    document.querySelectorAll(".case").forEach(element => { //vider les cases
        element.innerHTML = ""
        element.style.backgroundColor = "gray";
    });
    if (nmbrPlayer == "1 Joueur" && activePlayer == 2) { //si le cpu commence 
        gameOver = true; //empecher de jouer
        againstCpu();
    } else {
        gameOver = false;
    }
}
///////////////fonction jouer sur case
function play(elem) {
    let col = elem.querySelectorAll('*');
    index = 5;
    console.log(col);
    if (col[0].innerHTML == "" && gameOver == false) {
        if (activePlayer == 1) {
            while (index > 0 && col[index].innerHTML != "") {
                index--;
            }
            col[index].style.backgroundColor = "red";
            col[index].innerHTML = "X";
        } else if (activePlayer == 2 && nmbrPlayer == "2 Joueurs") {
            while (index > 0 && col[index].innerHTML != "") {
                index--;
            }
            col[index].style.backgroundColor = "yellow";
            col[index].innerHTML = "O";
        }
        arrayPush()
        altern();
        checkWin(tab)
        console.log(tab);
        if (nmbrPlayer == "1 Joueur" && activePlayer == 2 && !gameOver) {  //1joueur
            againstCpu()
        }
    }
}
///////////fonction remplissage tableau
function arrayPush() {
    let index = 0
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 6; j++) {
            tab[j][i] = document.querySelectorAll(".case")[index].innerHTML; //parcourir les 2 niveaux de tableaux et les case .case pour récupérer leurs valeurs et les stocker dedans dans l'ordre
            index++;
        }
    }
    turn++;  //plus un tour pour la condition d'égalité


}
/////////////////////////alternance joueurs
function altern() {
    if (activePlayer == 1) {
        activePlayer = 2
        document.querySelector("#gamerTwo").style.borderBottom = "solid rgb(0, 221, 255)"; //couleur du soulignage
        document.querySelector("#gamerOne").style.borderBottom = "none"; //couleur du soulignage
    } else {
        activePlayer = 1;
        document.querySelector("#gamerOne").style.borderBottom = "solid rgb(0, 221, 255)"; //couleur du soulignage
        document.querySelector("#gamerTwo").style.borderBottom = "none" //couleur du soulignage
    }
}
//////////////fonction conditions de victoire
function checkWin(morpion) {
    let result = "";  //stocke la valeur du signe gagnant
    let scoreOne = 0;  // stocke les score à afficher
    let scoreTwo = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (morpion[i][j] == morpion[i][j + 1] && (morpion[i][j + 1] == morpion[i][j + 2]) && morpion[i][j + 2] == morpion[i][j + 3] && morpion[i][j] != "") {
                result = morpion[i][j];
                gameOver = true;
            }
            if (i <= 2 && morpion[i][j] == morpion[i + 1][j] && (morpion[i + 1][j] == morpion[i + 2][j]) && morpion[i + 2][j] == morpion[i + 3][j] && morpion[i][j] != "") {
                result = morpion[i][j];
                gameOver = true;
            }
            if (i <= 2 && morpion[i][j] == morpion[i + 1][j + 1] && morpion[i + 1][j + 1] == morpion[i + 2][j + 2] && morpion[i + 2][j + 2] == morpion[i + 3][j + 3] && morpion[i][j] != "") {
                result = morpion[i][j];
                gameOver = true;
            }
            if (i <= 2 && morpion[i][j] == morpion[i + 1][j - 1] && morpion[i + 1][j - 1] == morpion[i + 2][j - 2] && morpion[i + 2][j - 2] == morpion[i + 3][j - 3] && morpion[i][j] != "") {
                result = morpion[i][j];
                gameOver = true;
            }
        }
        if (turn == document.querySelectorAll(".case").length-1) {
            document.querySelector("#result").innerHTML = "Egalité";
            gameOver = true
        }
    }
    if (result == "X") {
        scoreOne++;
        document.querySelector("#scoreOne").innerHTML = scoreOne;
        document.querySelector("#result").innerHTML = "Le Joueur 1 gagne!";

    } else if (result == "O") {
        scoreTwo++;
        document.querySelector("#scoreTwo").innerHTML = scoreTwo;
        document.querySelector("#result").innerHTML = "Le Joueur 2 gagne!";
    }
}
///////////////fonction 1 joueur
function againstCpu() {
    let indexCpu = random(0, 6); //sert à parcourir les 6 colonnes
    gameOver = true; //empeche le joueur de jouer en meme temps
    let tabhtlm = document.querySelectorAll('.col'); //définir la classe que l'on va parcourir
    let col = tabhtlm[indexCpu].querySelectorAll("*")
    while (col[0].innerHTML != "") { //tant que la 1ere case de la colonne parcourue n'est pas vide tire une autre col aléatoire
        indexCpu = random(0, 6);
        tabhtlm = document.querySelectorAll('.col');
        col = tabhtlm[indexCpu].querySelectorAll("*")
    }
    setTimeout(() => {
        let index = 5                     //délai d'action du cpu
        while (index > 0 && col[index].innerHTML != "") { //tant que une case en dessous est libre descend la piece
            index--;
        }
        col[index].style.backgroundColor = "yellow";
        col[index].innerHTML = "O";
        arrayPush();
        gameOver = false;    //redonne la main au joueur
        checkWin(tab);
        altern();
    }, 500)
}
//////////// initialisation du jeu
replay()
if (nmbrPlayer == "") {
    gameOver = true;
}












