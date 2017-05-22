// **************************************** SUBORDINATE FUNCTIONS *****************************************
// uses local storage to set user access permissions
function setUserAccess(userAccess) {
	localStorage.setItem('User Access', userAccess);
}

// returns the user access permission id
function getUserAccess() {
	return (localStorage.getItem('User Access'));
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