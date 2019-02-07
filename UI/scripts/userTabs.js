window.onload = () => {
    const logout = document.getElementById('logOut');
    const tab = document.querySelector('.tab')
    const tabButton = tab.querySelectorAll('button')

    logout.addEventListener('click', () => {
        localStorage.clear()
        location.assign('signin.html')
    })
    
    if(!localStorage.token){
        location.href = 'signin.html'
    } 
    
    
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


        // run for candidate
        const populateOffice = () => {
            const officeList = document.getElementById('office-list')
            const partyList = document.getElementById('party-list')
            
        
            fetchFunc.getData(`${url}/parties`)
            .then((res) => {
                if(!res.data.length){
                    partyList.innerHTML = `<option>No Parties</option>`
                } else {
                    partyList.innerHTML = res.data.map((party) => {
                    return `<option value="${party.id}">${party.name}</option>`
                }).join(' ')
                }
            })
            .catch((err) => console.log(err))
        
            fetchFunc.getData(`${url}/offices`)
            .then((res) => {
                if(!res.data.length){
                    officeList.innerHTML = `<option>No Parties</option>`
                } else {
                    officeList.innerHTML = res.data.map((office) => {
                    return `<option value="${office.id}">${office.name}</option>`
                }).join(' ')
                }
            })
            .catch((err) => console.log(err))
            }
        
            populateOffice();


}