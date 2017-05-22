// **************************************** SUBORDINATE FUNCTIONS *****************************************
// uses local storage to set user access permissions
function setUserAccess(userAccess) {
	localStorage.setItem('User Access', userAccess);
}

// returns the user access permission id
function getUserAccess() {
	return (localStorage.getItem('User Access'));
}

// prints player status according to whether or not they are active 
function printPlayerStatus(playerObj) {
	if (playerObj.isActive) {
		$(playerObj.divId).html('Player ' + playerObj.playerNum + ':<br/>' + playerObj.name);
	} else {
		$(playerObj.divId).html('Player ' + playerObj.playerNum + ' is available!');
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