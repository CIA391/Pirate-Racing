//This is the client id.
var CLIENT_ID = '702978221831-0htndqjtscqfqos3hvr2ls0juuualrgs.apps.googleusercontent.com';
// Array of API discovery doc URLs for APIs used by the program
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/*var taskform = document.getElementById('task_form');*/

/**
*  On load, called to load the auth2 library and API client library.
*/
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
*  Initializes the API client library and sets up sign-in state listeners.
*/
function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

/**
*  Called when the signed in status changes, to update the UI
*  appropriately. After a sign-in, the API is called.
*  If signed in, many elements show, if signed out many elements clear and hide so they can be ready if the user wants to sign in again.
*/
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block'; 
        signoutButton.style.margin = 'auto';
        $("#event").show();
        $("#cal").show();
        $("#task_form").show();
        $("#eventbutton").show();    
        listUpcomingEvents1();
        listUpcomingEvents2();
    } else {
        authorizeButton.style.display = 'block';
        authorizeButton.style.margin = 'auto';
        signoutButton.style.display = 'none'; 
        $("#event").empty();
        $("#event").hide();
        $("#cal").empty();
        $("#cal").hide();
        $("#task_form").hide();
        $("#eventbutton").hide();
    }
}

/**
*  Sign in the user upon button click.
*/
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
*  Sign out the user upon button click.
*/
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}