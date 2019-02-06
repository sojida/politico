  const addDeleteFunction = () => {

    const delModal = document.getElementById("delete-modal");
    const delPartyBtn = document.querySelectorAll(".delete-party");
    const delClose = document.getElementsByClassName("del-close")[0];
    const no = document.querySelector('.no')
    const yes = document.querySelector('.yes')
    let partyId
        
    delPartyBtn.forEach((btn) => {
        btn.addEventListener('click' , (e) => {
            partyId = e.target.parentElement.attributes.key.value
            delModal.style.display = "block";
        })
    })
     
    delClose.onclick = function() {
      delModal.style.display = "none";
    }
    
    no.onclick = function() {
        delModal.style.display = "none";
      }
  
      yes.onclick = function() {
        delModal.style.display = "none";
  
        fetchFunc.deleteData(`${url}/parties/${partyId}`)
        .then((res) => {
          if (res.data){
            animateSuccess(res.message)
            document.getElementById('party-tab').click()
          }
        })
        .catch((err) => {
          console.log(err)
        })
      }
  
      animateSuccess = (message) => {
        document.getElementById('edit-success').innerHTML = message
        setTimeout(() => {
          document.getElementById('edit-success').innerHTML = ''
        }, 5000)
      }
    
      window.addEventListener('click', (event) => {
        if (event.target == delModal) {
          delModal.style.display = "none";
        }
    });
  }
  


