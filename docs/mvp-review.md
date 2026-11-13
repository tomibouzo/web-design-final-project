# Unit 12 MVP review

Local review completed November 13, 2026. This document maps the supplied assignment to the current draft and records what still needs verification after deployment.

## Assignment coverage

| MVP requirement | Implementation and status |
| --- | --- |
| At least three connected HTML pages | Home, Dining, and Campus Support share internal navigation and identify the current page. |
| Planned feature content | Announcements/events, dining menus/hours, and a support directory/contact form follow the submitted wireframe. Sample content and image placeholders are labeled. |
| Bootstrap and custom CSS | Official local Bootstrap files load before `css/style.css`; the grid and custom media queries adapt the layout. |
| Connected, event-driven JavaScript | Event details, combined search/category filters, menu controls, weather refresh/retry, department selection, and contact validation respond to user events. |
| Initial external API integration | Open-Meteo weather requests are implemented. EmailJS REST setup is present with delivery disabled. Live readings remain unverified in this environment. |
| Comments explaining key sections | HTML comments describe structure/fallbacks, CSS comments group layout rules, and JavaScript comments explain filtering, dates, API requests, and validation. |
| At least three meaningful MVP commits | Six progress commits cover foundation, filters, dining, weather, contact setup, and final review/documentation. |
| Repository and deployed Pages links | Repository is configured; push, merge, Pages deployment, and public verification remain pending. See README instructions. |

## Checks performed

Chrome browser checks used local files because access to localhost was blocked. API success and failure paths used simulated responses; no email was sent.

- All three pages at 1440, 768, 390, and 320 pixels: no horizontal page overflow, Bootstrap/custom styles loaded, and desktop/phone screenshots reviewed.
- Navigation and local assets: linked files exist, relative navigation stays inside the project folder, and each page has one main heading, one main landmark, and an active navigation link.
- Accessibility basics: unique IDs, explicit form labels, valid skip-link/ARIA targets, keyboard skip navigation, event toggles, and control focus after clearing filters or choosing departments. These checks are not a full WCAG conformance audit.
- Events/services: case-insensitive multiword search, category selection, combined filters, no-match messages, clear/reset focus, Enter handling, and readable content without JavaScript.
- Dining: all nine sample date/meal combinations, local-date boundary handling, search, empty/unsupported dates, clear search, and the no-JavaScript sample lunch.
- Weather: loading, values/units/timezone, network/HTTP/invalid-data errors, timeout, retry, keyboard use, and no-JavaScript messaging. Real requests still returned the unavailable state in this environment.
- Contact: department links, required/whitespace/email validation, demo mode making zero send requests, and no-JavaScript disabled controls. Simulated EmailJS responses covered acceptance, failure, timeout, draft preservation, and duplicate-submit prevention.
- JavaScript syntax checks passed for all five application scripts.

## Before submission

1. Review and push the MVP branch when authorized, merge it into `main`, and enable Pages for the repository root as described in the README.
2. Open the actual Pages URL. Follow Home, Dining, Campus Support, quick links, and department links; directly reload each page and confirm styles/scripts still load.
3. On a normal internet connection, confirm Home displays real Lynchburg weather with its timestamp and source credit. Check Refresh weather, then confirm an offline request shows a useful retry message.
4. Try an event filter, a different meal/date, a search with no results, and a valid demo contact message. The contact form should explicitly say nothing was sent.
5. Check the deployed site on a phone and with keyboard navigation. Submit the repository URL and the verified Pages URL.

## Follow-up for Unit 14

Replace example content with verified campus information where available, add approved images with appropriate alternative text, incorporate peer/instructor feedback, and verify actual contact delivery before enabling it. The overview mentions two real-time APIs in its goals but one or more in its core requirements; do not count the disabled EmailJS setup as a second functioning live-data integration. Resolve that final requirement before Unit 14 and continue meaningful version history toward the minimum of 10 commits.
