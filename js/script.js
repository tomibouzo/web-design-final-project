"use strict";

// Both lists share the same controls and behavior. Cache searchable content once,
// excluding button labels and image placeholders from the search text.
function setupFilters(prefix, itemSelector, itemName) {
  const form = document.getElementById(`${prefix}-filters`);
  if (!form) return;

  const search = document.getElementById(`${prefix}-search`);
  const category = document.getElementById(`${prefix}-category`);
  const results = document.getElementById(`${prefix}-results`);
  const status = document.getElementById(`${prefix}-status`);
  const emptyMessage = document.getElementById(`${prefix}-empty`);
  const clearButton = document.getElementById(`${prefix}-clear`);
  const items = Array.from(results.querySelectorAll(itemSelector)).map((element) => ({
    element,
    category: element.dataset.category,
    text: Array.from(element.querySelectorAll("h3, .category-label, [data-searchable]"))
      .map((part) => part.textContent)
      .join(" ")
      .toLowerCase(),
  }));

  function updateResults() {
    // Every search word must match, and the category must match too.
    const words = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visibleCount = 0;

    items.forEach((item) => {
      const matchesSearch = words.every((word) => item.text.includes(word));
      const matchesCategory = category.value === "all" || item.category === category.value;
      item.element.hidden = !(matchesSearch && matchesCategory);
      if (!item.element.hidden) visibleCount += 1;
    });

    const label = items.length === 1 ? itemName : `${itemName}s`;
    status.textContent = `Showing ${visibleCount} of ${items.length} ${label}.`;
    emptyMessage.hidden = visibleCount !== 0;
  }

  search.addEventListener("input", updateResults);
  category.addEventListener("change", updateResults);
  // Enter applies the same filters without submitting or reloading the page.
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    updateResults();
  });
  clearButton.addEventListener("click", () => {
    search.value = "";
    category.value = "all";
    updateResults();
    search.focus();
  });

  // Without JavaScript, controls stay hidden and the complete lists remain visible.
  updateResults();
  status.hidden = false;
  form.hidden = false;
}

setupFilters("event", ".event-card", "event");
setupFilters("service", ".service-card", "service");

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
