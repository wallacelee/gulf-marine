# vsrep

Static site: Gulf Marine end-to-end customer journey and business value.

## Contents

- `index.html` is the page.
- `assets/css/style.css` holds all styles.
- `assets/js/app.js` holds the journey, mock-up screens and interactions.
- `assets/img/gulf-marine-logo.png` is the logo.
- `assets/fonts/` holds the web fonts (woff2).
- `.nojekyll` tells GitHub Pages to serve the files as they are.

Everything is self-contained. The fonts (Jost, Public Sans and Lato, SIL Open Font License) are bundled in `assets/fonts`, so the page needs no external requests.

## Publish with GitHub Pages

1. Put this `vsrep` folder in the root of a GitHub repository (or make `vsrep` the repository itself and keep the files at its root).
2. In **Settings, Pages**, choose **Deploy from a branch**, then your default branch and the **/ (root)** folder.
3. The page is served at `https://<user>.github.io/<repo>/vsrep/` (or `https://<user>.github.io/vsrep/` if `vsrep` is the repository).

## Before you publish

- GitHub Pages sites are public by default, even from a private repository, unless your plan supports private Pages.
- `index.html` carries a `noindex` tag to discourage search engines. Remove it only if you want the page indexed.
- All people, vessels, ports, prices and volumes in the mock-ups are fictional or illustrative. Customer details from the source order are anonymised.
