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
	
	// declare p1s as shorthand for "Player One Snapshot"
	var p1s = snapshot.child('playerOne');
	// declare p2s as shorthand for "Player Two Snapshot"
	var p2s = snapshot.child('playerTwo');

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
		if (p1s.child('isAvailable').val() !== playerOne.isAvailable) {
			
			// if playerOne has become available, reset the values.
			if (p1s.child('isAvailable').val()) {
				resetPlayer(1);
				resetDOMText('p1main');
				resetDOMText('p1menu');
				$('#playerone-btn').empty();
				console.log('reset p1');
			} 
			else { // if playerOne has become unavailable, i.e. has been selected
				// sets playerOne equal to the snapshot
				playerOne = p1s.val();
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
				if (!p2s.child('isAvailable').val()) {
					console.log('displayWeaponsMenu p1');
					displayWeaponsMenu();
				}
			}	
		}
		
		// if playerTwo has changed its availability status
		if (p2s.child('isAvailable').val() !== playerTwo.isAvailable) {
			
			// if playerTwo has become available, reset the values.
			if (p2s.child('isAvailable').val()) {
				resetPlayer(2);
				resetDOMText('p2main');
				resetDOMText('p2menu');
				$('#playertwo-btn').empty();
				console.log('reset p2');
			} 
			else { // if playerTwo has become unavailable, i.e. has been selected
				// sets playerTwo equal to the snapshot
				playerTwo = p2s.val();
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
				if (!p1s.child('isAvailable').val()) {
					console.log('displayWeaponsMenu p2');
					displayWeaponsMenu();
				}
			}	
		}

		// conditions for checking result after both players have selected weapons
		if (p1s.child('doesHaveWeapon').val() == true 
			&& p2s.child('doesHaveWeapon').val() == true)	{
			// sets .doesHaveWeapon to false right away so the functionality 
			// won't accidentally get handled twice.
			database.ref('/activeplayers/playerOne').child('doesHaveWeapon').set(false);
			database.ref('/activeplayers/playerTwo').child('doesHaveWeapon').set(false);
			// saves these as more manageable variables
			var p1choice = p1s.child('selectedWeapon').val();
			var p2choice = p2s.child('selectedWeapon').val();
			var p1wins = p1s.child('numWins').val();
			var p2wins = p2s.child('numWins').val();

			if (p1choice == p2choice) {
				$('#result-text').html("It's a tie!");
			} else {
				// win condition for playerOne, loss for playerTwo
				if ((p1choice == 'rock' && p2choice == 'scissors') 
				 || (p1choice == 'scissors' && p2choice == 'paper') 
				 || (p1choice == 'paper' && p2choice == 'rock')) {
					// display win result
					$('#result-text').html(playerOne.name + ' wins!');
					// increments wins and losses
					p1wins++; p2losses++;
					// changes number of wins and losses in database
					database.ref('/activeplayers/playerOne').child('numWins').set(p1wins);
					database.ref('/activeplayers/playerTwo').child('numLosses').set(p2losses);
				}

				// win condition for playerTwo, loss for playerOne
				if ((p2choice == 'rock' && p1choice == 'scissors') 
				 || (p2choice == 'scissors' && p1choice == 'paper') 
				 || (p2choice == 'paper' && p1choice == 'rock')) {
					// display win result
					$('#result-text').html(playerTwo.name + ' wins!');
					// increments wins and losses
					p2wins++; p1losses++;
					// changes number of wins and losses in database
					database.ref('/activeplayers/playerTwo').child('numWins').set(p2wins);
					database.ref('/activeplayers/playerOne').child('numLosses').set(p1losses);
				}
			} // end of else

			// always do this after checking results of 
			displayWeaponsMenu();
		} // end of 'if' condition checking results.
		
	} // end of else wrap
	// ***END OF INITIAL CHECK

	// sync global playerOne and playerTwo with most up-to-date snapshots to avoid data conflicts
		// $('#player-one').data(p1s.val());
		// playerOne = $('#player-one').data();

}); // end of activeplayers database value event listener