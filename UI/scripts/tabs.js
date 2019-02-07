window.onload = () => {
const logout = document.getElementById('logOut');

logout.addEventListener('click', () => {
    localStorage.clear()
    location.assign('signin.html')
})

if(!localStorage.token){
    location.href = 'signin.html'
}

const tab = document.querySelector('.tab')
const tabButton = tab.querySelectorAll('button')

tabButton.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        name = e.currentTarget.attributes.name.value
        openCity(e, name)
    })
})


function openCity(evt, name) {

    // Get all elements with class="tabcontent" and hide them
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();


}
