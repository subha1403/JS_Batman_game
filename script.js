score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        batman = document.querySelector('.batman');
        batman.classList.add('animateBatman');
        setTimeout(() => {
            batman.classList.remove('animateBatman')
        }, 700);
    }
    if (e.keyCode == 39) {
        batman = document.querySelector('.batman');
        batmanX = parseInt(window.getComputedStyle(batman, null).getPropertyValue('left'));
        batman.style.left = batmanX + 112 + "px";
    }
    if (e.keyCode == 37) {
        batman = document.querySelector('.batman');
        batmanX = parseInt(window.getComputedStyle(batman, null).getPropertyValue('left'));
        batman.style.left = (batmanX - 112) + "px";
    }
}

setInterval(() => {
    batman = document.querySelector('.batman');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    bx = parseInt(window.getComputedStyle(batman, null).getPropertyValue('left'));
    by = parseInt(window.getComputedStyle(batman, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(bx - ox);
    offsetY = Math.abs(by - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}