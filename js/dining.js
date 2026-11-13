"use strict";

// This three-day dataset is only for demonstrating the menu browser.
// It is not fetched from a university, and it does not establish actual allergens.
function setupDiningMenu() {
  const controls = document.getElementById("menu-controls");
  if (!controls) return;

  const sampleMenus = [
    {
      breakfast: [
        { station: "Breakfast station", name: "Berry oatmeal", description: "Warm oats served with berries and a sprinkle of cinnamon." },
        { station: "Bakery station", name: "Bagel and fruit", description: "A toasted bagel with a side of sliced fruit." },
      ],
      lunch: [
        { station: "Main station", name: "Grilled chicken bowl", description: "Rice, roasted vegetables, and grilled chicken with a choice of dressing." },
        { station: "Garden station", name: "Roasted vegetable pasta", description: "Pasta tossed with seasonal vegetables and a tomato sauce." },
      ],
      dinner: [
        { station: "Main station", name: "Baked potato plate", description: "A baked potato served with steamed broccoli and toppings." },
        { station: "Soup station", name: "Bean chili", description: "A warm bowl of beans, tomatoes, and peppers with rice." },
      ],
    },
    {
      breakfast: [
        { station: "Breakfast station", name: "Scrambled egg plate", description: "Scrambled eggs with breakfast potatoes and toast." },
        { station: "Garden station", name: "Yogurt and granola", description: "Yogurt served with granola and sliced banana." },
      ],
      lunch: [
        { station: "Sandwich station", name: "Turkey sandwich", description: "Sliced turkey, lettuce, and tomato on whole-grain bread." },
        { station: "Soup station", name: "Tomato soup", description: "Tomato soup with a bread roll and a side salad." },
      ],
      dinner: [
        { station: "Main station", name: "Chicken fajitas", description: "Chicken, peppers, and onions served with tortillas." },
        { station: "Garden station", name: "Chickpea rice bowl", description: "Chickpeas and roasted vegetables served over rice." },
      ],
    },
    {
      breakfast: [
        { station: "Breakfast station", name: "Pancakes and fruit", description: "Pancakes with a fruit topping and syrup on the side." },
        { station: "Bakery station", name: "Toast and peanut butter", description: "Whole-grain toast with peanut butter and apple slices." },
      ],
      lunch: [
        { station: "Main station", name: "Pasta with meat sauce", description: "Pasta with a tomato and beef sauce and a side of vegetables." },
        { station: "Garden station", name: "Hummus wrap", description: "A wrap filled with hummus, cucumber, carrots, and lettuce." },
      ],
      dinner: [
        { station: "Main station", name: "Roast chicken plate", description: "Roast chicken served with mashed potatoes and green beans." },
        { station: "Garden station", name: "Vegetable stir-fry", description: "Mixed vegetables and tofu served with rice." },
      ],
    },
  ];

  const dateInput = document.getElementById("menu-date");
  const mealSelect = document.getElementById("menu-meal");
  const search = document.getElementById("menu-search");
  const results = document.getElementById("menu-results");
  const selection = document.getElementById("menu-selection");
  const status = document.getElementById("menu-status");
  const emptyMessage = document.getElementById("menu-empty");
  const clearButton = document.getElementById("menu-clear");
  const template = document.getElementById("menu-item-template");

  // Use local calendar dates rather than UTC so dates do not shift overnight.
  function dateKey(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
  }

  const today = new Date();
  const dates = sampleMenus.map((menu, offset) => {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
    return { key: dateKey(date), label: date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }), menu };
  });
  dateInput.min = dates[0].key;
  dateInput.max = dates[dates.length - 1].key;
  dateInput.value = dates[0].key;

  function renderMenu() {
    const selectedDate = dates.find((date) => date.key === dateInput.value);
    const meal = mealSelect.value;
    const mealLabel = mealSelect.options[mealSelect.selectedIndex].textContent;
    const items = selectedDate ? selectedDate.menu[meal] : [];
    const words = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const matches = items.filter((item) => {
      const text = `${item.name} ${item.description} ${item.station}`.toLowerCase();
      return words.every((word) => text.includes(word));
    });

    results.replaceChildren();
    matches.forEach((item) => {
      const card = template.content.cloneNode(true);
      card.querySelector(".category-label").textContent = item.station;
      card.querySelector("h3").textContent = item.name;
      card.querySelector(".card-body p").textContent = item.description;
      results.appendChild(card);
    });

    selection.textContent = selectedDate ? `Sample ${mealLabel.toLowerCase()} / ${selectedDate.label}` : "Choose a sample date";
    status.textContent = selectedDate ? `Showing ${matches.length} of ${items.length} sample menu items for ${mealLabel.toLowerCase()}.` : "No sample menu is available for this date.";
    emptyMessage.textContent = selectedDate ? "No menu items match your search. Try another word or choose Clear search." : "Choose a date between today and the next two days to see example meals.";
    emptyMessage.hidden = matches.length !== 0;
  }

  dateInput.addEventListener("change", renderMenu);
  mealSelect.addEventListener("change", renderMenu);
  search.addEventListener("input", renderMenu);
  controls.addEventListener("submit", (event) => {
    event.preventDefault();
    renderMenu();
  });
  // Keep the selected date and meal when clearing only the search query.
  clearButton.addEventListener("click", () => {
    search.value = "";
    renderMenu();
    search.focus();
  });

  renderMenu();
  status.hidden = false;
  controls.hidden = false;
}

setupDiningMenu();
