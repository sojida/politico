
const bars = document.querySelector('.bars');
const navContent = document.querySelector('.nav-content');

bars.addEventListener('click', showContent)

function showContent(){
    navContent.classList.toggle('nav-animate')
}




