"use strict";

function setupContact() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const fieldset = form.querySelector("fieldset");
  const department = document.getElementById("department");
  const status = document.getElementById("contact-status");
  const help = document.getElementById("contact-help");
  const submit = document.getElementById("contact-submit");
  const fields = ["contact-name", "contact-email", "contact-subject", "contact-message"]
    .map((id) => document.getElementById(id));
  const config = typeof contactConfig === "undefined" ? {} : contactConfig;
  const departments = {
    "financial-aid": "Financial Aid",
    "writing-center": "Writing Center",
  };
  const deliveryReady = config.enabled === true && config.publicKey && config.serviceId
    && Object.keys(departments).every((id) => config.templateIds?.[id]);
  let sending = false;

  // Keep messages modest in length and reject whitespace-only required fields.
  [100, 254, 150, 2000].forEach((limit, index) => fields[index].maxLength = limit);
  fields.forEach((field) => field.addEventListener("input", () => field.setCustomValidity("")));
  function resetStatus() {
    status.textContent = deliveryReady
      ? "Your message will be sent through EmailJS when you select Send message."
      : "Demo mode: check your message here. Nothing will be sent.";
  }
  form.addEventListener("input", resetStatus);
  form.addEventListener("change", resetStatus);

  // Service links choose their department and move keyboard focus to the form.
  document.querySelectorAll("[data-contact-department]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (sending) return;
      event.preventDefault();
      department.value = link.dataset.contactDepartment;
      resetStatus();
      department.focus();
      form.scrollIntoView({ behavior: "instant", block: "start" });
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending) return;
    fields.forEach((field) => {
      field.value = field.value.trim();
      field.setCustomValidity(field.value ? "" : "Please fill out this field.");
    });
    if (!form.reportValidity()) {
      status.textContent = "Please complete all required fields and enter a valid email address.";
      return;
    }
    if (!Object.hasOwn(departments, department.value)) return;
    if (!deliveryReady) {
      status.textContent = `Your message for ${departments[department.value]} passes the form checks. Nothing was sent; delivery is not connected.`;
      return;
    }

    // EmailJS REST API: https://www.emailjs.com/docs/rest-api/send/
    // Recipients are fixed in each template, never supplied by the visitor.
    const payload = {
      service_id: config.serviceId,
      template_id: config.templateIds[department.value],
      user_id: config.publicKey,
      template_params: {
        department: departments[department.value],
        from_name: fields[0].value,
        reply_to: fields[1].value,
        subject: fields[2].value,
        message: fields[3].value,
      },
    };
    sending = true;
    const hadFocus = document.activeElement === submit;
    fieldset.disabled = true;
    form.setAttribute("aria-busy", "true");
    status.textContent = "Sending your message...";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Message request failed");
      status.textContent = "EmailJS accepted your message. This does not confirm that the department has read it.";
      form.reset();
    } catch (error) {
      // Keep the draft; do not retry automatically because delivery may have occurred.
      status.textContent = error.name === "AbortError"
        ? "The request timed out; delivery is unconfirmed. Your draft is still here. Check before trying again to avoid duplicate messages."
        : "Delivery could not be confirmed. Your draft is still here. Check your connection before trying again.";
    } finally {
      clearTimeout(timeout);
      sending = false;
      fieldset.disabled = false;
      form.setAttribute("aria-busy", "false");
      if (hadFocus && document.activeElement === document.body) submit.focus({ preventScroll: true });
    }
  });

  // Handle validation ourselves so feedback also reaches the live status message.
  form.noValidate = true;
  fieldset.disabled = false;
  if (deliveryReady) {
    submit.textContent = "Send message";
    help.textContent = "All fields are required. Your name, email address, subject, and message will be sent through EmailJS to the selected department.";
  }
  resetStatus();
}

setupContact();
