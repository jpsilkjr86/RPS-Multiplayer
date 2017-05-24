// Initialize Firebase
var config = {
	apiKey: "AIzaSyBsCJnfk8kdb0YPh8E3vX-PkC431PBXYHE",
	authDomain: "rps-multiplayer-30b08.firebaseapp.com",
	databaseURL: "https://rps-multiplayer-30b08.firebaseio.com",
	projectId: "rps-multiplayer-30b08",
	storageBucket: "rps-multiplayer-30b08.appspot.com",
	messagingSenderId: "354898222826"
};
firebase.initializeApp(config);

// declares a global database variable
var database = firebase.database();

// database listener for all changes in activeplayers index
// in database, syncing and initializing in real time
database.ref('/activeplayers/').on('value', function(snapshot){
	
	// declare p1s and p2s as shorthands for "Player 1 Snapshot" & "Player 2 Snapshot"
	var p1s = snapshot.child('playerOne');
	var p2s = snapshot.child('playerTwo');

	// declare p1sv and p2sv as shorthands for "Player 1 Snapshot .val()" & "Player 2 Snapshot .val()"
	var p1sv = p1s.val();
	var p2sv = p2s.val();

	// if either playerOne or playerTwo doesn't exist in the database
	if (!p1s.exists() || !p2s.exists()) {
		// resets DOM to its initial state by emptying out various divs
		resetDOMText('all');
		$('#playerone-btn').empty(); $('#playertwo-btn').empty();
		// resets playerOne and playerTwo to their initial values, both locally and in database
		resetPlayer(1);
		resetPlayer(2);
		console.log('reseting players');
	}	
	else { // wraps below code in an 'else' to avoid redundancy with above code
		
		// if playerOne has changed its availability status
		if (p1sv.isAvailable !== playerOne.isAvailable) {
			
			// if playerOne has become available, reset the values.
			if (p1sv.isAvailable) {
				resetPlayer(1);
				resetDOMText('p1main');
				resetDOMText('p1menu');
				$('#playerone-btn').empty();
				console.log('reset p1');
			} 
			else { // if playerOne has become unavailable, i.e. has been selected
				// sets playerOne equal to the snapshot value
				playerOne = p1sv;
				console.log('p1 value updated');

				// adds button for leaving game, visibile only to the user who selected the player
				printLeaveGameBtn();

				// syncs updated player data with player-one div
				$('#player-one').data(playerOne);

				// reassigns playerOne to ensure it is always a direct reference to the DOM data
				playerOne = $('#player-one').data();

				// updates player status in its divId
				printPlayerStatus(playerOne);

				// if playerTwo has also been selected, display weapons
				if (!p2sv.isAvailable) {
					console.log('displayWeaponsMenu p1');
					displayWeaponsMenu();
				}
			}	
		}
		
		// if playerTwo has changed its availability status
		if (p2sv.isAvailable !== playerTwo.isAvailable) {
			
			// if playerTwo has become available, reset the values.
			if (p2sv.isAvailable) {
				resetPlayer(2);
				resetDOMText('p2main');
				resetDOMText('p2menu');
				$('#playertwo-btn').empty();
				console.log('reset p2');
			} 
			else { // if playerTwo has become unavailable, i.e. has been selected
				// sets playerTwo equal to the snapshot
				playerTwo = p2sv;
				console.log('p2 value updated');

				// adds button for leaving game, visibile only to the user who selected the player
				printLeaveGameBtn();

				// syncs updated player data with player-two div
				$('#player-two').data(playerTwo);

				// reassigns playerTwo to ensure it is always a direct reference to the DOM data
				playerTwo = $('#player-two').data();

				// updates player status in its divId
				printPlayerStatus(playerTwo);

				// if playerOne has also been selected, display weapons
				if (!p1sv.isAvailable) {
					console.log('displayWeaponsMenu p2');
					displayWeaponsMenu();
				}
			}	
		}

		if (p1sv.doesHaveWeapon === true) {resetDOMText('p1menu'); console.log('p1:', p1sv.selectedWeapon);}
		if (p2sv.doesHaveWeapon === true) {resetDOMText('p2menu'); console.log('p2:', p2sv.selectedWeapon);}

		// conditions for checking game result after both players have selected weapons
		if (p1sv.doesHaveWeapon === true && p2sv.doesHaveWeapon === true )	{
			// saves these as more manageable variables
			var p1choice = p1sv.selectedWeapon;	var p2choice = p2sv.selectedWeapon;			
			var p1wins = p1sv.numWins;			var p2wins = p1sv.numWins;
			var p1losses = p1sv.numLosses;		var p2losses = p2sv.numLosses;

			// resets database values
			database.ref('/activeplayers/playerOne').child('doesHaveWeapon').set(false);
			database.ref('/activeplayers/playerTwo').child('doesHaveWeapon').set(false);
			database.ref('/activeplayers/playerOne').child('selectedWeapon').set('');
			database.ref('/activeplayers/playerTwo').child('selectedWeapon').set('');
			
			// check for tie first
			if (p1choice == p2choice) {
				displayResult("It's a tie!");
			} else {
				// if player 1 wins, player 2 loses
				if (doesXWinYLose(p1choice, p2choice)) {
					// increments wins and losses
					p1wins++; p2losses++;
					// changes number of wins and losses in database
					database.ref('/activeplayers/playerOne').child('numWins').set(p1wins);
					database.ref('/activeplayers/playerTwo').child('numLosses').set(p2losses);
					// display win result
					displayResult(p1sv.name + ' wins!');
				} 
				else { // if player 2 wins, player 1 loses
					// increments wins and losses
					p2wins++; p1losses++;
					// changes number of wins and losses in database
					database.ref('/activeplayers/playerTwo').child('numWins').set(p2wins);
					database.ref('/activeplayers/playerOne').child('numLosses').set(p1losses);
					// display win result
					displayResult(p2sv.name + ' wins!');
				}
			} // end of else

			// always do this after checking and displaying game results
			displayWeaponsMenu();
		} // end of 'if' condition checking results.
		
	} // end of else wrap
	// ***END OF INITIAL CHECK

	// sync global playerOne and playerTwo with most up-to-date snapshots to avoid data conflicts
		// $('#player-one').data(p1s.val());
		// playerOne = $('#player-one').data();

}); // end of activeplayers database value event listener