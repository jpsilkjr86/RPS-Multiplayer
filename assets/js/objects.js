// ****************************************** GLOBAL OBJECTS ******************************************
function player(name, playerNum, isAvailable, numWins, numLosses, selectedWeapon, doesHaveWeapon) {
	this.name = name;
	this.playerNum = playerNum;
	this.isAvailable = isAvailable;
	this.numWins = numWins;
	this.numLosses = numLosses;
	this.selectedWeapon = selectedWeapon;
	this.doesHaveWeapon = doesHaveWeapon;
}

// declares global player variables as empty objects
var playerOne = {};
var playerTwo = {};

// declares timer interval variable for when setTimeout occurs later 
// (happens between matches when results are being displayed)
var timerInterval;

// declares timer object (for setting player timeout functionality)
var timer = {
	timeRemaining: 8,
	initialTime: 8,
	startTimer: function(){
		console.log('timer started');
		timer.timeRemaining = timer.initialTime;
		timer.countdown();
	},
	clearTimer: function(){
		$('#timer').empty();
		clearInterval(timerInterval);
	},
	countdown: function(){
		timerInterval = setInterval(function(){
			$('#timer').html(timer.convertTime(timer.timeRemaining));
			if (timer.timeRemaining == 0) {timer.timesUp();}
			timer.timeRemaining--;
		}, 1000);
	},
	convertTime: function(t){
		var time = $('<p>').css('font-weight', 'bold');
		if (t > 9) {time.text('0:' + t);}
		else if (t >= 0) {time.text('0:0' + t);}
		return time;
	},
	timesUp: function(){
		clearInterval(timerInterval);
		resetDOM(['p1menu', 'p2menu']);
		displayResult("Time's up. Removing inactive players...");
		var doesP1HaveWeapon = queryPlayerStatus(1, 'doesHaveWeapon');
		var doesP2HaveWeapon = queryPlayerStatus(2, 'doesHaveWeapon');
		console.log(doesP1HaveWeapon, doesP2HaveWeapon);
		setTimeout(function(){
			timer.clearTimer();
			// triggers click on "Exit Game" buttons if players are inactive
			if(!doesP1HaveWeapon) {
				$('#playerone-btn').find('.leave-game').trigger('click');
			}
			if(!doesP1HaveWeapon) {
				$('#playertwo-btn').find('.leave-game').trigger('click');
			}
		}, 4000);
	}
}