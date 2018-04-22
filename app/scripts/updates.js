// This is the clident id. 
var CLIENT_ID = '702978221831-0htndqjtscqfqos3hvr2ls0juuualrgs.apps.googleusercontent.com';
// Array of API discovery doc URLs for APIs used by the program
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

/**
* Append a pre element to the body containing the given message
* as its text node. Used to display the results of the API call.
*
* @param {string} message Text to be placed in pre element.
*/
function appendPre1(message) {
    var pre = document.getElementById('event');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

/**
* Print the summary and start datetime/date of the next ten events in
* the authorized user's calendar. If no events are found an
* appropriate message is printed.
*/
function listUpcomingEvents1() {
    //This empties the event list so it isnt isnt repeated when new events are added.
    $("#event").empty();
    //This prepares a new list of events for the updates tab.
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function(response) {
        var events = response.result.items;
        appendPre1('Updates:');

        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;          
                if (!when) {
                    when = event.start.date;
                }  
                appendPre1(event.summary + ' (Start date: ' + when + ')')
                appendPre1('Description: ' + event.description)
                appendPre1('')
            }
        } else {
            appendPre1('No updates');
        }
    });
}