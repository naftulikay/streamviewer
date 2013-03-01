/* streamviewer application */

var timeout = -1;

function reload(server, stream) {			
    swfobject.embedSWF("swf/player.swf", "player", "480", "270",
            "10.1.0", "false", 
            { autostart: "false", file: stream, streamer: server }, // flashvars
            { allowfullscreen: "true", autostart: "true" }, // params
            { id: "playerSwf" }); // attributes
}

function fullreload(server, stream) {
    swfobject.removeSWF("playerSwf");
    $("#content").prepend("<div id=\"player\"></div>");
    reload(server, stream);
}

$(document).ready(function() {
    $("#serverInput").val(localStorage.getItem("serverInput"));
    $("#streamInput").val(localStorage.getItem("streamInput"));
    fullreload($("#serverInput").val(), $("#streamInput").val());

    $("#submitButton").click(function() {
        fullreload($("#serverInput").val(), $("#streamInput").val());
    });

    // when an input changes, store its value in local storage
    $("input[type='text']").keyup(function() {
        var key = $(this).attr("id");

        localStorage.setItem(key, $(this).val());

        clearTimeout(timeout);

        timeout = setTimeout(function() {
            fullreload($("#serverInput").val(), $("#streamInput").val());
        }, 700);
    });
});

