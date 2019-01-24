const modal = document.getElementById('edit-modal');
const editPartyBtn = document.querySelectorAll(".edit-party");
const span = document.getElementsByClassName("close")[0];

editPartyBtn.forEach((btn) => {
    btn.addEventListener('click' , () => {
        modal.style.display = "block";
    })
})
 
span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}