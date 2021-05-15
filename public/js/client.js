const socket = io.connect('http://localhost:8080');

//setup toastr options
toastr.options = {
    timeOut: 10000,
    positionClass : 'toast-bottom-right',
    extendedTimeOut: 0,
    fadeOut: 0,
    fadeIn: 0,
    showDuration: 0,
    hideDuration: 0,
    debug: false,
};

//user's custom events
socket.on('new-notification', function(message){
    toastr.success(message, 'New Notification')
});

function sendNotification() {
    let msg = document.getElementById('msg').value;
    socket.emit('send-notification', msg)
};

