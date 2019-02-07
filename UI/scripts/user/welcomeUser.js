const referPage = document.referrer.split('/');
const userObj = JSON.parse(localStorage.user)
const voteGif = document.getElementById('vote-gif')

const displayWelcome = (user) => {
    wlcModal.style.display = 'block'
    wlcMsg.innerHTML = `Welcome Back ${user.firstname}!`
}

const welcomeUser = (user) => {
    wlcModal.style.display = 'block'
    wlcMsg.innerHTML = `Welcome to Politico ${user.firstname}!`
    voteGif.attributes.src.value = './images/welcome.gif'
}

if (referPage[referPage.length - 1] === 'signin.html'){
    displayWelcome(userObj)
}

if (referPage[referPage.length - 1] === 'signup.html'){
    welcomeUser(userObj)
}


