const contactForm = document.getElementById("contact-form");
const SenderName = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const Msg = document.getElementById("msg");
const SubmitBtn = document.getElementById("contact-form-btn");
// Get the modal
const modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

contactForm.addEventListener("submit", function(e){
  e.preventDefault();
  if (!email.value) {
    modal.classList.add("open");
    setTimeout(() => modal.classList.remove("open"), 2500);
    return Msg.innerHTML = "Please enter your email address";
  };
  if (!validateEmail(email.value)) {
    modal.classList.add("open");
    setTimeout(() => modal.classList.remove("open"), 2500);
    return Msg.innerHTML = "Please enter a valid email address";
  };
  
  SubmitBtn.innerHTML = "Sending.....";
  SubmitBtn.setAttribute("disabled", true);

  axios.post("/contact/message", {
    email: email.value,
    name: SenderName.value,
    message: message.value,
  })
  .then((res) => {
    modal.classList.add("open");
    // console.log("data",res);
    setTimeout(() => modal.classList.remove("open"), 2500);
    SubmitBtn.removeAttribute("disabled");
    SubmitBtn.innerHTML = "Submit";
    email.value = "";
    SenderName.value = "";
    message.value = "";
    return Msg.innerHTML = "Thank you, your message has been sent successfully.";
  })
  .catch((e) => {
    modal.classList.add("open");
    console.error(e);
    setTimeout(() => modal.classList.remove("open"), 2500);
    SubmitBtn.removeAttribute("disabled");
    SubmitBtn.innerHTML = "Submit";
    return Msg.innerHTML = e.response.data.error || "An error occurred please try again.";
  });
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.classList.remove("open");
  Msg.innerHTML = "";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.remove("open");
    Msg.innerHTML = "";
  }
}
