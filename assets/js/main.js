// **************************************** MAIN APP FUNCTIONS *****************************************

$(document).ready(function(){
	// sets initial user access to observer
	setUserAccess('observer_access');

	// click event listener for choosing players
	$('.player-div').on('click', function(){
		var thisPlayer = $(this).data();
		// if the user is an observer, i.e. not a player
		if (getUserAccess() === 'observer_access') {
			
			if (thisPlayer.isAvailable) {
				// gets name via prompt (would like to upgrade to modals if project time allows)
				var nameInput = prompt('Please enter a user name.');
				// if user enters non-empty string
				if (nameInput != null){
					// sets user access in local storage 
					setUserAccess('player' + thisPlayer.playerNum + '_access');
					toggleChatState();
					// packages changes in one lump of data and sends it to firebase
					database.ref(getDatabaseKey()).set({
						name: nameInput,
						playerNum: thisPlayer.playerNum,
						isAvailable: false,
						numWins: 0,
						numLosses: 0,
						selectedWeapon: "",
						doesHaveWeapon: false
					});
				}
			} else {
				alert('This player is currently being played by another user.');
			}
		} else {alert('You have already selected a player.');}		
	});

	// click event listener for leave-game buttons
	$(document).on('click', '.leave-game', function(){
		// uses the player's database key to set .isAvailable to true. Event listeners 
		// in database-mng.js will take it from there.
		database.ref(getDatabaseKey()).child('isAvailable').set(true);

		// removes button from DOM
		$(getPlayerBtnId()).empty();

		// resets user access level to observer
		setUserAccess('observer_access');
		toggleChatState();
	});

	// click event listener for weapon-choice
	$(document).on('click', '.weapon-choice', function(){
		// saves choice in variable
		var choice = $(this).val();
		// gets player data from DOM
		var thisPlayer = $(getPlayerDivId()).data();
		// changes html on the weapon menu div so that user can't choose more than one weapon
		displayTextOnMenu(thisPlayer.playerNum, 'Weapon selected!');

		// packages changes in one lump of data and sends it to firebase
		database.ref(getDatabaseKey()).set({
			name: thisPlayer.name,
			playerNum: thisPlayer.playerNum,
			isAvailable: thisPlayer.isAvailable,
			numWins: thisPlayer.numWins,
			numLosses: thisPlayer.numLosses,
			selectedWeapon: choice,		// <-- changed (new value)
			doesHaveWeapon: true		// <-- changed (new value)
		});
	});
	// event handler for clicking send-msg
	$('#send-msg').on('click', function(e){
		// prevents page from reloading
		e.preventDefault();
		// captures input value
		var inputChatMsg = $('#input-chat-msg').val();
		// clears input field
		$('#input-chat-msg').val('');

		if (getUserAccess() !== 'observer_access') {
			// gets player name
			var playerName = getPlayerName();
			// sends data to firebase
			database.ref('chats').push({
				name: playerName,
				msg: inputChatMsg,
				timestamp: firebase.database.ServerValue.TIMESTAMP
			});
		}
	});
	// event handler for pressing ENTER when typing in input-chat-msg
	$('#input-chat-msg').on('keypress', function(e){
		// triggers 'click' event by hitting ENTER when typing in input field
		if (e.which == 13) {$('#send-msg').trigger('click');}
	});

	// event handler for unload (closing page, refreshing...)
	$(window).on('unload', function(){
		// triggers 'click' event on leave-game btn
		$(document).find('.leave-game').trigger('click');
	});



	// <---------- FOR ERROR CHECKING ---------->
	$(document).keypress(function(e){
		// if (e.key == 'q') {
		// 	database.ref('/activeplayers/playerOne').once('value').then(function(snapshot){
		// 		console.log('database:', snapshot.val());
		// 	});
		// 	database.ref('/activeplayers/playerTwo').once('value').then(function(snapshot){
		// 		console.log('database:', snapshot.val());
		// 	});
		// 	console.log('local vars:', playerOne, playerTwo);
		// 	console.log('DOM data:', $('#player-one').data(), $('#player-two').data());
		// }	
		// if user presses ` key
		if (e.keyCode === 96) {
			database.ref('/activeplayers/playerOne').set({});
			database.ref('/activeplayers/playerTwo').set({});
			database.ref('chats').set({});
			setUserAccess('observer_access');
		}

		if (e.key == '/') {
			console.log('Your access level is:', getUserAccess());
		}
	});
}); // end of document ready