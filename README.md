# Campus Connect

Campus Connect is a general-campus student website for finding announcements, events, dining information, and support services. Its three-page structure follows the submitted Unit 11 wireframe PDF.

## Current progress

The Unit 12 draft now includes the page layouts, shared navigation, responsive styling, expandable event details, event/service filtering, a sample dining-menu browser, and live weather. The contact form includes validation and initial EmailJS setup in demo mode; final MVP checks are still in progress. All campus announcements, events, meals, office locations, and opening hours are clearly labeled examples.

| Page | Available now | Next steps |
| --- | --- | --- |
| Home (`index.html`) | Announcements, searchable/filterable event cards with expandable details, live Lynchburg weather, dining/support shortcuts | Final MVP review |
| Dining (`dining.html`) | Three-day sample menu with date/meal selection, menu search, and example dining hours | Investigate an actual menu source |
| Campus Support (`support.html`) | Searchable/filterable service directory, department selection, validated demo contact form, initial EmailJS setup | Connect verified EmailJS account and recipients |

## Technologies

- Semantic HTML5 with the structure described in the supplied Odin Project lesson.
- Bootstrap 5.3.9, loaded before custom CSS using the supplied quick-start guidance.
- Custom CSS for the campus color palette, cards, navigation, and small-screen adjustments.
- Plain JavaScript with input/change events for filtering and click events for event details, clearing filters, and refreshing weather; Fetch API requests for weather.
- Git for version history and GitHub for the project repository.

No build system or package installation is needed to run this draft. Official Bootstrap files are stored locally under `css/vendor` and `js/vendor` so the layout also works without CDN access. The downloads were checked against the SHA-384 hashes in the supplied Bootstrap quick start. Their original license notices are retained.

## Preview locally

1. Clone this repository and open its folder in VS Code.
2. Open `index.html` in your browser, or use VS Code's Live Server extension if already installed.
3. Use Home, Dining, and Campus Support in the navigation to move between pages.
4. Select **View details** on a Home event to expand its description; select **Hide details** to close it.
5. Enter an event/service title, location, or keyword in the search field and optionally choose a category. Results must match both controls. Search ignores case and extra spaces; when several words are entered, every word must appear in the item's searchable content.
6. Read the result count or no-match message. Select **Clear filters** to show the full list and return focus to the search field. Without JavaScript, all cards remain readable and the filter controls are hidden.
7. On Dining, choose today or one of the next two dates and select breakfast, lunch, or dinner. Search the selected meal by food, ingredient, or station. **Clear search** keeps the chosen meal and date. These dates organize sample meals only; they do not represent an actual university schedule. Without JavaScript, the original sample lunch remains visible.

For an HTTP preview with Python installed, run `python -m http.server 8000` from the repository folder and open `http://localhost:8000`. Stop the server with Ctrl+C.

## Weather integration

Home requests current model-based weather from [Open-Meteo](https://open-meteo.com/), selected from the supplied Public APIs list. It shows temperature, feels-like temperature, wind speed, a condition description, and the data timestamp in Lynchburg time. Temperatures are in Fahrenheit and wind is in mph. Weather is live API content; the campus events and menus remain examples.

- The fixed location is Lynchburg, Virginia (37.41, -79.18); no browser geolocation is requested.
- No API key or account is needed for this student/noncommercial use. An internet connection is required.
- Loading disables the refresh button. Network/HTTP failures, invalid data, and a ten-second timeout show an error and **Try again**. No sample readings substitute for failed requests.
- **Refresh weather** requests an update. The displayed conditions timestamp identifies the model data time; refreshing may return the same model reading. Without JavaScript, the panel explains that JavaScript is needed.
- Data credit and the [CC BY 4.0 licence](https://creativecommons.org/licenses/by/4.0/) appear in the panel. Temperatures are rounded and WMO condition codes are grouped into readable descriptions.
- API request parameters and condition codes follow the [Open-Meteo documentation](https://open-meteo.com/en/docs). Implementation: `js/weather.js`.

Weather was checked in Chrome with simulated responses for loading, successful readings, invalid data, network/HTTP errors, timeout/retry, keyboard use, and desktop/mobile layouts. The live endpoint could not be verified in the development environment because its hostname could not be resolved. Confirm real readings through Live Server or GitHub Pages before submission.

## Contact form and initial EmailJS setup

On Campus Support, choose **Contact Financial Aid** or **Contact Writing Center** to select that department and focus the form. You can also choose a department directly. Enter your name, email address, subject, and message, then select **Check message**. All fields are required; whitespace-only entries and invalid email addresses are rejected. Length limits are 100 characters for name, 254 for email, 150 for subject, and 2,000 for message.

**The committed configuration is demo mode. Nothing is sent or stored.** Successful validation says the message passes the checks, not that it was delivered. Without JavaScript, the form stays disabled and the service directory remains readable.

Initial integration uses the official [EmailJS REST send API](https://www.emailjs.com/docs/rest-api/send/), so no SDK download is needed. To connect delivery later:

1. Create an EmailJS account, connect an email service, and create one template per department. Use verified recipient addresses fixed in those templates. While developing, use your own verified test inbox instead of campus offices.
2. The templates use `department`, `from_name`, `reply_to`, `subject`, and `message`. Set the template's Reply-To field to `{{reply_to}}`; keep the connected service's sender address.
3. In `js/contact-config.js`, fill in `publicKey`, `serviceId`, and the two `templateIds`. These identifiers are public. Never place a private key or email password in browser files. Keep `enabled: false` until setup is verified.
4. Configure allowed origins in EmailJS for your local HTTP preview and deployed site. Use Live Server or another HTTP server for testing.
5. When ready to enable sending, set `enabled: true` with all identifiers filled in. The form then labels its action **Send message** and explains that data goes through EmailJS. Verify delivery to the test inbox before using real department recipients.

While sending, inputs are disabled to avoid concurrent submissions. An accepted response is distinguished from a read confirmation. Failure/timeout preserves the draft and never automatically retries, because delivery can be uncertain. The page does not keep messages in local storage. EmailJS account configuration and real delivery remain unverified; all development send-path tests use simulated responses and send no email.

## Project files

```text
index.html
dining.html
support.html
css/style.css
js/script.js
js/dining.js
js/weather.js
js/contact-config.js
js/contact.js
images/
```

## Deployment

The site has not been deployed yet. Once the MVP is reviewed and its branch is merged, publish the repository root from `main` using GitHub Pages. The repository and verified deployed URL will be the two Unit 12 submission links. Relative asset and navigation paths support hosting under this repository's Pages path.

## Remaining MVP work

- Verify and connect an EmailJS account and department recipients when ready; the MVP currently uses demo mode.
- Verify all three pages on desktop and mobile, update documentation, and deploy after review.

The final-project overview differs on whether one or two APIs are required. We are planning weather and EmailJS, but the eligibility of a sending-only integration under the two-real-time-API wording remains to be confirmed.

## Future improvements

Replace sample campus information with verified content, connect a reliable dining-menu source, save favorite events or services locally, and add more departments.

## Supplied resources

- Unit 12 MVP assignment and Final Project Overview.
- Submitted Unit 11 wireframe PDF.
- [The Odin Project: HTML Boilerplate](https://www.theodinproject.com/lessons/foundations-html-boilerplate).
- [Bootstrap quick start](https://getbootstrap.com/docs/5.3/getting-started/introduction/).
- [Public APIs list](https://github.com/public-apis/public-apis).
