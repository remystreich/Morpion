let activePlayer = 1;
let tab = [
    [],
    [],
    []
]
let gameOver = false;
let nmbrPlayer = 0;
let turn = 0

//////////////fonction nombre de joueurs
function howMuch(elem){
    if(nmbrPlayer == 0){
    nmbrPlayer = elem.innerHTML;
    gameOver = true
    if (nmbrPlayer == "1 Joueur"){
       elem.style.borderBottom = "solid 6px";
       elem.style.borderRight = "solid 6px"
       gameOver = false;
       
        againstCpu()
    
    }else if (nmbrPlayer == "2 Joueurs"){
        elem.style.borderBottom = "solid 6px";
        elem.style.borderRight = "solid 6px"
        gameOver = false
    }
}
}
//////////////////random
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
///////////////fonction jouer sur case
function play(elem) {
    if (elem.innerHTML == "" && gameOver == false) {
        if (activePlayer == 1){
            elem.innerHTML = "X";
            arrayPush()
        }else{
            elem.innerHTML = "O"
            arrayPush()
            console.log(tab);
        }
       
        altern();
        checkWin(tab)
        if(nmbrPlayer== "1 Joueur" && activePlayer == 2 && !gameOver){
            againstCpu()
        }
    }
}
//////////////fonction recommencer
function replay() {
    turn = 0
    document.querySelector("#result").innerHTML = "";
    activePlayer = random(1,2);
    altern();
    document.querySelectorAll(".case").forEach(element => {
        element.innerHTML = ""
       });
    if (nmbrPlayer == "1 Joueur" && activePlayer == 2 ){
        againstCpu();
    }
    gameOver = false;
}
/////////////////////////alternance joueurs
function altern(){
    if (activePlayer == 1){
        activePlayer = 2
        document.querySelector("#gamerTwo").style.borderBottom = "solid rgb(0, 221, 255)";
        document.querySelector("#gamerOne").style.borderBottom = "none";
    }else {
        if (nmbrPlayer == "1 Joueur" && gameOver == false){
            againstCpu()
            document.querySelector("#gamerOne").style.borderBottom = "solid rgb(0, 221, 255)";
            document.querySelector("#gamerTwo").style.borderBottom = "none";
        }
        else{
            activePlayer = 1;
        document.querySelector("#gamerOne").style.borderBottom = "solid rgb(0, 221, 255)";
        document.querySelector("#gamerTwo").style.borderBottom = "none";

        }
        
    }
}
///////////fonction remplissage tableau
function arrayPush(){
    let index = 0
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            tab[j][i] = document.querySelectorAll(".case")[index].innerHTML
            index++
            
        }
    }
    turn++
}
//////////////fonction condistions de victoire
function checkWin(morpion) {
    let result ="";
    let scoreOne= 0;
    let scoreTwo = 0;
    for (let i = 0; i < morpion.length; i++) {
        if (morpion[i][0] == morpion[i][1]  && (morpion[i][1] == morpion[i][2]) && morpion[i][0] != "") {
            result = morpion[i][0];
            gameOver = true;
        }
         if (morpion[0][i] == morpion[1][i]  && (morpion[1][i] == morpion[2][i]) && morpion[0][i] !=""){
            result = morpion[0][i];
            gameOver = true;
         }
         if (morpion[0][0] == morpion[1][1] && morpion[1][1] == morpion[2][2] && morpion[0][0] !=""){
            result = morpion[0][0];
            gameOver = true;
         }
         if (morpion[0][2] == morpion[1][1] && morpion[1][1] == morpion[2][0] && morpion[0][2] != ""){
            result = morpion[0][2];
            gameOver = true;
         }
         if (turn == 9){
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

function againstCpu() {
    let indexCpu = random(0,8)
    gameOver = true;
    let tabhtlm = document.querySelectorAll('.case')

    while (tabhtlm[indexCpu].innerHTML != "" ){
        indexCpu =random(0,8)
    }
    tabhtlm[indexCpu].innerHTML = "O"
    arrayPush()
    gameOver =false;
    checkWin(tab)
    activePlayer = 1
    
}
    



////////////
replay()
if (nmbrPlayer == "" ) {
    gameOver =true
}



