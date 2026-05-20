# Vishnu Raveendran — Portfolio

## Site Structure

```
/
├── index.html          ← Homepage (featured hero + drift strip)
├── projects.html       ← All projects (CD shelf)
├── project.html        ← Single project template (all 17 share this)
├── about.html
├── contact.html
├── cv.pdf              ← Drop your CV here
├── css/
│   └── style.css
├── js/
│   ├── projects.js     ← ALL project data + site config (only file you edit)
│   └── main.js         ← All rendering logic (don't touch)
└── images/
    ├── profile.jpg     ← Your photo (about page)
    ├── boxtothebeat/
    │   ├── keyart.jpg  ← Landscape key art (homepage hero + project page)
    │   ├── cover.jpg   ← Portrait cover art (CD case on shelf) — OPTIONAL
    │   ├── ss1.jpg
    │   ├── ss2.jpg
    │   └── ...
    └── (one folder per project id)
```

---

## Images: two types per project

**keyart.jpg** — landscape (16:9). Used in the homepage featured hero and the
project page split layout. Required.

**cover.jpg** — portrait (2:3). Used for the CD case on the projects shelf.
Optional — if not provided, keyart.jpg is used instead (cropped to fit).
For best results supply a proper portrait cover image.

---

## How to update a project

Open `js/projects.js` and find the project by its `id`. Edit any field directly.

```js
{
  id: "boxtothebeat",
  title: "Box To The Beat",
  description: "Your updated description here.",
  awards: ["Updated award here"],
}
```

---

## How to add a new project

1. Add a new object to `PROJECTS` in `js/projects.js`
2. Copy the structure of an existing entry
3. Set `tier: "full"` for main work, `tier: "minor"` for early/small projects
4. Set `featured: true` + `featuredOrder: N` to include in homepage carousel
5. Create `images/yourprojectid/` and drop in images

No HTML to touch. Ever.

---

## How to add videos to a project

Add the file path to the `videos` array:

```js
videos: ["images/myproject/trailer.mp4"]
```

Videos appear in the screenshot strip and open in the lightbox with controls.

---

## Filtering on the projects page

The filter buttons (All / VR / PC / Shipped / In Development / Jam / Client)
are built automatically from the `type` and `platforms` fields in each project.
No config needed — just keep those fields accurate.

---

## Changing featured projects / carousel count

In `js/projects.js`:
- Set `featured: true` and `featuredOrder: 1` (etc.) on the projects you want
- Change `FEATURED_COUNT` to control how many appear (default: 5)

---

## Changing site info

Edit the `SITE` object at the bottom of `js/projects.js`:

```js
const SITE = {
  name: "Vishnu Raveendran",
  email: "vishnuraveendran246@gmail.com",
  linkedin: "https://www.linkedin.com/in/vishnu-raveendran/",
  cv: "cv.pdf",
  bio: `Your bio here...`,
  profileImage: "images/profile.jpg"
};
```

---

## Hosting (free options)

**GitHub Pages** (recommended):
1. Push this folder to a GitHub repo
2. Settings → Pages → Source: main / root
3. Add custom domain in Pages settings
4. Update domain DNS to point to GitHub Pages

**Cloudflare Pages** or **Netlify**: drag and drop the folder.

Your only cost is the domain (~$12/year).

---

## Previewing locally

Open via a local server, not by double-clicking the HTML file:

```bash
cd vishnu-portfolio
npx serve .
# open http://localhost:3000
```
