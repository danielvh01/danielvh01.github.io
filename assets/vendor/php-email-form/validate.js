/**
* PHP Email Form Validation - v3.2
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
* Modified for Formspree.io integration
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!')
        return;
      }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );

      submitForm(thisForm, action, formData);
    });
  });

  function submitForm(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if( response.ok ) {
        return response.json()
      } else {
        return response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
                throw new Error(data["errors"].map(error => error["message"]).join(", "))
            } else {
                throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
            }
        })
      }
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      // Formspree returns ok: true
      if (data.ok) {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      } else {
        throw new Error(data ? 'Form submission failed.' : 'Form submission failed and no error message returned from: ' + action); 
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
