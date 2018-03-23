/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score.After
  that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/




/*039*/
var scores, roundScore, activePlayer, gamePlaying;//gamePlaying-->STATE variable

init();

//scores = [0,0]; //array is zero based
//roundScore = 0;
//activePlayer = 0;// '0' will be the first player and '1' will be the second player(bcoz we use arrays)

//dice = Math.floor(Math.random() *6) + 1;
//console.log(dice);

//document.querySelector('#current-' + activePlayer).textContent = dice;//using textConent we can set only text not html
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';//using innnerHTML we can set html


//var x = document.querySelector('#score-0').textContent;
//console.log(x);

//document.querySelector('.dice').style.display = 'none';



/*040*/

/*============================callback function=====================
function button(){
	//do something here
}
button();

document.querySelector('.btn-roll').addEventListener('click', button);/*here "button" is called a callback function, because it is not called by us, but by another function i.e, addEventListener*/
/*callback function - A function that we pass into another function as an argument, and the function(i.e, addEventListener) will call the function for us  */



//document.getElementById('score-0').textContent = '0';
//document.getElementById('score-1').textContent = '0';
//document.getElementById('current-0').textContent = '0';
//document.getElementById('current-1').textContent = '0';


/*==============================(a) Anonymous function===============*/
document.querySelector('.btn-roll').addEventListener('click', function() { /*anonymous function, a function that does not have a name and cannot be reused*/

	//check the STATE
	if(gamePlaying){

			//1. Random number
			 var dice = Math.floor(Math.random() *6) + 1;// var used only in this scope

			//2.Display the number
			var diceDOM = document.querySelector('.dice'); // var used only in this scope
			diceDOM.style.display = 'block';
			diceDOM.src = 'dice-'+ dice +'.png';


			/*041*/


			//3.update the round score IF the rolled number is not a 1
			if (dice !== 1){  /* !==  --> doesn't do type coversion, !=  --> does type coversion */
				//Add score
				roundScore += dice;
				document.querySelector('#current-' + activePlayer).textContent = roundScore;
			}
			else{
				//Next player
				nextPlayer();
			}

		}

	
});

document.querySelector('.btn-hold').addEventListener('click', function() { 

	//if the STATE variable is true then only go ahead

	if(gamePlaying){

		// Add CURRENT score to GLOBAL score 
		scores[activePlayer] += roundScore;
		/*====same as=====
		scores[activePlayer] = scores[activePlayer] + roundScore;*/

		// update the UI
		document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];

		//check if player won the game
		if(scores[activePlayer] >= 20){
			//he wins
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
			document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');


			//Set STATE variable to false if he wins the game
			gamePlaying = false;//after setting this to false all the other gamePlaying if conditions will not work

		}
		else{
			//no result---continue

			//next player
			nextPlayer();
		}

		}



});


function nextPlayer(){
	//Next player
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		
		/*same as above
		if(activePlayer === 0){
			activePlayer = 1;
		}
		else{
			activePlayer = 0;
		}*/

		roundScore = 0;//resetting the round score to zero of second player


		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		/*document.querySelector('.player-0-panel').classList.remove('active');
		document.querySelector('.player-1-panel').classList.add('active');*/

		/*TOGGLE*/
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		document.querySelector('.dice').style.display = 'none';
}	

/*==================================================================*/
/*CREATING A NEW GAME*/
/*======================first way======================
document.querySelector('.btn-new').addEventListener('click', function() {
	init();
});*/

/*======================second way=======================*/
document.querySelector('.btn-new').addEventListener('click',init);


/*==================================================================*/

function init() {
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;

	gamePlaying = true;// STATE variable


	document.querySelector('.dice').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = 'Player 1';/*remove # symbol for query selector */
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.querySelector('.player-0-panel').classList.add('active');/*to make the player 0 active always*/
}
