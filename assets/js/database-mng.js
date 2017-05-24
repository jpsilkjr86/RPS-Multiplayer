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


	// ***INITIAL CHECK -- Resets player values to initial states, or syncs them with database

	// if either playerOne or playerTwo doesn't exist in the database
	if (!p1s.exists() || !p2s.exists()) {
		// resets DOM to its initial state by emptying out various divs
		resetDOMText('all');
		// resets playerOne and playerTwo to their initial values, both locally and in database
		resetPlayer(1);
		resetPlayer(2);
		console.log('reseting players');
		// playerOne = resetPlayerValues(1);
		// playerTwo = resetPlayerValues(2);
		// database.ref('activeplayers/playerOne').set(playerOne);
		// database.ref('activeplayers/playerTwo').set(playerTwo);
	}	
	else { // wraps below code in an 'else' to avoid redundancy with above code
		
		// if playerOne has changed its availability status
		if (p1s.child('isAvailable').val() !== playerOne.isAvailable) {
			
			// if playerOne has become available, reset the values.
			if (p1s.child('isAvailable').val()) {
				resetPlayer(1);
				resetDOMText('p1main');
				resetDOMText('p1menu');
				console.log('reset p1');
			} 
			else { // if playerOne has become unavailable, i.e. has been selected
				// sets playerOne equal to the snapshot
				playerOne = p1s.val();
				console.log('p1 value updated');

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
				console.log('reset p2');
			} 
			else { // if playerTwo has become unavailable, i.e. has been selected
				// sets playerTwo equal to the snapshot
				playerTwo = p2s.val();
				console.log('p2 value updated');

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
		
	} // end of else wrap
	// ***END OF INITIAL CHECK

	// if both players are active, and if menu divs are both not empty
	// if (snapshot.child('playerOne').child('isActive') 
	// 	&& snapshot.child('playerTwo').child('isActive')
	// 	&& !isDivEmpty('p1menu') && !isDivEmpty('p2menu')) {
	// 	// display weapons menu
	// 	displayWeaponsMenu();
	// }

}); // end of activeplayers database value event listener


// database listener for all changes in playerOne, syncing and initializing in real time
// database.ref('playerOne').on('value', function(snapshot){
// 	// if .isActive property does not exist OR if .isActive is false
// 	if (!snapshot.child('isActive').exists() || !snapshot.val().isActive) {
// 		// resets to initial player values
// 		playerOne = resetPlayerValues(1);

// 		// empties menu divs
// 		$('#playerone-menu').empty();
// 		$('#playertwo-menu').empty();

// 		// syncs database with local playerOne object values
// 		database.ref('playerOne').set(playerOne);
// 	}
// 	// i.e. if .isActive is true
// 	else {
// 		// sets playerOne equal to the snapshot
// 		playerOne = snapshot.val();
// 	}

// 	// syncs updated player data with player-one div
// 	$('#player-one').data(playerOne);

// 	// reassigns playerOne to ensure it is always a direct reference to the DOM data
// 	playerOne = $('#player-one').data();

// 	// displays player status in its divId
// 	printPlayerStatus(playerOne);

// 	console.log('p1 value changed');
// });

// // database listener for all changes in playerTwo, syncing and 
// // initializing in real time (same logic as above)
// database.ref('playerTwo').on('value', function(snapshot){
// 	// if .isActive property does not exist OR if .isActive is false
// 	if (!snapshot.child('isActive').exists() || !snapshot.val().isActive) {
// 		// resets to initial player values
// 		playerTwo = resetPlayerValues(2);

// 		// empties menu divs
// 		$('#playerone-menu').empty();
// 		$('#playertwo-menu').empty();

// 		// syncs database with local playerTwo object values
// 		database.ref('playerTwo').set(playerTwo);
// 	}
// 	// i.e. if .isActive is true
// 	else {
// 		// sets playerTwo equal to the snapshot
// 		playerTwo = snapshot.val();
// 	}

// 	// syncs updated player data with player-two div
// 	$('#player-two').data(playerTwo);

// 	// reassigns playerTwo to ensure it is always a direct reference to the DOM data
// 	playerTwo = $('#player-two').data();

// 	// displays player status in its divId
// 	printPlayerStatus(playerTwo);

// 	// checks if both players are ready - if so, call displayWeaponsMenu()
// 	if (areBothPlayersReady()) {displayWeaponsMenu();}

// 	console.log('p2 value changed');
// });

// database.ref().on('value', function(snapshot){
	// if both players are active, displays weapons menu to players with visibility 
	// dependent on their user access (i.e. other player or observer-lever users 
	// cannot see their menu)
	// console.log(snapshot.val());
	// if (snapshot.val().playerOne.isActive && snapshot.val().playerTwo.isActive) {
	// 	displayWeaponsMenu();
	// }

	// if (playerOne.isActive && playerTwo.isActive && getUserAccess()==='player1_access') {
	// 	displayWeaponsMenu(playerOne);
	// }
	// if (playerOne.isActive && playerTwo.isActive && getUserAccess()==='player2_access') {
	// 	displayWeaponsMenu(playerTwo);
	// }
// });