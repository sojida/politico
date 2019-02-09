const voteModal = document.getElementById('vote-modal');
const voteBtn = document.querySelectorAll(".vote");
const exit = document.querySelector(".exit");
const noExit = document.querySelector('.no-exit')
const span = document.getElementsByClassName("close")[0];
const voteErr = document.getElementById('vote-err')
const voteMsg = document.getElementById('vote-msg')

voteBtn.forEach((btn) => {
    btn.addEventListener('click' , () => {
        voteModal.style.display = "block";
    })
})
 
span.onclick = function() {
  voteModal.style.display = "none";
}

exit.onclick = function() {
    voteModal.style.display = "none";
  }

noExit.onclick = function() {
  const candidateid = localStorage.candidateid
  const officeid = localStorage.officeid

  const data = {
    office: parseFloat(officeid),
    candidate: parseFloat(candidateid)
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
      voteErr.innerText = ''
      voteMsg.innerText = ''
  }

    postData(`${url}/votes`, data)
    .then((res) => {
        if(res.error){
            voteModal.style.display = "none";
            voteErr.innerText = res.error
            setTimeout(clearMsg, 5000)
        }

        if(res.message){
            voteModal.style.display = "none";
            voteMsg.innerText = res.message
            setTimeout(clearMsg, 5000)
        }
    })
    .catch((err) => {
        console.log(err)
    })
}

window.onclick = function(event) {
  if (event.target == voteModal) {
    voteModal.style.display = "none";
  }
}