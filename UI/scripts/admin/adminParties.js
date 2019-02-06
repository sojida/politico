const parties = document.getElementsByName('party-section')[0]
const partyTable = document.querySelector('.party-edit-info')
const partyForm = document.getElementById('party-form')
const partyFormData = document.forms.namedItem('partyForm')
const inputValues = partyForm.querySelectorAll('input')
const goToParty = document.getElementById('goToParty');
const goToOffice = document.getElementById('goToOffice');

goToParty.addEventListener('click', () => {
  document.getElementById('party-tab').click()
})

goToOffice.addEventListener('click', () => {
  document.getElementById('office-tab').click()
})


// create party
partyForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const data = new FormData(partyFormData);

    fetchFunc.postData(`${url}/parties`, data)
    .then((res) => {
        if (typeof res.error === 'object'){
            removeErr(inputValues);
            showErr(res.error);
        } else if (typeof res.error === 'string') {
            removeErr(inputValues);
            showTextErr(res.error)
        }

        if (res.data) {
            document.getElementById('party-tab').click()
            showSuccess(res.message)
        }    
    })
    .catch(err => console.log(err))
    
    return false;
})

// get all parties
document.getElementById('party-tab').addEventListener('click', () => {

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
                    <td class="edit-party"><i class="fas fa-pen"></i></td>
                    <td class="delete-party" key=${party.id}><i class="fas fa-trash"></i></td>
                    </tr>
                `
        }).join(' ')
        }
    })
    .then(() => {
        setTimeout(() => {
            addDeleteFunction()
            addEditFunction()
        }, 500)
    })
    .catch(err => err);
})

const partylogo = (logoUrl) => {
    if (logoUrl === 'logo123'){
        return 'No logo'
    }
    return `<img src="${url}/images/${logoUrl}"></img>`
 }


const removeErr = (inputs) => {
    inputs.forEach((item) => {
        item.previousElementSibling.innerText = '';
        item.style.border = '2px solid green';
    })
}

const showErr = (error) => {
    for (let i = 0; i < error.length; i++) {
        for(let key of Object.values(inputValues)) {
            if (error[i][key.name]){
                key.previousElementSibling.innerText = error[i][key.name];
                key.style.border = '2px solid red';
            }          
        }
    }
   
}

const showTextErr = (error) => {
    errModal.style.display = 'block';
    errmsg.innerHTML = error
}

const showSuccess = (msg) => {
    successModal.style.display = 'block';
    sccmsg.innerHTML = msg
}




