const errModal = document.getElementById('error-modal');
const errClose = document.getElementsByClassName("err-close")[0];
const errmsg = document.getElementById('err-msg')

errClose.onclick = function() {
    errModal.style.display = "none";
  }
  
  window.addEventListener('click', (event) => {
    if (event.target === errModal) {
      errModal.style.display = "none";
    }
  }) 