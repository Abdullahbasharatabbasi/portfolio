# Abdullah Basharat Abbasi | Portfolio

A personal portfolio website built with plain HTML5, CSS3 and JavaScript. No frameworks or build tools are required.

## Folder structure

```
abdullah-portfolio/
├── index.html              # Page structure and content
├── README.md               # This guide
└── assets/
    ├── css/
    │   └── style.css       # All styles, dark/light themes, responsive layout
    ├── js/
    │   └── main.js         # Typing effect, theme toggle, menu, form, animations
    ├── images/             # Put your profile photo and project images here
    └── cv/                 # Put your CV PDF here (see "Adding your CV")
```

## Run it locally

1. Open the `abdullah-portfolio` folder in **Visual Studio Code** (`File > Open Folder`).
2. Open `index.html` and double-click it, or right-click it and choose **Open with Live Server**.
   - To use Live Server, install the **Live Server** extension by Ritwik Dey from the Extensions panel (Ctrl+Shift+X).
3. Your browser opens the site. Changes you save refresh automatically when Live Server is running.

The site also works by simply double-clicking `index.html` in your file explorer.

## Things to customise before publishing

Search the files for these placeholders and replace them with your own information:

| Placeholder | Where | What to put |
|---|---|---|
| `YOUR_USERNAME` | `index.html` | Your GitHub username, LinkedIn handle, and GitHub Pages URL |
| `your.email@example.com` | `index.html`, `main.js` | Your real email address |
| `hospital-management-system`, `hostel-management-system`, `hotel-management-app`, `study-planner-app` | `index.html` | The exact repository names on your GitHub |
| `Abdullah-Basharat-Abbasi-CV.pdf` | `index.html` | The file name of your CV inside `assets/cv/` |
| Profile photo placeholder | `index.html` | See "Adding a profile photo" below |

### Adding your CV

1. Put your CV PDF in `assets/cv/`.
2. Make sure its name matches the link in `index.html`, or update the link in the Hero section.

### Adding a profile photo

In `index.html`, find the `<div class="profile-placeholder">` block inside the hero section and replace it with:

```html
<img src="assets/images/profile.jpg" alt="Abdullah Basharat Abbasi" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
```

### Adding a live demo link

Each project has a disabled **Live Demo** button. When you have a real demo link, change its `<span class="btn btn-small btn-disabled">` element to:

```html
<a href="https://your-demo-link" class="btn btn-small btn-primary" target="_blank" rel="noopener">Live Demo</a>
```

## Publish with GitHub Pages

### Step 1: Create a repository

1. Sign in to [github.com](https://github.com).
2. Click **New** and name the repository `abdullah-portfolio`.
3. Set it to **Public** (GitHub Pages is free for public repositories).
4. Do not add a README or license from the GitHub form, since you already have one.
5. Click **Create repository**.

### Step 2: Upload your files

**Option A: Using Git in VS Code terminal (recommended)**

```bash
cd abdullah-portfolio
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/abdullah-portfolio.git
git push -u origin main
```

**Option B: Upload from the browser**

On your repository page, click **Add file > Upload files**, drag in the contents of the folder (not the folder itself), and click **Commit changes**.

### Step 3: Turn on GitHub Pages

1. Open your repository on GitHub and go to **Settings**.
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Set **Branch** to `main` and the folder to `/ (root)`, then click **Save**.
5. Wait 1 to 3 minutes. Refresh the page to see your live link:

```
https://YOUR_USERNAME.github.io/abdullah-portfolio/
```

### Step 4: Update the site later

Make your changes locally, then run:

```bash
git add .
git commit -m "Update portfolio"
git push
```

GitHub Pages republishes automatically within a few minutes.

## Notes

- The contact form opens the visitor's email app with the message pre-filled. It does not send email on its own, so no server is needed.
- Fonts are loaded from Google Fonts. The site needs an internet connection for the typeface to display correctly.
- The site respects the visitor's "reduce motion" system setting.
- The theme choice is saved in the browser, so it persists between visits.
