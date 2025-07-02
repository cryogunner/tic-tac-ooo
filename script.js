//set themes
const themes={'bubblegum-marceline':[
    {id:'bubblegum', name:'Princess Bubblegum'},
    {id:'marceline',name:'Marceline'}
    ],
    'finn-jake':[
        {id:'finn',name:'Finn'},
        {id:'jake',name:'Jake'}
    ],
    'gunter-iceking':[
        {id:'gunter',name:'Gunter'},
        {id:'iceking',name:'Ice King'}
    ],
    'flame-lsp':[
        {id:'flameprincess',name:'Flame Princess'},
        {id:'lumpy',name:'Lumpy Space Princess'}
    ]};

let currentTheme='bubblegum-marceline'; //default theme is Bubblegum vs Marceline

//mode
/*
let currentMode='2p'; //default mode is 2p
const modeSelector=document.getElementById('mode');
*/

let [player1,player2]=themes[currentTheme];
let currentPlayer=player1.id; //track turn
let currentPlayerName=player1.name; //diaplayed name

const cells=document.querySelectorAll('.cell');

const statusText=document.getElementById('status');
const restartBtn=document.getElementById('restart');

let board=['','','','','','','','','']; //board cells' content
let gameActive=true; //is the game running? prevent moves after win or draw

//let isAI=false; //default mode

//winning patterns
const winPatterns=[
    [0,1,2],[3,4,5],[6,7,8], //row
    [0,3,6],[1,4,7],[2,5,8], //column
    [0,4,8],[2,4,6] //diagonal
];
//function for handling click
function handlesClick(e){
    const cell=e.target; //target cell
    const index=cell.dataset.index; 

    if(board[index]!==''||!gameActive) return; //return in case of all cells assigned or game finished 

    /*AI move
    makeMove(index);

    //check if vs AI and if AI's turn
    if(isAI && currentPlayer==player2.id && gameActive){
        setTimeout(()=>{
            aiMove(); //delay for realism
        },500);
    }  
        */

    board[index]=currentPlayer;
    //cell.textContent=currentPlayer;
    
    cell.innerHTML=`<img src="images/${currentPlayer}.png" alt="${currentPlayer}" class="piece">`;

    const winPattern=checkWin();
    console.log('winPattern:',winPattern);
    if(winPattern){
       
        winPattern.forEach(i=>{
            cells[i].classList.add('win-glow'); //add animations to winning line
        });
        let winMessage = '';
        let winQuote='';

        if (currentTheme === 'bubblegum-marceline') {
            if (currentPlayer==='bubblegum'){
                winMessage='Princess Bubblegum triumps with diplomacy!';
                winQuote="I always have a plan.";
            }
            else{
                winMessage='Marceline rocks the board!';
                winQuote="I'm just your problem.";
            }
        } else if (currentTheme === 'finn-jake') {
            if(currentPlayer==='finn'){
                winMessage='Finn wins with righteous fury!';
                winQuote='Mathematical!'
            }
            else{
                winMessage='Jake wiggles into victory!';
                winQuote="I'm built different, man.";
            }
        } else if (currentTheme === 'gunter-iceking') {
            if(currentPlayer==='gunter'){
                winMessage='Gunter... *why* do you win?';
                winQuote='*Wenk*';
            }else{
                winMessage='Ice King freezes the game!';
                winQuote="You love me now, right?!";
            }
        }else if(currentTheme==='flame-lsp'){
            if(currentPlayer==='flameprincess'){
                winMessage='Flame Princess scorches the board!';
                winQuote='Victory ignited.'
            }else{
                winMessage='Lumpy Space Princess snatches the win - lump off!';
                winQuote="Oh my glob, I'm, like, totally amazing.";
            }
        }
             else {
            winMessage = `${currentPlayer.toUpperCase()} wins!`;
            winQuote='';
        }
        
        statusText.innerHTML=`${winMessage}<br><span class="win-quote">${winQuote}</span>`;
        gameActive=false;
        return;

    }
    if(board.every(cell=>cell !=='')){
            //statusText.textContent="It's a draw. No one conquers the grid.";
            let drawMessage='';
            if(currentTheme==='bubblegum-marceline'){
                drawMessage = "Bubblegum and Marceline are too evenly matched. It's a sweet standoff.";
            }else if(currentTheme==='finn-jake'){
                drawMessage = "Bros think alike. It's a righteous draw!";
            }else if(currentTheme==='gunter-iceking'){
                drawMessage = "Chaos meets cold - neither Gunter nor Ice King claims the crown.";
            }else if(currentTheme==='flame-lsp'){
                drawMessage = "Fire and fabulousness cancel each other out.";
            }else{
                drawMessage="It's a draw. No one conquers the grid."
            }
            //statusText.textContent=drawMessage;
            statusText.innerHTML=`<span class="draw-message">${drawMessage}</span>`;
            gameActive=false;
            return;
    }
    if(currentPlayer===player1.id){
        currentPlayer=player2.id;
        currentPlayerName=player2.name;
    }else{
        currentPlayer=player1.id;
        currentPlayerName=player1.name;
    }
           
    
}
function checkWin(){

    return winPatterns.find(pattern=>{
        const[a,b,c]=pattern;
        return board[a] && board[a] === board[b]&& board[a]===board[c];
    });


 
} //used .some before but replaced with .find as the former returns boolean value while current function will return matching array like [1,2,3]
function restartGame(){

    board=['','','','','','','','',''];
    currentPlayer=player1.id;
    currentPlayerName=player1.name;
    gameActive=true;

    cells.forEach(cell=>{
        cell.innerHTML='';
        cell.classList.remove('win-glow') //remove animation
    });
    //custom messages
    if(currentTheme==='bubblegum-marceline'){
            statusText.textContent=`Sugar and sound clash - ${currentPlayerName.toUpperCase()}'s turn.`;
    }else if(currentTheme==='finn-jake'){
            statusText.textContent=`Brothers at play - ${currentPlayerName.toUpperCase()} begins!`;
    }else if(currentTheme==='gunter-iceking'){
            statusText.textContent=`The cold war begins - ${currentPlayerName.toUpperCase()}'s turn.`;
    }else if(currentTheme==='flame-lsp'){
        statusText.textContent=`Hot-tempered vs hot mess - ${currentPlayerName.toUpperCase()}'s turn.`;
    }

}

