/**
* Contact form submission via Formspree (https://formspree.io)
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      let action = form.getAttribute('action');
      if (!action) {
        displayError(form, 'The form action property is not set!');
        return;
      }

      form.querySelector('.loading').classList.add('d-block');
      form.querySelector('.error-message').classList.remove('d-block');
      form.querySelector('.sent-message').classList.remove('d-block');

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          form.querySelector('.loading').classList.remove('d-block');
          if (response.ok) {
            form.querySelector('.sent-message').classList.add('d-block');
            form.reset();
          } else {
            response.json().then(function (data) {
              let message = (data && data.errors)
                ? data.errors.map(function (e) { return e.message; }).join(', ')
                : 'Oops! Something went wrong while submitting the form.';
              displayError(form, message);
            }).catch(function () {
              displayError(form, 'Oops! Something went wrong while submitting the form.');
            });
          }
        })
        .catch(function () {
          form.querySelector('.loading').classList.remove('d-block');
          displayError(form, 'Oops! Something went wrong while submitting the form.');
        });
    });
  });

  function displayError(form, error) {
    form.querySelector('.error-message').textContent = error;
    form.querySelector('.error-message').classList.add('d-block');
  }

})();
