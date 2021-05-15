function startTimer(){
    var timeLeft = 30;
    var elem = document.getElementById('timer');
    var timerId = setInterval(countdown, 1000);
    
    function countdown() {
        if (timeLeft == -1) {
            clearTimeout(timerId);
            document.getElementById('timer').innerHTML = 'DRIVER ARRIVED';
        } else {
            elem.innerHTML = timeLeft + 'seconds';
            timeLeft--;
        }
    }
}
