"use strict";

// Only Home contains this panel. Keep weather independent of the shared filters.
function setupWeather() {
  const panel = document.getElementById("weather-panel");
  if (!panel) return;

  const details = document.getElementById("weather-details");
  const status = document.getElementById("weather-status");
  const refresh = document.getElementById("weather-refresh");
  const time = document.getElementById("weather-time");

  // Fixed Lynchburg coordinates avoid requesting the student's location.
  // Open-Meteo's free noncommercial endpoint requires no API key.
  // Docs: https://open-meteo.com/en/docs
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.search = new URLSearchParams({
    latitude: "37.41",
    longitude: "-79.18",
    current: "temperature_2m,apparent_temperature,weather_code,wind_speed_10m",
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    timeformat: "unixtime",
    timezone: "America/New_York",
    forecast_days: "1",
  });

  // Convert the API's WMO codes into readable condition groups.
  function describeWeather(code) {
    if (code === 0) return "Clear sky";
    if (code === 1) return "Mainly clear";
    if (code === 2) return "Partly cloudy";
    if (code === 3) return "Overcast";
    if ([45, 48].includes(code)) return "Fog";
    if ([51, 53, 55].includes(code)) return "Drizzle";
    if ([56, 57].includes(code)) return "Freezing drizzle";
    if ([61, 63, 65].includes(code)) return "Rain";
    if ([66, 67].includes(code)) return "Freezing rain";
    if ([71, 73, 75, 77].includes(code)) return "Snow";
    if ([80, 81, 82].includes(code)) return "Rain showers";
    if ([85, 86].includes(code)) return "Snow showers";
    if ([95, 97].includes(code)) return "Thunderstorm";
    if ([96, 99].includes(code)) return "Thunderstorm with hail";
    return "Condition description unavailable";
  }

  async function loadWeather() {
    // One request at a time; retries always start with a clean display.
    if (refresh.disabled) return;
    const hadFocus = document.activeElement === refresh;
    refresh.disabled = true;
    panel.setAttribute("aria-busy", "true");
    details.hidden = true;
    status.textContent = "Loading Lynchburg weather...";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error("Weather request failed");
      const data = await response.json();
      const current = data.current;
      // Reject missing/null values rather than displaying misleading zeros.
      if (!current || ![current.temperature_2m, current.apparent_temperature,
        current.weather_code, current.wind_speed_10m, current.time].every(Number.isFinite)) {
        throw new Error("Incomplete weather response");
      }
      const date = new Date(current.time * 1000);
      if (Number.isNaN(date.getTime())) throw new Error("Invalid weather time");

      document.getElementById("weather-temperature").textContent = `${Math.round(current.temperature_2m)}°F`;
      document.getElementById("weather-condition").textContent = describeWeather(current.weather_code);
      document.getElementById("weather-feels").textContent = `Feels like ${Math.round(current.apparent_temperature)}°F`;
      document.getElementById("weather-wind").textContent = `Wind: ${Math.round(current.wind_speed_10m)} mph`;
      // Unix timestamps plus an explicit timezone avoid visitor-timezone errors.
      time.dateTime = date.toISOString();
      time.textContent = new Intl.DateTimeFormat("en-US", {
        month: "short", day: "numeric", year: "numeric", hour: "numeric",
        minute: "2-digit", timeZone: "America/New_York", timeZoneName: "short",
      }).format(date);
      details.hidden = false;
      status.textContent = "Weather loaded.";
      refresh.textContent = "Refresh weather";
    } catch (error) {
      // Never replace a failed request with invented or sample live readings.
      status.textContent = error.name === "AbortError"
        ? "The weather request timed out. Please try again."
        : "Weather could not be loaded. Check your connection and try again.";
      refresh.textContent = "Try again";
    } finally {
      clearTimeout(timeout);
      refresh.disabled = false;
      panel.setAttribute("aria-busy", "false");
      // Disabling a focused button can send focus to the document body.
      // Restore it only if the student has not moved to another control.
      if (hadFocus && document.activeElement === document.body) {
        refresh.focus({ preventScroll: true });
      }
    }
  }

  refresh.hidden = false;
  refresh.addEventListener("click", loadWeather);
  loadWeather();
}

setupWeather();
