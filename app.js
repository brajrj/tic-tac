let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn =document.querySelector("#new-btn");
let msgContainer =document.querySelector(".msg-container");
let msg= document.querySelector("#msg");

let turno=true;//playerX, playerO

const winpattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],    
    [6,7,8]
]

const resetGame = () => {
    turno = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};



boxes.forEach((box)=> {
    box.addEventListener("click",()=>{
        // console.log("box was clicked");
        if(turno){
            box.innerText="o";
            box.style.color = "blue";
            turno=false;
        } else {
            box.innerText="x";
            turno=true;
        }
        box.disabled=true;

        checkWinner ();
    });
})

const disableBoxes = ()=> {
    for(let box of boxes){
        box.disabled = true;
    }
};
const enableBoxes = ()=> {
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
};
const showWinner = (winner) => {
    msg.innerText = `congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
}
const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    let isDraw = true;

    for (let pattern of winpattern) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return; // Exit function if there's a winner
            }
        }
    }

    // Check for a draw
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false; // If any box is empty, it's not a draw
        }
    });

    if (isDraw) {
        showDraw(); // Call draw message function if all boxes are filled and no winner
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click", resetGame);