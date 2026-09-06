(function(){
  "use strict";

  var form = document.getElementById("contactForm");
  if (!form) return;

  var formStatus = document.getElementById("formStatus");
  var formSuccess = document.getElementById("formSuccess");
  var sendAnother = document.getElementById("sendAnother");
  var submitBtn = form.querySelector(".form-submit");
  var submitLabel = submitBtn ? submitBtn.textContent : "";
  var isSending = false;

  /* ---------- Readable labels for the email body ---------- */
  /* The <select> values are machine ids; the email should read in plain
     English, so map each id to the label the visitor actually chose. */
  function optionLabel(selectId, value){
    var select = document.getElementById(selectId);
    if (!select) return value;
    var match = Array.prototype.find.call(select.options, function(opt){
      return opt.value === value;
    });
    return match ? match.textContent.trim() : value;
  }

  /* ---------- Service-aware prefill from ?service= param ---------- */
  function prefillFromQuery(){
    var serviceId = new URLSearchParams(window.location.search).get("service");
    if (!serviceId) return;
    var select = document.getElementById("fieldProjectType");
    if (!select) return;
    var optionExists = Array.prototype.some.call(select.options, function(opt){
      return opt.value === serviceId;
    });
    if (optionExists) select.value = serviceId;
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

  /* ---------- Status messaging ---------- */
  function showStatus(message, isError){
    formStatus.hidden = false;
    formStatus.textContent = message;
    formStatus.classList.toggle("is-error", !!isError);
  }

  function clearStatus(){
    formStatus.hidden = true;
    formStatus.textContent = "";
    formStatus.classList.remove("is-error");
  }

  function setSending(sending){
    isSending = sending;
    if (!submitBtn) return;
    submitBtn.disabled = sending;
    submitBtn.setAttribute("aria-busy", sending ? "true" : "false");
    submitBtn.textContent = sending ? "Sending…" : submitLabel;
  }

  function showSuccess(){
    form.hidden = true;
    formSuccess.hidden = false;
    formSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* ---------- Payload ---------- */
  /* FormSubmit turns each key into a labelled row in the email it sends, and
     treats keys starting with "_" as settings rather than content. */
  function buildPayload(){
    var name = fields.name.input.value.trim();
    var email = fields.email.input.value.trim();
    var budgetEl = document.getElementById("fieldBudget");
    var budget = budgetEl ? budgetEl.value : "";

    return {
      _subject: "New Project Inquiry — " + name,
      _template: "table",
      _captcha: "false",
      _honey: (document.getElementById("fieldHoney") || {}).value || "",
      Name: name,
      Email: email,
      "Project Type": optionLabel("fieldProjectType", fields.projectType.input.value),
      Budget: budget ? optionLabel("fieldBudget", budget) : "Not specified",
      "Project Details": fields.details.input.value.trim(),
      "Submitted From": window.location.href
    };
  }

  /* ---------- Submit ---------- */
  form.addEventListener("submit", function(e){
    e.preventDefault();

    // Guard against double-submits from a second click or an Enter keypress
    // while the first request is still in flight.
    if (isSending) return;

    // map, not every: every() short-circuits, which would flag only the first
    // bad field. Validate all of them so every error surfaces at once.
    var results = Object.keys(fields).map(validateField);
    var allValid = results.every(Boolean);

    if (!allValid){
      var firstInvalid = Object.keys(fields)
        .map(function(key){ return fields[key]; })
        .find(function(field){ return field.input.getAttribute("aria-invalid") === "true"; });
      if (firstInvalid) firstInvalid.input.focus();
      showStatus("Please fix the highlighted fields and try again.", true);
      return;
    }

    var endpoint = form.getAttribute("data-endpoint");
    if (!endpoint){
      showStatus(
        "This form isn't configured with a delivery endpoint yet. Please email me directly using the address on this page.",
        true
      );
      return;
    }

    clearStatus();
    setSending(true);

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(buildPayload())
    })
      .then(function(res){
        return res.json()
          .catch(function(){ return {}; })   // non-JSON body (e.g. a gateway error page)
          .then(function(data){ return { ok: res.ok, data: data }; });
      })
      .then(function(result){
        // FormSubmit returns success as the string "true", not a boolean.
        var accepted = result.ok && String(result.data.success) === "true";
        if (accepted){
          setSending(false);
          showSuccess();
          return;
        }
        setSending(false);
        showStatus(
          result.data.message ||
          "Something went wrong sending your inquiry. Please try again, or email me directly at haroonmughalgfx@gmail.com.",
          true
        );
      })
      .catch(function(){
        // Network failure, offline, or a blocked request.
        setSending(false);
        showStatus(
          "Your inquiry couldn't be sent — please check your connection and try again, or email me directly at haroonmughalgfx@gmail.com.",
          true
        );
      });
  });

  if (sendAnother){
    sendAnother.addEventListener("click", function(){
      form.reset();
      prefillFromQuery();
      form.hidden = false;
      formSuccess.hidden = true;
      clearStatus();
      setSending(false);
      Object.keys(fields).forEach(function(key){ setFieldError(fields[key], false); });
      fields.name.input.focus();
    });
  }

})();
