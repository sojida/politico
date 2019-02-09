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
    document.getElementById("party-tab").click();

    // Parties
const partyTable = document.querySelector('.party-edit-info')

    fetchFunc.getData(`${url}/parties`)
    .then((res) => {
        if(!res.data.length){
            partyTable.innerHTML = `<h1>No Parties</h1>`
        } else {
            partyTable.innerHTML = res.data.map((party) => {
            return `<tr class="party-item" key=${party.id}>
                    <td  contenteditable="true" class="editPartyName">${party.name}</td>
                    <td>${party.hqaddress}</td>
                    <td class="party-logo">${partylogo(party.logourl)}</td>
                    <td class="delete-party" key=${party.id}><i class="fas fa-trash"></i></td>
                    </tr>
                `
        }).join(' ')
        }
    })
    .catch(err => err);

const partylogo = (logoUrl) => {
   if (logoUrl === 'logo123'){
       return 'No logo'
   }
   return `<img src="${url}/images/${logoUrl}"></img>`
}


// office table
const officeTable = document.querySelector('.office-info')
    fetchFunc.getData(`${url}/offices`)
    .then((res) => {
        if(!res.data.length){
            officeTable.innerHTML = `<h1>No Offices</h1>`
        } else {
            officeTable.innerHTML = res.data.map((office) => {
            return `<tr class="office-item" key=${office.id}>
                    <td>${office.name}</td>
                    <td>${office.type}</td>
                    </tr>
                `
        }).join(' ')
        }
    })
    .catch(err => err);

// populate office list
const officeList = document.getElementById('office-list')
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