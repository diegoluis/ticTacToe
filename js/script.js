//variable to select all the cells of the game
var cells = document.getElementsByClassName('cell');
//put x or o class
var x = "x";
var o = "oO";
//to store the cell to mark by the machine
var cellMachine;
//temp to store the id of the cell
var picked;
//all the options that make a 3 in line
var options = [
    ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"],
    ["c1", "c2", "c3"],
    ["c4", "c5", "c6"],
    ["c7", "c8", "c9"],
    ["c1", "c4", "c7"],
    ["c2", "c5", "c8"],
    ["c3", "c6", "c9"],
    ["c1", "c5", "c9"],
    ["c3", "c5", "c7"]
];
//reload button
var reset = document.getElementById("reset");
var targetId;
var targetClass;


//function to add listeners to the cells to fire the functions
window.onload = function() {
    //add click event to all the cells
    for (var i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", function(e) {
            //store the id of the clicked cell
            targetId = e.target.id;
            //the class of the clicked element
            targetClass = e.srcElement.className;
            //find if there is a class x or o to see if the cell is marked
            if (targetClass.includes("x", -1) || targetClass.includes("oO", -1)) {
                alert("Invalid move!");
            } else {
                //draw the symbol on the board
                this.classList.add(x);
                //call the function to test if there is a win
                threeInLine(x);
            }
        });
    }


function threeInLine(letter) {
    //traverse the array of options
    //goes one level deep
    for (var i = 0; i < options.length; i++) {
        //goes two levels deep
        for (var j = 0; j < options[i].length; j++) {
            //if the clicked cell coincides with one of the options replace that option with the letter
            if (targetId === options[i][j]) {
              //replace the cell with the letter
                options[i].splice(options[i].indexOf(options[i][j]), 1, letter);
                //console.log("iguales " + options[i][j] + " - " + options[i]);
            }
        }
    }
    playMachine();
}

//the machine decides where to put the mark
function chooseCell() {
    //if already there is an O there it means is not the first move
    if (options[0].includes("oO")) {
        orderOptions();
    } else {
        //only choose one of those options if is the first move
        //if the center or the corner are free put the mark there
        //else choose one of the corners
        if (options[0].indexOf("c5") >= 0) {
            picked = "c5";
            changeCells(o);
        } else if (options[0].indexOf("c3") >= 0) {
            picked = "c3";
            changeCells(o);
        } else if (options[0].indexOf("c1") >= 0) {
            picked = "c1";
            changeCells(o);
        } else if (options[0].indexOf("c7") >= 0) {
            picked = "c7";
            changeCells(o);
        } else if (options[0].indexOf("c9") >= 0) {
            picked = "c9";
            changeCells(o);
        }
    }
}
//order the options to compare if there is more than one mark in each option to put the machine mark there
function orderOptions(){
  for(var i= 1; i< options.length; i++){
    //order the options
    options[i].forEach(function(){
      //sort each of the array of the options
      options[i].sort();
    });
    for(var j= options[i].length; j>1; j--){
      //if we have two of the same letter, put the mark there
      //falta una opción que marque en caso de que solo haya una letra escogida
      if(options[i][j]===options[i][j-1]){
        picked = options[i][j-2];
        //if the machine picks an already marked cell choose other
        if(picked ==="x" || picked ==="oO"){
          //order the array of all the cells
          options[0].sort();
          //pick the first one
          picked = options[0][0];
          if(picked ==="x" || picked ==="oO"){
            win();
            alert("The game has finished, nobody win");
            return resetBoard();
          }
          return picked;
        }
         return picked;
      }else if(options[i][j-1].charAt(0)==="c" && options[i][j-2].charAt(0)==="c"){
        //if (myArray[1].charAt(0) !== 'M') { /* do something */ }
        picked = options[i][j-2];
        console.log("empieza por C");
      }
    }
  }
}

function playMachine() {
  //choose where to put the mark according to some logic given by the function
    chooseCell();
    cellMachine = document.getElementById(picked);
    cellMachine.classList.add(o);
    changeCells(o);
    win();
}

//we need to create a function that replaces all the c cells with x or O in the options
function changeCells(letter){
  cellMachine = document.getElementById(picked);
  cellMachine.classList.add(o);
  for (var i = 0; i < options.length; i++) {
      //goes two levels deep
      for (var j = 0; j < options[i].length; j++) {
          //if the clicked cell coincides with one of the options replace that option with the letter
          if (picked === options[i][j]) {
              options[i].splice(options[i].indexOf(options[i][j]), 1, letter);
         }
      }
  }
}
/*
-tiene un bug, cuando x empieza en casilla intermedia o no responde según donde ponga la siguiente x
- cuando se marca la ultima casilla maquina saca error, solucionarlo
- cuando x gana en la ultima casilla mostrar que ha ganado

*/

//check if we have 3 x or 3 o
function win() {
  for(var i = 1; i<options.length; i++){
    //if the three letters are the same, you have win
    if (options[i][2] === options[i][1] && options[i][1] === options[i][0]) {
      if(options[i][0] === x){
        finalAlert(x);
      }else if(options[i][0] === o){
        finalAlert(o);
      }
    }

  }

}

//function to show winner or equality
function finalAlert(letter){
  alert("You have win " + letter);
  return resetBoard();
}

//function to reload the page
function resetBoard() {
    window.location.reload();
}
reset.addEventListener("click", resetBoard);


};
