setTimeout(() => {
  const modal = document.getElementById('edit-modal');
  const editPartyBtn = document.querySelectorAll(".edit-party");
  const editClose = document.getElementsByClassName("edit-close")[0];
  
  editPartyBtn.forEach((btn) => {
      btn.addEventListener('click' , () => {
          modal.style.display = "block";
      })
  })
   
  editClose.onclick = function() {
    modal.style.display = "none";
  }
  
  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }) 
}, 2000)
