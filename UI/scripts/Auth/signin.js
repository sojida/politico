const signinForm = document.getElementById('sign-in-form')
const signinFormData = document.forms.namedItem('signinForm')
const inputValues = document.querySelectorAll('form input')


signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(signinFormData);

    fetchFunc.postData(`${url}/auth/login`, data)
    .then((res) => {
        if (typeof res.error === 'object'){
            removeErr(inputValues);
            showErr(res.error);
        } else if (typeof res.error === 'string') {
            removeErr(inputValues);
            showTextErr(res.error)
        }

        if (res.data) {
            localStorage.setItem('token', res.data[0].token)
            localStorage.setItem('user', JSON.stringify(res.data[0].user))
            if (res.data[0].user.isadmin) {
                window.location.assign('admin.html')
            } else {
                window.location.assign('user.html')
            }
            
        }
    })
    .catch((err) => {
        console.log(err)
    })

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

