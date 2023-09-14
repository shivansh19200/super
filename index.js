const cellminis = document.querySelectorAll(".cellmini");
initializeGame();

var turn = 0;


function initializeGame(){

    document.getElementById("restartBtn").style.visibility = "hidden";

    var items = document.getElementsByClassName("cellmini");

    for(let i = 0; i < items.length; i++){
        items[i].innerHTML = "";
    }

    turn = 0;


    //testing purposes 
    /*
    document.getElementById(0).innerHTML = 'O';
    var cells = document.getElementById(0).getElementsByClassName("cellmini");
    for(let i = 0; i < cells.length; i++){
        cells[i].style.display = "none";
    } */
}

//VERY VERY VERY IMPORTANT INITIALIZATION
const e_val_array = [];

function cellClicked(e,elem){

    e_val_array.push(e);

    elem.innerHTML = (turn==0)? "X" : "O";
    console.log(e);

    //VERY IMPORTANT STEPS TO DETERMINE THE WINNER
    if(e_val_array.length >= 2)
        checkWin(e_val_array[e_val_array.length-2]);
    checkWin(e);

    for(let l = 0; l <= 8; l++)
        checkWin(l);
    
    
    megaWin();
    var checkCell = document.getElementById(e);
    
    elem.style.pointerEvents = "none";
    
    turn = (turn==0)? 1 : 0;
    //statusText = (turn==0)? "X PLAYS" : "O PLAYS";

    for(let i = 0; i <= 8; i++){

        if(i!=e){

            var otherBoxes = document.getElementById(i);

            if(checkCell.innerHTML=="X" || checkCell.innerHTML == "O"){

                if(otherBoxes.innerHTML == "X" || otherBoxes == "O"){
                    document.getElementById(i).style.backgroundColor = "#1f3e6b";
                    document.getElementById(i).style.color = "#fff";
                    document.getElementById(i).style.pointerEvents = "none";
                }

                else{
                    document.getElementById(i).style.backgroundColor = "lightgreen";
                    document.getElementById(i).style.pointerEvents = "auto";
                }
                
            }

            else{
                document.getElementById(i).style.backgroundColor = "red";
                document.getElementById(i).style.pointerEvents = "none";
            }
            
        }

        if(i==e){

            if(checkCell.innerHTML=="X" || checkCell.innerHTML == "O" ){
                document.getElementById(i).style.backgroundColor = "lightgreen";
                document.getElementById(i).style.pointerEvents = "none";
            }

            else{
                document.getElementById(i).style.backgroundColor = "lightgreen";
                document.getElementById(i).style.pointerEvents = "auto";
            }

        }

        if(document.getElementById(i).innerHTML == "X" || document.getElementById(i).innerHTML == "O"){
            document.getElementById(i).style.backgroundColor = "#1f3e6b";
            document.getElementById(i).style.color = "#fff";
            document.getElementById(i).style.fontSize = "60px";
            document.getElementById(i).style.textAlign = "center";
            document.getElementById(i).style.pointerEvents = "none";
        }
    }   
}

function checkWin(id){

    //let roundWon = false;
    console.log("obt id: "+id);

    var currentState = ["", "", "", "", "", "", "", ""];

    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    var cells = document.getElementById(id).getElementsByClassName("cellmini");
    
    for(let i = 0; i<cells.length; i++){
        currentState[i] = cells[i].innerHTML;
    }

    /*for(let k = 0; k<currentState.length; k++){
        console.log(currentState[k]);
    }*/

    for(let j = 0; j<winConditions.length; j++){

        const tempArray = winConditions[j];
        const cell1 = currentState[tempArray[0]];
        const cell2 = currentState[tempArray[1]];
        const cell3 = currentState[tempArray[2]];

        if(cell1 == "" || cell2 == "" || cell3 == ""){
            continue;
        }
        if(cell1 == cell2 && cell2 == cell3){
            console.log("winner Found");
            winMini(id);
        }

    }

    if(!currentState.includes("")){
        console.log("draw");
    }

    //console.log(cells[0].innerHTML);
}

function winMini(ID){
    //console.log('win');
    var cells = document.getElementById(ID).getElementsByClassName("cellmini");

    var winner = (turn==0)? "X":"O";

    for(let i = 0; i < cells.length; i++){
            cells[i].style.display = "none";
    }

    document.getElementById(ID).innerHTML = winner;
}

function megaWin(){

    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    
    var options = [];
    
    for(let i = 0; i<=8; i++){

        if(document.getElementById(i).innerHTML == "X" || document.getElementById(i).innerHTML=="O")
            options.push(document.getElementById(i).innerHTML);
        else
            options.push("");

    }

    for(let j = 0; j<winConditions.length; j++){

        const tempArray = winConditions[j];
        const cell1 = options[tempArray[0]];
        const cell2 = options[tempArray[1]];
        const cell3 = options[tempArray[2]];

        if(cell1 == "" || cell2 == "" || cell3 == ""){
            continue;
        }
        if(cell1 == cell2 && cell2 == cell3){
            console.log("winner Found: "+cell1);
            

            for(let i = 0; i<=8; i++){

                var cells = document.getElementById(i).getElementsByClassName("cellmini");

                for(let k = 0; k < cells.length; k++){
                    cells[k].style.display = "none";
                    cells[k].style.backgroundColor = "lightgreen";
                    
                }
            }
            document.getElementById("restartBtn").classList.add("show");
            //alert(cell1+" has won the game");
        }

    }

    if(!options.includes("")){
        console.log("mega draw");
    }
}