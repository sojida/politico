window.onload = () => {

    function animateSlogan() {
    // all slogan class in an array
    const slogan = document.querySelectorAll('p.slogan');

    let counter = 0;

    // add the animation to the first element
    slogan[counter].classList.add('slogan-anime')
        setInterval(() => {

            // when counter resets to -1, ensure aniamtion class is removed form the last element
            if (counter == -1){
                slogan[slogan.length - 1].classList.remove('slogan-anime')
            }
            
            // keep the countng going on
            ++counter

            // this is to remove the animation from the last element
            if (counter > 0){
                slogan[counter - 1].classList.remove('slogan-anime')
            }

            let steps = slogan[counter].innerHTML.length
            slogan[counter].style.animation = `typing 3.5s steps(${steps}, end), blink-caret 1s  infinite`

            // add the aniamation class to each elemeent
            slogan[counter].classList.add('slogan-anime')

            // reset the counter when it reaches the last element
            if (counter == slogan.length - 1){
                counter = -1
            }
        }, 5000);

    }

 animateSlogan()
}