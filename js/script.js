//variable to select all the cells of the game
var cells = document.getElementsByClassName('cell');
//put x or o class
var x = "x";
var o = "oO";
//to store the clicked cells by the user
var clicked = [];
//to store the cells marked by the computer
var machineClick = [];
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
//counter of cells
var counter = 0;
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
                options[i].splice(options[i].indexOf(options[i][j]), 1, letter);
                //console.log("iguales " + options[i][j] + " - " + options[i]);
            }
        }
    }
    win(letter);
}

//the machine decides where to put the mark
function chooseCell() {
  //if the center or the corner are free put the mark there
  if (options[0].indexOf("c5") >= 0) {
      picked = "c5";
  } else if (options[0].indexOf("c3") >= 0) {
      picked = "c3";
  } else if (options[0].indexOf("c1") >= 0) {
      picked = "c1";
  }
  else{
    orderOptions();
  }
}
//order the options to compare if there is more than one mark in each option to put the machine mark there
function orderOptions(){
  console.log("orderOptions()");
  for(var i= 1; i< options.length; i++){
    //order the options
    options[i].forEach(function(){
      options[i].sort();
      console.log(options[i]);
    });
    for(var j= options[i].length; j>1; j--){
      //if we have two of the same letter, put the mark there
      if(options[i][j]==options[i][j-1]){
        console.log(options[i][j]);
         return picked = options[i][j-2];
      }else {
        console.log("else");
      }
    }
  }
  //console.log(options);
}

function playMachine() {
  //choose where to put the mark according to some logic given by the function
    chooseCell();
    cellMachine = document.getElementById(picked);
    //classMachine = cellMachine.className;
    cellMachine.classList.add(o);
    for (var i = 0; i < options.length; i++) {
        //goes two levels deep
        for (var j = 0; j < options[i].length; j++) {
            //if the clicked cell coincides with one of the options replace that option with the letter
            if (picked === options[i][j]) {
                options[i].splice(options[i].indexOf(options[i][j]), 1, o);
                return "done";
            }
        }
    }

}



//check if we have 3 x or 3 o
function win(letter) {
    //count how many letters we have
    for (var i = 1; i < options.length; i++) {
        counter = 0;
        for (var j = 0; j < options[i].length; j++) {
            if (letter === options[i][j]) {
                counter++;
            }
        }
        //if we have 3 letters, player has won
        if (counter === 3) {
            alert("You have win!");
        } else {
            playMachine();
            return "done in win";
        }
    }
}

//function to reload the page
function resetBoard() {
    window.location.reload();
}
reset.addEventListener("click", resetBoard);


};
