const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const fullName = document.getElementById('full-name').value;
  const email = document.getElementById('email').value;
  const mobileNumber = document.getElementById('mobile-number').value;
  const message = document.getElementById('message').value;

  emailjs.send("service_aq0zh22", "template_02t7j2n", {
    "full-name": fullName,
    "email": email,
    "mobile-number": mobileNumber,
    message: message
  })
  .then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
    alert('Message sent successfully!');
  }, function(error) {
    console.log('FAILED...', error);
    alert('Message sending failed.');
  });
});