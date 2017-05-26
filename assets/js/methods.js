// **************************************** GLOBAL FUNCTIONS *****************************************
// uses local storage to set user access permissions
function setUserAccess(userAccess) {
	sessionStorage.setItem('User Access', userAccess);
}

// returns the user access permission id
function getUserAccess() {
	return (sessionStorage.getItem('User Access'));
}

// resets players to initial values
function resetPlayer(playerNum) {
	if (playerNum == 1) {return new player("", 1, true, 0, 0, "", false);}
	if (playerNum == 2) {return new player("", 2, true, 0, 0, "", false);}
}

// syncs object data from database with DOM. takes an array to allow flexibility in number of arguments.
function syncDOMData(playerAry) {
	for (i = 0; i < playerAry.length; i++) {
		if (playerAry[i].playerNum == 1) {$('#player-one').data(playerAry[i]);}
		if (playerAry[i].playerNum == 2) {$('#player-two').data(playerAry[i]);}
	}
}

// updates database with new player values. takes an array to allow flexibility in number of arguments.
function updatePlayersOnFirebase(playerAry) {
	for (i = 0; i < playerAry.length; i++) {
		if (playerAry[i].playerNum == 1) {database.ref('activeplayers/playerOne').set(playerAry[i]);}
		if (playerAry[i].playerNum == 2) {database.ref('activeplayers/playerTwo').set(playerAry[i]);}
	}
}

// clears or resets DOM data according to arry of string arguments.
function resetDOM(ary) {
	// if the argument is an array with initial value 'all', declare array as all cases.
	if (ary[0] == 'all') {ary = ['p1main', 'p2main', 'p1menu', 'p2menu', 'p1btn', 'p2btn'];}
	// for loop that iterates through array and performs switch cases
	for (i = 0; i < ary.length; i++) {
		switch (ary[i]) {
			case 'p1main':
				$('#player-one').html('Player 1 is available!');
				break;
			case 'p2main':
				$('#player-two').html('Player 2 is available!');
				break;
			case 'p1menu':
				$('#playerone-menu').empty();
				break;
			case 'p2menu':
				$('#playertwo-menu').empty();
				break;
			case 'p1btn':
				$('#playerone-btn').empty();
				break;
			case 'p2btn':
				$('#playertwo-btn').empty();
				break;
		} // end of switch
	} // end of for loop
} // end of function

// prints player status according to whether or not they are active 
function printPlayerStatus(playerArg) {
	if (playerArg.playerNum == 1) { $('#player-one').html('Player 1:<br/>' + playerArg.name); }
	if (playerArg.playerNum == 2) { $('#player-two').html('Player 2:<br/>' + playerArg.name); }
}

// adds button for leaving game, visibile only to the user who selected the player
function printLeaveGameBtn() {
	var btn = $('<button>');
	btn.addClass('btn btn-info leave-game')
		.text('Exit Game');

	if (getUserAccess() === 'player1_access') {
		console.log('player1 access');
		btn.addClass('pull-left');
	}

	if (getUserAccess() === 'player2_access') {
		console.log('player2 access');
		btn.addClass('pull-right');
	}
	
	$(getPlayerBtnId()).html(btn);
}

// returns database key according to user access
function getDatabaseKey() {
	if (getUserAccess() === 'player1_access') {return '/activeplayers/playerOne';}
	if (getUserAccess() === 'player2_access') {return '/activeplayers/playerTwo';}
}

// returns player's main div id according to user access
function getPlayerDivId() {
	if (getUserAccess() === 'player1_access') {return '#player-one';}
	if (getUserAccess() === 'player2_access') {return '#player-two';}
}

// returns player's weapons menu div id according to user access
function getPlayerMenuId() {
	if (getUserAccess() === 'player1_access') {return '#playerone-menu';}
	if (getUserAccess() === 'player2_access') {return '#playertwo-menu';}
}

// returns player's button div id according to user access
function getPlayerBtnId() {
	if (getUserAccess() === 'player1_access') {return '#playerone-btn';}
	if (getUserAccess() === 'player2_access') {return '#playertwo-btn';}
}

// returns player's name according to user access
function getPlayerName() {
	if (getUserAccess() === 'player1_access') {return playerOne.name;}
	if (getUserAccess() === 'player2_access') {return playerTwo.name;}
}

// displays weapon choices according to user access permission
function displayWeaponsMenu() {
	// conditionals for displaying data according to user access permissions
	switch(getUserAccess()) {
		case 'player1_access':
			$('#playerone-menu').html(getWeaponChoicesDiv('player'));
			displayTextOnMenu(2, 'Choosing weapon...');
			break;
		case 'player2_access':
			$('#playertwo-menu').html(getWeaponChoicesDiv('player'));
			displayTextOnMenu(1, 'Choosing weapon...');
			break;
		case 'observer_access':
			displayTextOnMenu(1, 'Choosing weapon...');
			displayTextOnMenu(2, 'Choosing weapon...');
	}
}

// returns a div object with rock, paper and scissors menu
function getWeaponChoicesDiv(access) {
	// creates divs for rock, paper and scissors and appends them to weaponChoicesDiv
	var weaponChoicesDiv = $('<div>');

	var rock = $('<div>');
	rock.text('Rock').val('Rock').addClass('weapon-choice').appendTo(weaponChoicesDiv);

	var paper = $('<div>');
	paper.text('Paper').val('Paper').addClass('weapon-choice').appendTo(weaponChoicesDiv);

	var scissors = $('<div>');
	scissors.text('Scissors').val('Scissors').addClass('weapon-choice').appendTo(weaponChoicesDiv);

	return weaponChoicesDiv;
}

// checks to see if X beats Y by comparing their values. returns bool.
function doesXWinYLose(x, y) {
	if ((x == 'Rock' 	 && 	y == 'Scissors') 
	 || (x == 'Scissors' && 	y == 'Paper') 
	 || (x == 'Paper' 	 && 	y == 'Rock')) {return true;}
	else {return false;}
}

function displayScoreboard() {
	$('#playerone-scoreboard').html('Wins: ' + playerOne.numWins + ', Losses: ' + playerOne.numLosses);
	$('#playertwo-scoreboard').html('Wins: ' + playerTwo.numWins + ', Losses: ' + playerTwo.numLosses);
}

function displayResult(str) {
	$('#result-text').html(str);
}

function displayTextOnMenu(playerNum, str) {
	var text = $('<p>');
	text.addClass('text-center text-info')
		.css('margin', '30px 0')
		.css('font-weight', 'bold')		
		.text(str);
	if (playerNum == 1) {$('#playerone-menu').html(text);}
	if (playerNum == 2) {$('#playertwo-menu').html(text);}
}

function appendChatEntry(name, msg) {
	var chatEntry = $('<div>');
	chatEntry.addClass('chat-entry')
			.html(name + ':&nbsp;&nbsp;' + msg)
			.appendTo('.chat-content');
	// keeps the scrollbar set to the very bottom
	$('.chat-content').scrollTop($('.chat-content')[0].scrollHeight);
}