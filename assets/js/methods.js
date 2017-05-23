// **************************************** SUBORDINATE FUNCTIONS *****************************************
// uses local storage to set user access permissions
function setUserAccess(userAccess) {
	sessionStorage.setItem('User Access', userAccess);
}

// returns the user access permission id
function getUserAccess() {
	return (sessionStorage.getItem('User Access'));
}

// prints player status according to whether or not they are active 
function printPlayerStatus(playerArg) {
	if (playerArg.isActive) {
		$(playerArg.divId).html('Player ' + playerArg.playerNum + ':<br/>' + playerArg.name);
	} else {
		$(playerArg.divId).html('Player ' + playerArg.playerNum + ' is available!');
	}
}

// adds button for leaving game, visibile only to the user who selected the player
function printLeaveGameBtn(playerArg, access) {
	var btn = $('<button>');
	btn.addClass('btn btn-info leave-game')
		.text('Exit Game')
		.attr('data-databaseKey', playerArg.databaseKey); // to be used later to reference database

	if (access === 'player1_access') {
		console.log('player1 access');
		$(playerArg.btnId).append(btn);
	}

	if (access === 'player2_access') {
		console.log('player2 access');
		$(playerArg.btnId).append(btn);
	}
}

function areBothPlayersReady() {
	if (playerOne.isActive && playerTwo.isActive) {return true;}
	else {return false;}
}

// function areBothPlayersReady() {
// 	database.ref('playerOne').child('isActive').once('value').then(function(snapshot){
// 		var playerOneReady = playerOne.isActive;
// 	});
// 	database.ref('playerTwo').child('isActive').once('value').then(function(snapshot){
// 		var playerTwoReady = playerTwo.isActive;
// 	});
// 	console.log (playerOneReady, playerTwoReady);
// }

// displays weapon choices according to user access permission
function displayWeaponsMenu() {
	// creates divs for rock, paper and scissors
	var rock = $('<div>');
	rock.addClass('weapon-choice').text('Rock').val('Rock');

	var paper = $('<div>');
	paper.addClass('weapon-choice').text('Paper').val('Paper');

	var scissors = $('<div>');
	scissors.addClass('weapon-choice').text('Scissors').val('Scissors');

	// conditionals for displaying data according to user access permissions
	if (getUserAccess() === 'player1_access') {
		console.log('player1 access');
		$(playerOne.menuId).append(rock).append(paper).append(scissors);
	}

	if (getUserAccess() === 'player2_access') {
		console.log('player2 access');
		$(playerTwo.menuId).append(rock).append(paper).append(scissors);
	}

	if (getUserAccess() === 'observer_access') {
		// changes class to observed-weapon-choice to allow observers to see the menus displayed
		// but without the ability to utilize the click event listener attached to .weapon-choice 
		// class. also to make duplicates of DOM elements I read that I need to use clone().
		rock.attr('class', 'observed-weapon-choice')
			.appendTo(playerOne.menuId).clone().appendTo(playerTwo.menuId);
		paper.attr('class', 'observed-weapon-choice')
			.appendTo(playerOne.menuId).clone().appendTo(playerTwo.menuId);
		scissors.attr('class', 'observed-weapon-choice')
			.appendTo(playerOne.menuId).clone().appendTo(playerTwo.menuId);
	}
}

function resetPlayerValues(playerNum) {
	if (playerNum == 1) {
		return (new player("", 1, "playerOne", false, 
			"#player-one", "#playerone-menu", "#playerone-btn", 0, 0, ""));
	}
	if (playerNum == 2) {
		return (new player("", 2, "playerTwo", false, 
			"#player-two", "#playertwo-menu", "#playertwo-btn", 0, 0, ""));
	}
}

// 
function syncWithDatabase(database, key) {
	var data = {};
	database.ref(key).once('value').then(function(snapshot){
		data = snapshot.val();
		console.log(data);
	});
	return data;
}