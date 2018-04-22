// Google api console clientID and apiKey 
var clientId = '702978221831-0htndqjtscqfqos3hvr2ls0juuualrgs.apps.googleusercontent.com';
var apiKey = 'AIzaSyAqyZfsGgsYkbmSBjtqTIdjXZGvgCEhnV4';

// enter the scope of current project (this API must be turned on in the Google console)
var scopes = 'https://www.googleapis.com/auth/calendar';


// OAuth2 functions
/*
function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
}
*/
//To authenticate
function checkAuth() {
    gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: true }, handleAuthResult);
}

//This appends the pre area "added so it shows the event created
function appendPre3(message) {
    var pre = document.getElementById('added');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

//This takes the event button and uses it to add an event.
$('#eventbutton').click(function() {
    var sum = $('#Summary').val();
    var des = $('#Description').val(); 
    var star = $('#start').val();
    var ends = $('#end').val();
    
    var event = {
        'summary': sum,
        'description': des,
        'start': {
            'date': star,
            'timeZone': 'Europe/London'
      },
        'end': {
            'date': ends,
            'timeZone': 'Europe/London'
      },
    };
    
    var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
    });

    request.execute(function(event) {
        appendPre3('Event created: ' + event.summary);
        listUpcomingEvents1();
        listUpcomingEvents2();
    });
});