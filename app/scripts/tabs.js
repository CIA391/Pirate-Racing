/* 

    Required for the tabs otherwise they will NOT work

*/
$( function() {
    $( "#container" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
    $( "#container li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
} );

