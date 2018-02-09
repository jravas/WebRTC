function hasUserMedia () {
    // testing if browser has WebRTC functions
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia );
}
// is depricated navigator.mozGetUserMedia find replacement
if (hasUserMedia()) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    navigator.mediaDevices.enumerateDevices().then(function(sources){
        console.log(sources)
        // defiine soutce
        var audioSource = null;
        var videoSource = null;
        for (var i = 0; i < sources.length; ++i) {
            var source = sources[i];
            if(source.kind === "audioinput") {
                console.log("Microphone found:", source.label, source.groupId);
                audioSource = source.groupId;
            } else if (source.kind === "videoinput") {
                console.log("Camera found:", source.label, source.groupId);
                videoSource = source.groupId;
            } else {
                console.log("Unknown source found:", source);
            }
        }
        var constraints = {
            audio: {
                optional: [{sourceId: audioSource}]
            },
            video: {
                optional: [{sourceId: videoSource}]
            }
        };
        navigator.getUserMedia(constraints, function (stream) {
            var video = document.querySelector('video');
            video.src = window.URL.createObjectURL(stream);
        }, function (err) {});
    });
    
} else {
    alert("Sorry, your browser does not support getUserMedia.");
}