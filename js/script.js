//default board
const easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
  ];
  const intermediate = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
  ];
  const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
  ];

var timer;
var timeRemaining;
var selectedNum;
var selectedTile;
var disableSelect;

window.onload = function(){
    //start after clicking the button
    id("start-btn").addEventListener("click", startGame);
    //event listener for numbers
    for (let i = 0; i<id("number-container").children.length;i++){
        id("number-container").children[i].addEventListener("click", function(){
            //if selecting is not disabled
            if(!disableSelect){
                if (this.classList.contains("selected")){
                    this.classList.remove("selected");
                    selectedNum = null;

                }
                else 
                    for(let i = 0; i<9; i++){
                        id("number-container").children[i].classList.remove("selected");

                    }
                    this.classList.add("selected");
                    selectedNum= this;
                    updateMove();

            }
        });
    }
}
function id(id){
    return document.getElementById(id);
}


function startGame(){
    //Difficulty
    let board;
    if (id("diff-1").checked) board = easy[0];
    else if (id("diff-2").checked) board = intermediate[0];
    else  board = hard[0];
    //numbers and tiles
    disableSelect = false;
    //board
    generateBoard(board);
    //timer
    startTimer();
    //theme
    if (id("theme-1").checked){
        qs("body").classList.remove("dark");
    
    }
    else 
        {qs("body").classList.add("dark");}

    id("number-container").classList.remove("hidden");
}

function startTimer(){
    //input
    if (id("time-1").checked) timeRemaining = 180;
    else if (id("time-2").checked) timeRemaining = 300;
    else timeRemaining = 600;
    
    //set timer
    id("timer").textContent = timeConversion(timeRemaining);
    
    timer = setInterval(function(){
        timeRemaining--;

        if (timeRemaining ===0) endGame();
        id("timer").textContent= timeConversion(timeRemaining);
    },1000)
}

function timeConversion(time){
    let minutes = Math.floor(time/60);
    if (minutes<10) minutes = "0"+ minutes;
    let seconds = time%60;
    if (seconds< 10) seconds = "0"+ seconds;
    return minutes + ":" + seconds;
}
function generateBoard(board){
    //clear previous
    clearPrevious();
    //increment tile id
    let idCount= 0;
    //81 tiles
    for (let i= 0;i<81;i++){
        //new para element
        let tile = document.createElement("p");
        //tile not blanck
        if (board.charAt(i) != "-"){
            tile.textContent = board.charAt(i);

        }
        else {
            //addclickEventListener
            tile.addEventListener("click", function(){
                if (!disableSelect){
                    //if tile is selcted
                    if(tile.classList.contains("selected")){
                        tile.classList.remove("selected");
                        selectedTile = null;
                    }
                    else {
                        for (let i =0;i<81; i++){
                            qsa(".tile")[i].classList.remove("selected");
                        }
                        //add selction and update variable
                        tile.classList.add("selected");
                        selectedTile = tile;
                        updateMove();
                    }
                }
            });
        }
        //assign tile id
        tile.id = idCount;
        //incrementfor Next tile
        idCount++;
        //tile class
        tile.classList.add("tile");
        if((tile.id > 17 && tile.id < 27) ||(tile.id >44 && tile.id < 54)){
            tile.classList.add("bottomBorder");
            
        }   
        if((tile.id +1)%9 == 3||(tile.id +1)%9 ==6){
            tile.classList.add("rightBorder");
        }
        //now tiles finally!
        id("board").appendChild(tile);
        
     }
}
function updateMove(){
    //if tile and number is selected
    if(selectedTile && selectedNum){
        //set tile to correct number
        selectedTile.textContent = selectedNum.textContent;
        //if num matches
        if(checkCorrect(selectedTile)){
            //deselect
            selectedTile.classList.remove("selected");
            selectedNum.classList.remove("selected");
            //clear
            selectedNum = null;
            selectedTile = null;
            //if num does not match
            if (checkDone()){
                endGame();
            }


        }
        else{
            //disable selecting for 1 sec
            disableSelect = true;
            //tile is red
            selectedTile.classList.add("incorrect");
            setTimeout(function(){
                if(timeRemaining ===0) {endGame();}
                else {disableSelect = false;}

                selectedTile.classList.remove("incorrect");
                selectedTile.classList.remove("selected");
                selectedNum.classList.remove("selected");

                selectedTile.textContent = "";
                selectedNum= null;
                selectedTile = null;

            },1000);
        }
    }
}

function checkDone(){
    let tiles = qsa(".tile");
    for (let i = 0; i<tiles.length; i++){
        if (tiles.textContent === "") return false;

    }
    return true;
}
function endGame(){
    disableSelect = true;
    clearTimeout(timer);
    //display message
    if (timeRemaining ===0){
        id("message").textContent = "YOU LOST!";

    }else{
        id("message").textContent = "YOU WON!";
    }
}
function checkCorrect(tile){
    //set solution on diff
    let solution;
    if (id("diff-1").checked) solution = easy[1];
    else if (id("diff-2").checked) solution = intermediate[1];
    else solution = hard[1];
    if (solution.charAt(tile.id)===tile.textContent) return true;
    else return false;
}
function clearPrevious(){
    //all tiles
    let tiles = qsa(".tile");
    //remove everyone
    for (let i =0;i<tiles.length;i++){
        tiles[i].remove();
    }
    //clear timer
    if (timer) clearTimeout(timer);
    //deselect number
    for(let i = 0;i< id("number-container").children.length; i++){
        id("number-container").children[i].classList.remove("selected");
    }
    //clear if anything is selected
    selectedTile = null;
    selectedNum = null;

}
function qs(selector){
    return document.querySelector(selector);
}
function qsa(selector){
    return document.querySelectorAll(selector);
}

