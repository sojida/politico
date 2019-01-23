const delModal = document.getElementById("delete-modal");
const delPartyBtn = document.querySelectorAll(".delete-party");
const span = document.getElementsByClassName("close")[0];
const no = document.querySelector('.no')


delPartyBtn.forEach((btn) => {
    btn.addEventListener('click' , () => {
        delModal.style.display = "block";
    })
})
 
span.onclick = function() {
  delModal.style.display = "none";
}

no.onclick = function() {
    delModal.style.display = "none";
  }

window.onclick = function(event) {
  if (event.target == delModal) {
    delModal.style.display = "none";
  }
}