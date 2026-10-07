const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('--- Starting Creovate AI Production Build ---');

// Build frontend via Vite
execSync('npm --prefix frontend run build', { stdio: 'inherit' });

const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
const rootDist = path.join(__dirname, '..', 'dist');

if (fs.existsSync(frontendDist)) {
  // Ensure _redirects exists in frontend/dist
  const redirectsFile = path.join(frontendDist, '_redirects');
  if (!fs.existsSync(redirectsFile)) {
    fs.writeFileSync(redirectsFile, '/*    /index.html   200\n');
  }

  // Mirror to root dist so both "frontend/dist" and "dist" publish targets succeed on Netlify
  fs.cpSync(frontendDist, rootDist, { recursive: true });
  console.log('--- Build Complete: frontend/dist & root dist ready with Netlify redirects ---');
}
