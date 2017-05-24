// **************************************** GLOBAL FUNCTIONS *****************************************
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
	if (!playerArg.isAvailable) {
		$(playerArg.divId).html('Player ' + playerArg.playerNum + ':<br/>' + playerArg.name);
	} else {
		$(playerArg.divId).html('Player ' + playerArg.playerNum + ' is available!');
	}
}

// adds button for leaving game, visibile only to the user who selected the player
function printLeaveGameBtn(playerArg) {
	var btn = $('<button>');
	btn.addClass('btn btn-info leave-game')
		.text('Exit Game');

	if (getUserAccess() === 'player1_access') {
		console.log('player1 access');
		btn.addClass('pull-left');
		$(playerArg.btnId).append(btn);
	}

	if (getUserAccess() === 'player2_access') {
		console.log('player2 access');
		btn.addClass('pull-right');
		$(playerArg.btnId).append(btn);
	}
}

// returns database key according to user access
function getDatabaseKey() {
	if (getUserAccess() === 'player1_access')
		{return '/activeplayers/playerOne';}
	if (getUserAccess() === 'player2_access')
		{return '/activeplayers/playerTwo';}
}

// displays weapon choices according to user access permission
function displayWeaponsMenu() {
	// creates div that contains all choices
	var weaponChoices = $('<div>');

	// creates divs for rock, paper and scissors
	var rock = $('<div>');
	rock.addClass('weapon-choice').text('Rock').val('Rock').appendTo(weaponChoices);

	var paper = $('<div>');
	paper.addClass('weapon-choice').text('Paper').val('Paper').appendTo(weaponChoices);

	var scissors = $('<div>');
	scissors.addClass('weapon-choice').text('Scissors').val('Scissors').appendTo(weaponChoices);

	// conditionals for displaying data according to user access permissions
	switch(getUserAccess()) {
		case 'player1_access':
			console.log('player1 access');
			$(playerOne.menuId).html(weaponChoices);
			break;
		case 'player2_access':
			console.log('player2 access');
			$(playerTwo.menuId).html(weaponChoices);
			break;
		case 'observer_access':
		// changes class to observed-weapon-choice to allow observers to see the menus displayed
		// but without the ability to utilize the click event listener attached to .weapon-choice 
		// class. also to make duplicates of DOM elements I read that I need to use clone().
			var weaponChoicesClone = $('<div>');
			rock.attr('class', 'observed-weapon-choice').clone().appendTo(weaponChoicesClone);
			paper.attr('class', 'observed-weapon-choice').clone().appendTo(weaponChoicesClone);
			scissors.attr('class', 'observed-weapon-choice').clone().appendTo(weaponChoicesClone);
			$(playerOne.menuId).html(weaponChoices);
			$(playerTwo.menuId).html(weaponChoicesClone);
	}
}

// resets global playerOne and playerTwo objects to initial values, resets DOM data, syncs variables
// with DOM data, and writes playerOne and playerTwo to the database
function resetPlayer(playerNum) {
	switch (playerNum) {
		case 1:
			playerOne = new player("", 1, "/activeplayers/playerOne", true, // resets playerOne
				"#player-one", "#playerone-menu", "#playerone-btn", 0, 0, "");
			database.ref('activeplayers/playerOne').set(playerOne); // updates database
			$('#player-one').data(playerOne); // updates DOM data
			playerOne = $('#player-one').data(); // ensures variable always references DOM data directly
			break;
		case 2:
			playerTwo = new player("", 2, "/activeplayers/playerTwo", true, // resets playerTwo
				"#player-two", "#playertwo-menu", "#playertwo-btn", 0, 0, "");
			database.ref('activeplayers/playerTwo').set(playerTwo); // updates database
			$('#player-two').data(playerTwo); // updates DOM data
			playerTwo = $('#player-two').data(); // ensures variable always references DOM data directly
			break;
	}
}

function resetDOMText(arg) {
	switch (arg) {
		case 'all':
			$('#player-one').html('Player 1 is available!');
			$('#player-two').html('Player 2 is available!');
			$('#playerone-menu').empty();
			$('#playertwo-menu').empty();
			break;
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
	}
}