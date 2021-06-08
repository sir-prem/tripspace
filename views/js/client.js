const socket = io.connect('http://localhost:4000');

//setup toastr options
toastr.options = {
    timeOut: 10000,
    positionClass : 'toast-top-right',
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

//fetch data entered by the user.
function getData() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tripID: tripID.value }),
    };
    fetch('/api', options)
      .then((res) => res.json())
      .then(function(data) {
        if (data.status === 'success') {
          startTimer();
        } else {
          message.textContent = 'invalid input';
          message.className = 'red-text';
        }
    })
    .catch(function(error) {
        console.log(error);
    });
};
