const urlParams = new URLSearchParams(location.search)
localStorage.token = urlParams.get('reset')
localStorage.pass = 'success'

    

const resetForm = document.getElementById('password-reset-form')
const resetFormData = document.forms.namedItem('resetForm')
const emailErr = document.getElementById('email-err')
const goodMsg = document.getElementById('email-msg')

resetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(resetFormData);

    fetchFunc.postData(`${url}/auth/new_password`, data)
    .then((res) => {
        if (typeof res.error === 'object'){
            handleObjErr(res.error)
        } else if (typeof res.error === 'string') {
            handleStringErr(res.error)
        }

        console.log(res)
        if (res.message) {
            handleSuccessMessage(res.message)       
        }
    })
    .catch((err) => {
        console.log(err)
    })

})

const handleObjErr = (err) => {
    if(err[0].password){
        emailErr.innerText = err[0].password
    }

    if(err[0].password2){
        emailErr.innerText = err[0].password2
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
    setTimeout(() => {
        location.assign('signin.html')
    }, 2000);
}


