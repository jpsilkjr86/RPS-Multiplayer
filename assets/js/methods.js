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

// 
function showWeaponsMenu(playerArg) {
	
	$(playerArg.menuId).html('Rock<br>Paper<br>Scissors');

	// if (access === 'player1_access') {
	// 	console.log('player1 access');
	// 	$(playerArg.menuId).html('Rock<br>Paper<br>Scissors');
	// }

	// if (access === 'player2_access') {
	// 	console.log('player2 access');
	// 	$(playerArg.menuId).html('Rock<br>Paper<br>Scissors');
	// }

	// if (access === 'observer_access') {
	// 	$(playerArg.menuId).empty();
	// }
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


function doesPlayerExist(key) {
	var answer;
	database.ref(key).once('value').then(function(snapshot){
		// if (snapshot.val() == null) {console.log(snapshot.val()); answer = true;}
		// else {console.log(snapshot.val()); answer = false;}
		console.log('is this working');
	});
	return false;
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