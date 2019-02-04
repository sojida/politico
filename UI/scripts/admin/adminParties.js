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




