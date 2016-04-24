//variable to select all the cells of the game
var cells = document.getElementsByClassName('cell');
//put x or o class
var x = "x";
var o = "o";
//to store the clicked cells by the user
var clicked = [];
//to store the cells marked by the computer
var machineClick = [];
//to store the cell to mark by the machine
var cellMachine;
//temp to store the id of the cell
var picked = "c1";
//all the options that make a 3 in line
var options = [["c1", "c2", "c3"],["c4","c5","c6"],["c7","c8","c9"],
["c1","c4","c7"],["c2","c5","c8"],["c3","c6","c9"],["c1","c5","c9"],["c3","c5","c7"]];
//counter of cells
var counter = 0;
//reload button
var reset = document.getElementById("reset");
var targetId;


//function to add listeners to the cells to fire the functions
window.onload = function(){
  //add click event to all the cells
  for(var i = 0; i< cells.length; i++){
    cells[i].addEventListener("click", function(e){
      //store the id of the clicked cell
      targetId = e.target.id;
      //add the id to an array
      //clicked.push(targetId);
      console.log(targetId);
      //draw the symbol on the board
      this.classList.add(x);
      //call the function to test if there is a win
      threeInLine(x);
    });
  }
};
function threeInLine(letter){
  for(var i= 0; i<options.length; i++){
    for(var j= 0; j<options[i].length; j++){
      if(targetId === options[i][j]){
        options[i].splice(options[i].indexOf(options[i][j]),1,letter);
        console.log("iguales " + options[i][j] +" - " +options[i]);
      }

    }
  }

}
function playMachine(){
  cellMachine = document.getElementById(picked);
  cellMachine.classList.add(o);
}

function win(){
  alert("You have win!");
}
//function to reload the page
function resetBoard(){
  window.location.reload();
}
reset.addEventListener("click", resetBoard);

//create the logic to mark the cells
