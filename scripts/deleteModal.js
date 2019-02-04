setTimeout(()=>{
  console.log(fetchTime)
  const delModal = document.getElementById("delete-modal");
  const delPartyBtn = document.querySelectorAll(".delete-party");
  const delClose = document.getElementsByClassName("del-close")[0];
  const no = document.querySelector('.no')
  
  
  delPartyBtn.forEach((btn) => {
      btn.addEventListener('click' , () => {
          delModal.style.display = "block";
      })
  })
   
  delClose.onclick = function() {
    delModal.style.display = "none";
  }
  
  no.onclick = function() {
      delModal.style.display = "none";
    }
  
    window.addEventListener('click', (event) => {
      if (event.target == delModal) {
        delModal.style.display = "none";
      }
  });
}, 2000)
