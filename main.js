function hasUserMedia () {
    // testing if browser has WebRTC functions
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia );
}
// is depricated navigator.mozGetUserMedia find replacement
if (hasUserMedia()) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    navigator.mediaDevices.enumerateDevices().then(function(sources){
        console.log(sources)
        // define sources
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
        var video = document.querySelector('video'),
            canvas = document.querySelector('canvas'),
            streaming = false;
        navigator.getUserMedia(constraints, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            streaming = true;
        }, function (err) {});
        // add filters
        var filters = ['', 'grayscale', 'sepia', 'invert'],
            currentFilter = 0;
        // capture video frame on button click
        document.querySelector('#capture').addEventListener('click',
            function (event) {
                if (streaming) {
                    canvas.width = video.clientWidth;
                    canvas.height = video.clientHeight;
                    var context = canvas.getContext('2d');
                    context.drawImage(video, 0, 0);
                    // change filter after every capture
                    currentFilter++;
                    if (currentFilter > filters.length - 1) currentFilter = 0;
                    canvas.className = filters[currentFilter];
                }
        });
    });
    
} else {
    alert("Sorry, your browser does not support getUserMedia.");
}