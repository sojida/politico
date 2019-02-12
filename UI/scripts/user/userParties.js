const parties = document.getElementsByName('party-section')[0]
const officeRun = document.getElementsByName('politician-section')[0]
const partyTable = document.querySelector('.party-info')

parties.addEventListener('click', (e) => {
    fetchFunc.getData(`${url}/parties`)
    .then((res) => {
        partyTable.innerHTML = res.data.map((party) => {
            return `<tr key=${party.id}>
                    <td>${party.name}</td>
                    <td>${party.hqaddress}</td>
                    <td>${partylogo(party.logourl)}</td>
                    </tr>
                `
        }).join(' ')
    })
    .catch(err => err);
})

const partylogo = (logoUrl) => {
   if (logoUrl === 'logo123'){
       return 'No logo'
   }

   return `<img src="${url}/images/${logoUrl}"></img>`
}

officeRun.addEventListener('click', () => {
    const officeList = document.getElementById('office-list')
    const partyList = document.getElementById('party-list')
    

    fetchFunc.getData(`${url}/parties`)
    .then((res) => {
        if(!res.data.length){
            partyList.innerHTML = `<option>No Parties</option>`
        } else {
            partyList.innerHTML = res.data.map((party) => {
            return `<option value="${party.id}" class="getParty">${party.name}</option>`
        }).join(' ')
        }

        addPartyFunctionality()
    })
    .catch((err) => console.log(err))

    fetchFunc.getData(`${url}/offices`)
    .then((res) => {
        if(!res.data.length){
            officeList.innerHTML = `<option>No Parties</option>`
        } else {
            officeList.innerHTML = res.data.map((office) => {
            return `<option value="${office.id}" class="getOffice">${office.name}</option>`
        }).join(' ')
        }

        addOfficeFunctionality()
    })
    .catch((err) => console.log(err)) 
    
})


 const addPartyFunctionality = () => {
    const partyList = document.getElementById('party-list')
        partyList.addEventListener('change', (e) => {
            const id = e.target.value
            const partyInfo = document.getElementById('party-info')

            fetchFunc.getData(`${url}/parties/${id}`)
            .then((res) => {
                partyInfo.innerHTML = res.data.map((party) => {
                    return `
                    <tr>
                        <th>Party Name</th>
                        <th>HQ</th>
                        <th>Party Logo</th>
                    </tr>
                    <tr key=${party.id}>
                        <td>${party.name}</td>
                        <td>${party.hqaddress}</td>
                        <td>${partylogo(party.logourl)}</td>
                    </tr>`
                })
            })

    })
    
 }

 const addOfficeFunctionality = () => {
    const officeList = document.getElementById('office-list')
        officeList.addEventListener('change', (e) => {
            const id = e.target.value
            const officeInfo = document.getElementById('office-info')

            fetchFunc.getData(`${url}/offices/${id}`)
            .then((res) => {
                officeInfo.innerHTML = res.data.map((office) => {
                    return `
                    <tr>
                        <th>Office</th>
                        <th>Type</th>
                    </tr>
                    <tr class="office-item" key=${office.id}>
                        <td>${office.name}</td>
                        <td>${office.type}</td>
                    </tr>`
                })
            })

    })
    
 }


const runForm = document.getElementById('run-form')
const runFormData = document.forms.namedItem('runForm')

runForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.user)
    const officeId = document.getElementById('office-list').value
    const partyId = document.getElementById('party-list').value
    const errMsg = document.getElementById('run-err')
    const successMsg = document.getElementById('run-msg')
    const data = {
        office: parseFloat(officeId),
        party: parseFloat(partyId)
    }

    const postData = (url = '', data = {}) => {
        return fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "content-type": "Application/json",
                "Authorization": localStorage.token,
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err =>  err)
    }
    const clearMsg = () => {
        errMsg.innerText = ''
        successMsg.innerText = ''
    }


    postData(`${url}/interest/${user.id}/register`, data)
    .then((res) => {
        if(res.error){
            errMsg.innerText = res.error
            setTimeout(clearMsg, 5000)
        }

        if(res.message){
            successMsg.innerText = res.message
            setTimeout(clearMsg, 5000)
        }
    })
    .catch((err) => {
        console.log(err)
    })
})