function applyThemeStyle(themeName){
    document.body.className='';
    document.body.classList.add(`theme-${themeName}`);
} //removes existing class from <body> and adds new one

cells.forEach(cell=>cell.addEventListener('click',handlesClick));
restartBtn.addEventListener('click',restartGame);

//for AI intergation--
/*
modeSelector.addEventListener('change',(e)=>{
    isAI=e.target.value==='1p'; //true if 1 player selected
    restartGame(); //reset board on mode change
})
    */

//theme change
const themeSelector=document.getElementById('theme');
themeSelector.addEventListener('change',(e)=>{
    currentTheme=e.target.value; //sets theme to the clicked element
    [player1,player2]=themes[currentTheme]; //players set to the theme 
    currentPlayer=player1.id;
    currentPlayerName=player1.name;

    applyThemeStyle(currentTheme); //apply selected theme
    updateCards(); //update character card
    restartGame(); //reset board for new game
})

function updateCards(){

    const leftCard=document.getElementById('player1-card');
    const rightCard=document.getElementById('player2-card');

    const[char1,char2]=themes[currentTheme]; 

    const info1=characterInfo[char1.id];
    const info2=characterInfo[char2.id];

    //character details for left and right card
    leftCard.innerHTML=`
    <div class="card-inner">
        <div class="card-front">
            <img src="images/${info1.image}" alt="${info1.name}">
        </div>
        <div class="card-back">
            <h3>${info1.name}</h3>
            <p><strong>Strength:</strong>${info1.strength}</p>
            <p><strong>Weakness:</strong>${info1.weakness}</p>
            <p>${info1.description}</p>
        </div>
    </div>
    `;
    rightCard.innerHTML=`
    <div class="card-inner">
        <div class="card-front">
            <img src="images/${info2.image}" alt="${info2.name}">
        </div>
        <div class="card-back">
            <h3>${info2.name}</h3>
            <p><strong>Strength:</strong>${info2.strength}</p>
            <p><strong>Weakness:</strong>${info2.weakness}</p>
            <p>${info2.description}</p>
        </div>
    </div>
    `;
}
//character card info
const characterInfo={
    bubblegum: {
        name: 'Princess Bubblegum',
        image: 'bubblegum.png',
        strength: 'Strategic genius',
        weakness: 'Overthinks everything',
        description: 'Leader of the Candy Kingdom with a brain full of science and secrets.'
    },
    marceline: {
        name: 'Marceline',
        image: 'marceline.png',
        strength: 'Vampire queen powers & music',
        weakness: 'Emotional vulnerability',
        description: 'A rockstar vampire with centuries of stories and a love for bass guitars.'
    },
    finn: {
        name: 'Finn',
        image: 'finn.png',
        strength: 'Heroic courage',
        weakness: 'Impulsive decisions',
        description: 'The human who’s always ready for adventure — and justice.'
    },
    jake: {
        name: 'Jake',
        image: 'jake.png',
        strength: 'Stretchy powers & chill vibes',
        weakness: 'Too chill sometimes',
        description: 'A magical dog who fights bad guys and naps hard.'
    },
    gunter: {
        name: 'Gunter',
        image: 'gunter.png',
        strength: 'Unpredictable chaos',
        weakness: 'Literally a penguin',
        description: "Cute... but probably evil. Don't trust the penguin."
    },
    iceking: {
        name: 'Ice King',
        image: 'iceking.png',
        strength: 'Ice powers & fanfiction',
        weakness: 'Loneliness',
        description: 'The tragically misunderstood monarch of cold and awkwardness.'
    },
    flameprincess: {
        name: 'Flame Princess',
        image: 'flameprincess.png',
        strength: 'Fire elemental rage',
        weakness: 'Hard to control emotions',
        description: 'Fierce, fiery, and determined to forge her own identity.'
    },
    lumpy: {
        name: 'Lumpy Space Princess',
        image: 'lumpy.png',
        strength: 'Unshakable confidence',
        weakness: 'Everything else',
        description: 'Drama queen of the Lumpy Kingdom. Loud, lumpy, legendary.'
    }
}
//call on page load
applyThemeStyle(currentTheme);
updateCards();
restartGame();