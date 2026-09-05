(function(){
  "use strict";

  var form = document.getElementById("contactForm");
  if (!form) return;

  var formStatus = document.getElementById("formStatus");
  var formSuccess = document.getElementById("formSuccess");
  var sendAnother = document.getElementById("sendAnother");

  /* ---------- Service-aware prefill from ?service= param ---------- */
  var SERVICE_ID_MAP = {
    "logo-brand": "logo-brand",
    "vector-tracing": "vector-tracing",
    "print-ready": "print-ready",
    "social-media": "social-media",
    "product-promo": "product-promo",
    "custom": "custom"
  };

  function prefillFromQuery(){
    var params = new URLSearchParams(window.location.search);
    var serviceId = params.get("service");
    if (!serviceId) return;
    var select = document.getElementById("fieldProjectType");
    if (!select) return;
    var mapped = SERVICE_ID_MAP[serviceId];
    if (mapped){
      var optionExists = Array.prototype.some.call(select.options, function(opt){
        return opt.value === mapped;
      });
      if (optionExists) select.value = mapped;
    }
  }
  prefillFromQuery();

  /* ---------- Validation ---------- */
  var fields = {
    name: {
      input: document.getElementById("fieldName"),
      error: document.getElementById("errorName"),
      validate: function(v){ return v.trim().length > 0; }
    },
    email: {
      input: document.getElementById("fieldEmail"),
      error: document.getElementById("errorEmail"),
      validate: function(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }
    },
    projectType: {
      input: document.getElementById("fieldProjectType"),
      error: document.getElementById("errorProjectType"),
      validate: function(v){ return v.trim().length > 0; }
    },
    details: {
      input: document.getElementById("fieldDetails"),
      error: document.getElementById("errorDetails"),
      validate: function(v){ return v.trim().length > 0; }
    }
  };

  function setFieldError(field, show){
    field.input.setAttribute("aria-invalid", show ? "true" : "false");
    field.error.hidden = !show;
  }

  function validateField(key){
    var field = fields[key];
    var valid = field.validate(field.input.value);
    setFieldError(field, !valid);
    return valid;
  }

  Object.keys(fields).forEach(function(key){
    var field = fields[key];
    var evt = (field.input.tagName === "SELECT") ? "change" : "blur";
    field.input.addEventListener(evt, function(){ validateField(key); });
    field.input.addEventListener("input", function(){
      if (field.input.getAttribute("aria-invalid") === "true") validateField(key);
    });
  });

  /* ---------- Submit handling ---------- */
  form.addEventListener("submit", function(e){
    e.preventDefault();

    var allValid = Object.keys(fields).every(function(key){
      return validateField(key);
    });

    if (!allValid){
      var firstInvalid = Object.keys(fields)
        .map(function(key){ return fields[key]; })
        .find(function(field){ return field.input.getAttribute("aria-invalid") === "true"; });
      if (firstInvalid) firstInvalid.input.focus();
      return;
    }

    var endpoint = form.getAttribute("data-endpoint");

    if (!endpoint){
      /*
       * No backend/email-service endpoint is configured yet.
       * The form is fully validated and ready to submit, but we do not
       * pretend a message was sent when nothing is actually wired up.
       * Once a real endpoint (Formspree, Netlify Forms, custom API, etc.)
       * is set up, set data-endpoint="<url>" on #contactForm and replace
       * this branch with an actual fetch() POST, then show formSuccess
       * only after a confirmed successful response.
       */
      formStatus.hidden = false;
      formStatus.textContent = "This form isn't connected to an email service yet. Once it is, submitting will send your inquiry straight through — for now, please reach out directly using the email address on this page.";
      formStatus.classList.add("is-notice");
      return;
    }

    // Placeholder for real integration:
    // fetch(endpoint, { method: "POST", body: new FormData(form) })
    //   .then(function(res){ if (res.ok) showSuccess(); else showError(); })
    //   .catch(showError);
  });

  function showSuccess(){
    form.hidden = true;
    formSuccess.hidden = false;
  }

  if (sendAnother){
    sendAnother.addEventListener("click", function(){
      form.reset();
      form.hidden = false;
      formSuccess.hidden = true;
      formStatus.hidden = true;
      Object.keys(fields).forEach(function(key){ setFieldError(fields[key], false); });
      fields.name.input.focus();
    });
  }

})();
