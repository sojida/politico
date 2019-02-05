const voteModal = document.getElementById('vote-modal');
const voteBtn = document.querySelectorAll(".vote");
const exit = document.querySelector(".exit");
const noExit = document.querySelector('.no-exit')
const span = document.getElementsByClassName("close")[0];

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
  voteModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == voteModal) {
    voteModal.style.display = "none";
  }
}