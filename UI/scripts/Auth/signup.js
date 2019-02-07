const signupForm = document.getElementById('sign-up-form');
const signupFormData = document.forms.namedItem('signupForm');
const inputValues = document.querySelectorAll('form input');
const signErr = document.getElementById('sign-err');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(signupFormData);

    fetchFunc.postData(`${url}/auth/signup`, data)
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
            window.location.assign('user.html')
            
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
    signErr.innerText = error
    setTimeout(() => {
        signErr.innerText = ''
    }, 5000)
}
    