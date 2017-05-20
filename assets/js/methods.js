// **************************************** SUBORDINATE FUNCTIONS *****************************************
function setUserAccess(userAccess) {
	localStorage.setItem('User Access', userAccess);
}

function getUserAccess() {
	return (localStorage.getItem('User Access'));
}