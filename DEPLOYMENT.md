# Deployment Configuration
# GitHub Pages Settings for the Valentine Project

## Repository Setup
This project is configured to deploy to GitHub Pages using GitHub Actions.

### Prerequisites
- GitHub account
- Git installed locally
- Node.js 18+ installed

### Initial Setup Steps

1. **Create a GitHub Repository**
   - Go to https://github.com/new
   - Name it `valentine` (or your preferred name)
   - Make it public (required for free GitHub Pages)

2. **Push Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/valentine.git
   git push -u origin main
   ```

3. **Configure GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" in the left sidebar
   - Select "Deploy from a branch" under Source
   - Choose branch: `gh-pages`
   - Click Save

4. **Enable GitHub Actions**
   - Go to "Actions" tab in your repository
   - Click "I understand my workflows"

### Deployment

**Automatic Deployment (Recommended)**
- Every push to `main` branch triggers automatic deployment via GitHub Actions
- Your site will be live at `https://YOUR_USERNAME.github.io/valentine/`

**Manual Deployment**
```bash
npm run deploy
```

### Environment Variables (Optional)
If you want to use a custom domain, update the `cname` field in `.github/workflows/deploy.yml`

### Troubleshooting
- Check "Actions" tab in GitHub for workflow status
- Ensure `.gh-pages` branch exists (created automatically on first deployment)
- Clear browser cache if changes don't appear
- Check GitHub Pages settings point to `gh-pages` branch

### Live Site URL
Once deployed, your site will be available at:
`https://YOUR_USERNAME.github.io/valentine/`
