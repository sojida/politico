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
            tablinks[i].className = tablinks[i].className.replace("active", "");
        }
    
        // Show the current tab, and add an "active" class to the link that opened the tab
        document.getElementById(name).style.display = "block";
        evt.currentTarget.className += " active";
    }
    
    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();


        // populate office and party list for candidate
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
                    officeList.innerHTML = `<option>No Offices</option>`
                } else {
                    officeList.innerHTML = res.data.map((office) => {
                    return `<option value="${office.id}">${office.name}</option>`
                }).join(' ')
                }
            })
            .catch((err) => console.log(err))
            }
        
           

            // thisis the functionaltity for the tabs
            const addTabFunctonality = () => {
                const acc = document.getElementsByClassName("accordion");

                for (let i = 0; i < acc.length; i++) {
                  acc[i].nextElementSibling.style.display = 'block'
              
                  if (acc[i].classList.contains('hide-now')){
                    acc[i].nextElementSibling.style.display = 'none'
                  }
                  acc[i].addEventListener("click", function(e) {
                    /* Toggle between adding and removing the "active" class,
                    to highlight the button that controls the panel */
                    this.classList.toggle("acc-active");
              
                    /* Toggle between hiding and showing the active panel */
                    var panel = this.nextElementSibling;
                    if (panel.style.display === "block") {
                      panel.style.display = "none";
                    } else {
                      panel.style.display = "block";
                    }
                    
                    const officeid = e.target.attributes.key.value
                    const tableContainer = e.currentTarget.nextElementSibling
                    const table = tableContainer.getElementsByClassName('candidate-by-office')[0]
                    const noCandidate = tableContainer.getElementsByClassName('no-candidate')[0]

                    fetchFunc.getData(`${url}/candidates/${officeid}`)
                    .then((res) => {
                        if(!res.data.length){
                            noCandidate.innerHTML = '<h2 class="center">No candidate running for this office</h2>'
                        } else {
                            table.innerHTML = res.data.map((info) => {
                                return ` 
                                <tr class="interest-item" key=${info.id}>
                                <td>${info.partyname}</td>
                                <td candidateid="${info.candidate}">${info.firstname} ${info.lastname}</td>
                                <td class="vote-btn dark-btn" candidateid="${info.id}" fullname="${info.firstname} ${info.lastname}" officeid="${info.office}"><i class="fas fa-user-check"></i></td>
                            </tr>`
                            }).join(' ')
                        }
                    })
                    .then(() => {
                        const voteBtns = document.querySelectorAll('.vote-btn')
                        voteBtns.forEach((btn) => {
                            btn.addEventListener('click', (e) => {

                               const voteModal = document.getElementById('vote-modal');
                               const candidateDetals = document.getElementById('candidate-dets');
                               voteModal.style.display = "block";
                               candidateDetals.innerText = e.target.attributes.fullname.value
                               localStorage.candidateid = e.target.attributes.candidateid.value;
                               localStorage.officeid = e.target.attributes.officeid.value
                            })
                        })
                    })

                  });
                }

              }
            // vote section
            const populateVoteSection = () => {
                const voteSection = document.getElementById('vote-section-container');


                fetchFunc.getData(`${url}/offices`)
                .then((res) => {
                if(!res.data.length){
                    voteSection.innerHTML = `<option>No Offices</option>`
                } else {
                    voteSection.innerHTML = res.data.map((office) => {
                    return `<button key=${office.id} class="accordion hide-now"><span class="acc-text">${office.name}</span></button>
                            <div class="president-table panel">

                                <table>
                                    <tr>
                                        <th>Party</th>
                                        <th>Candidate</th>
                                        <th>Vote</th>
                                    </tr>
                                    <tbody class="candidate-by-office"></tbody>
                                </table>

                                <div class="no-candidate"></div>
                            </div>`
                    }).join(' ')
                }
            })
            .then(() => {
                addTabFunctonality()
            })
            .catch((err) => console.log(err))

            
            }


            populateOffice();
            populateVoteSection()





}