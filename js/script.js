//variable to select all the cells of the game
var cells = document.getElementsByClassName('cell');
var x = "x";
var o = "o";
var clicked = [];
var machineClick = [];
var options = [["c1", "c2", "c3"],["c4","c5","c6"],["c7","c8","c9"],
["c1","c4","c7"],["c2","c5","c8"],["c3","c6","c9"],["c1","c5","c9"],["c3","c5","c7"]];
var counter = 0;
window.onload = function(){
  //add click event to all the cells
  for(var i = 0; i< cells.length; i++){
    cells[i].addEventListener("click", function(e){
      //store the id of the clicked cell
      var targetId = e.target.id;
      //add the id to an array
      clicked.push(targetId);
      //console.log(clicked);
      //draw the symbol on the board
      this.classList.add(x);
      //return clicked;
      threeInLine();
    });
  }
};
// leer si hay 3 en raya
// si hay 3 en raya sacar una alerta
//si no, no pasa nada
function threeInLine(){
  //sort the array to compare with the options
  clicked.sort();
  console.log(clicked);
    if(clicked.length>=3){
      options.forEach(function(element1){
        counter = 0;
      element1.forEach(function(e){
        clicked.forEach(function(c){
          if(e === c){
            counter++;
            console.log(counter + " win " + e);
          }
        });
        console.log(e);
      });
    });
  }


}
/*
var isSame = clicked.length == option1.length && clicked.every(function(element, index) {
    return element === option1[index];
});

console.log(isSame);
*/
