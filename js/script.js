"use strict";

// Expand or hide event details without navigating away from the Home page.
// Querying an empty list also lets this shared file run on Dining and Support.
const detailButtons = document.querySelectorAll("[data-details-toggle]");

detailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const details = document.getElementById(button.getAttribute("aria-controls"));
    if (!details) return;

    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    details.hidden = isExpanded;
    button.textContent = isExpanded ? "View details" : "Hide details";
  });
});

// Guard the unfinished contact form against accidental submission or reloads.
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}