const handleProfilePic = (img) => {
    if(img == 'null') {
        return './images/avatar.png'
    } 

    if (img == 'logourl'){
        return './images/avatar.png'
    }

    return `${url}/images/${img}`
   
}

const userCard = document.getElementsByClassName('card')[0]
const updateUserCard = () => {
    const userDetails = JSON.parse(localStorage.user)

    userCard.innerHTML = `
    <div class="img-container">   
        <img id="userPic" src="${handleProfilePic(userDetails.passporturl)}" alt="Avatar">
    </div>
    <div class="card-container">
        <h4><b>${userDetails.firstname} ${userDetails.lastname}</b></h4> 
        <p>${userDetails.phonenumber}</p> 
        <p>${userDetails.email}</p> 
        <form enctype="multipart/form-data" name="userProfileForm" id="user-pic-form">
        <p>Change Proile Picture:</p>
        <label for="file-upload" class="custom-file-upload">
            <i class="fa fa-upload"></i> Upload
        </label>
        <input type="file" id="file-upload" name="passporturl" oninput="uploadMyPic()">
        </form>
    </div>
`
}
updateUserCard()

const uploadBtn = document.getElementById('file-upload')
const profilePic = document.forms.namedItem('userProfileForm')
const userPicForm = document.getElementById('user-pic-form')
const uploadMsg = document.getElementById('upld-msg')
const uploadErr = document.getElementById('upld-err')
const signLoad = document.getElementById('sign-load');

const clearUploadMsg = () => {
    uploadMsg.innerText = ''
    uploadErr.innerText = ''
}


const loader = (element) => {
    element.classList.add('loader2')   
}

const removeLoader = (element) => {
    element.classList.remove('loader2')  
}

const uploadMyPic = () => {
    loader(signLoad)

    const data = new FormData(profilePic)
   
    fetchFunc.postData(`${url}/profile_pic`, data)
    .then((res) => {
        if(res.data) {
            removeLoader(signLoad)
            delete res.data[0].password
            localStorage.user = JSON.stringify(res.data[0])
            uploadMsg.innerText = res.message
            updateUserCard()
            setTimeout(clearUploadMsg, 5000)
        }

        if(typeof res.error === 'object'){
            removeLoader(signLoad)
            handleObjErr(res.error)
        }

        if(typeof res.err === 'string'){
            removeLoader(signLoad)
            handleStringErr(res.error)
        }
        
    })
    .catch((err) => {
        console.log(err)
    })
    
    
}

const handleObjErr = (err) => {
    if(err[0].passporturl){
        uploadErr.innerText = err[0].passporturl
    }
    setTimeout(() => {
        uploadErr.innerText = ''
    }, 5000)
}

const handleStringErr = (err) => {
    uploadErr.innerText = err
    setTimeout(() => {
        uploadErr.innerText = ''
    }, 5000)
}


const profileSection = document.getElementById('user-section')
const userInfo = document.getElementById('user-votes-info');
const noVotes = document.getElementById('no-votes')

profileSection.addEventListener('click', (e) => {
    

    fetchFunc.getData(`${url}/user_votes`)
    .then((res) => {
        if(!res.data.length){
            userInfo.innerHTML = ''
            noVotes.innerHTML = '<h2>You have not voted yet</h2>'
        } else if (res.data.length) {
            noVotes.innerHTML = ''
            userInfo.innerHTML = res.data.map((info, index) => {
                return `
                <tr>
                    <td>${index+1}</td>
                    <td>${info.officename}</td>
                    <td>${info.partyname}</td>
                    <td>${info.firstname} ${info.lastname}</td>
                </tr>`
            }).join(' ')
        }
    })
});