# Campus Connect

Campus Connect is a general-campus student website for finding announcements, events, dining information, and support services. Its three-page structure follows the submitted Unit 11 wireframe PDF.

## Current progress

This first Unit 12 commit establishes the page layouts, shared navigation, responsive styling, and an initial JavaScript interaction. It is the foundation of the MVP, not the completed submission. All campus announcements, events, meals, office locations, and opening hours are clearly labeled examples.

| Page | Available now | Next steps |
| --- | --- | --- |
| Home (`index.html`) | Announcements, event cards with expandable details, weather placeholder, dining/support shortcuts | Event search and category filter; live weather |
| Dining (`dining.html`) | Sample meals and example dining hours | Sample menu controls and search; investigate an actual menu source |
| Campus Support (`support.html`) | Example service directory and disabled contact-form layout | Service search, department selection, and initial EmailJS setup |

## Technologies

- Semantic HTML5 with the structure described in the supplied Odin Project lesson.
- Bootstrap 5.3.9, loaded before custom CSS using the supplied quick-start guidance.
- Custom CSS for the campus color palette, cards, navigation, and small-screen adjustments.
- Plain JavaScript with click events for expanding and hiding event information.
- Git for version history and GitHub for the project repository.

No build system or package installation is needed to run this draft. Official Bootstrap files are stored locally under `css/vendor` and `js/vendor` so the layout also works without CDN access. The downloads were checked against the SHA-384 hashes in the supplied Bootstrap quick start. Their original license notices are retained.

## Preview locally

1. Clone this repository and open its folder in VS Code.
2. Open `index.html` in your browser, or use VS Code's Live Server extension if already installed.
3. Use Home, Dining, and Campus Support in the navigation to move between pages.
4. Select **View details** on a Home event to expand its description; select **Hide details** to close it.

For an HTTP preview with Python installed, run `python -m http.server 8000` from the repository folder and open `http://localhost:8000`. Stop the server with Ctrl+C.

## Project files

```text
index.html
dining.html
support.html
css/style.css
js/script.js
images/
```

## Deployment

The site has not been deployed yet. Once the MVP is reviewed and its branch is merged, publish the repository root from `main` using GitHub Pages. The repository and verified deployed URL will be the two Unit 12 submission links. Relative asset and navigation paths support hosting under this repository's Pages path.

## Remaining MVP work

- Add event and service searches and category filters.
- Add dining controls using clearly labeled sample data.
- Integrate live weather and handle loading and request failures.
- Begin EmailJS configuration and contact handling without claiming an unsent message was delivered.
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
