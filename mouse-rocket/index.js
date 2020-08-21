function stars() {
    let count = 50;
    const scene = document.querySelector('.scene');
    let i = 0;

    while (i < count) {
        let star = document.createElement('i');
        let x = Math.floor(Math.random() * window.innerWidth);

        let duration = Math.random() * 10;
        if (duration < 1){
            duration = 2
        }
        let h = Math.random() * 100;

        star.style.height = h + 'px';
        star.style.width = 1 + 'px';
        star.style.left = x + 'px';
        star.style.animationDuration = duration + 's'

        scene.appendChild(star);
        i++
    }
}

stars()