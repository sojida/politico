const emailForm = document.getElementById('email-reset-form')
const emailFormData = document.forms.namedItem('emailForm')
const emailErr = document.getElementById('email-err')
const goodMsg = document.getElementById('email-msg')

emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(emailFormData);

    fetchFunc.postData(`${url}/auth/reset`, data)
    .then((res) => {
        if (typeof res.error === 'object'){
            handleObjErr(res.error)
        } else if (typeof res.error === 'string') {
            handleStringErr(res.error)
        }

        if (res.data) {
            handleSuccessMessage(res.data[0].message)          
        }
    })
    .catch((err) => {
        console.log(err)
    })

})

const handleObjErr = (err) => {
    if(err[0].email){
        emailErr.innerText = err[0].email
    }
    setTimeout(() => {
        emailErr.innerText = ''
    }, 5000)
}

const handleStringErr = (err) => {
    emailErr.innerText = err
    setTimeout(() => {
        emailErr.innerText = ''
    }, 5000)
}

const handleSuccessMessage = (message) => {
    goodMsg.innerText = message
}




