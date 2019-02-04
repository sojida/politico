const errModal = document.getElementById('error-modal');
const successModal = document.getElementById('success-modal')
const errClose = document.getElementsByClassName("err-close")[0];
const sccClose = document.getElementsByClassName("scc-close")[0];
const errmsg = document.getElementById('err-msg')
const sccmsg = document.getElementById('scc-msg')

errClose.onclick = function() {
    errModal.style.display = "none";
  }
  
  window.addEventListener('click', (event) => {
    if (event.target === errModal) {
      errModal.style.display = "none";
    }
  }) 

  sccClose.onclick = function() {
    successModal.style.display = "none";
  }
  
  window.addEventListener('click', (event) => {
    if (event.target === successModal) {
      successModal.style.display = "none";
    }
  }) 