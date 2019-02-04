setTimeout(() => {
  const modal = document.getElementById('edit-modal');
  const editPartyBtn = document.querySelectorAll(".edit-party");
  const editClose = document.getElementsByClassName("edit-close")[0];
  const partyItem = document.querySelectorAll('.editPartyName');
  let oldPartyName

  partyItem.forEach((partyName) => {
    partyName.addEventListener('focus', (e) => {
      oldPartyName = e.target.innerHTML
    });
  });

  
  partyItem.forEach((partyName) => {
    partyName.addEventListener('blur', (e) => {
      const id = e.target.parentElement.attributes.key.value
      const newPartyName = e.target.innerText
      const data = { name: newPartyName }
      data.name = data.name.trim()
      fetchFunc.patchData(`${url}/parties/${id}/name`, data)
      .then((res) => {
        if(res.error){
          animateError(res.error, e.target, oldPartyName)
        }

        if(res.data){
          animateSuccess(res.message)
        }
      })
      .catch((err) => {console.log(err)})

    })

  })

  animateError = (error, element, oldname) => {
    document.getElementById('edit-error').innerHTML = error
    element.innerHTML = oldname
    setTimeout(() => {
      document.getElementById('edit-error').innerHTML = ''
    }, 5000)
  }

  animateSuccess = (message) => {
    document.getElementById('edit-success').innerHTML = `${oldPartyName}: ${message}`
    setTimeout(() => {
      document.getElementById('edit-success').innerHTML = ''
    }, 5000)
  }
  
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
