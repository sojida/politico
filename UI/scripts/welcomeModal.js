const wlcModal = document.getElementById('welcome-modal');
const wlcClose = document.getElementsByClassName("wlc-close")[0];
const wlcMsg = document.getElementById('wlc-usr')

wlcClose.onclick = function() {
    wlcModal.style.display = "none";
  }
  
window.addEventListener('click', (event) => {
    if (event.target === wlcModal) {
      wlcModal.style.display = "none";
    }
}) 