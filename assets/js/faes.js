var email;
var message;
var name;
var errorLabel;

$(document).ready(function() {
    email = document.getElementById("email");
    message = document.getElementById("message");
    name = document.getElementById("name");

    errorLabel = $('#notifications');
    var contactForm = $('#faes-contact');
    contactForm.submit(sendEmail);
});

function sendEmail(e){
  e.preventDefault();
  var form =$(e.currentTarget);
  errorLabel.text("");

  var formData = form.serialize();
  $.ajax({
    type: 'POST',
    url: form.attr('action'),
    context: this,
    data: formData
  })
  .done(sendEmailSuccess)
  .fail(sendEmailError);
}


function sendEmailError (data) {
    // Make sure that the formMessages div has the 'error' class.
    notifications.removeClass('success')
      .addClass('error')
      .text(data.responseText !== '' ? data.responseText !== '' : "Hubo un error al enviar el mensaje, intentalo mas tarde" );
}

function sendEmailSuccess (response) {
    // Make sure that the formMessages div has the 'success' class.
    notifications.removeClass('error')
      .addClass('success').text(response);

    // Clear the form.
    $('#name').val('');
    $('#email').val('');
    $('#message').val('');
}
