const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('--- Starting Creovate AI Production Build ---');

const frontendDir = path.join(__dirname, '..', 'frontend');
const frontendDist = path.join(frontendDir, 'dist');
const rootDist = path.join(__dirname, '..', 'dist');

// Ensure frontend has its dependencies ready
const frontendModules = path.join(frontendDir, 'node_modules');
if (!fs.existsSync(frontendModules)) {
  console.log('Installing frontend dependencies for CI/CD build...');
  execSync('npm --prefix frontend install --include=dev', { stdio: 'inherit' });
}

// Build frontend via Vite
console.log('Building Vite frontend bundle...');
execSync('npm --prefix frontend run build', { stdio: 'inherit' });

if (fs.existsSync(frontendDist)) {
  // Ensure _redirects exists for Netlify
  const redirectsFile = path.join(frontendDist, '_redirects');
  if (!fs.existsSync(redirectsFile)) {
    fs.writeFileSync(redirectsFile, '/*    /index.html   200\n');
  }

  // Mirror to root dist so both root outputDirectory and subfolder outputDirectory work on Vercel & Netlify
  fs.cpSync(frontendDist, rootDist, { recursive: true });
  console.log('--- Build Complete: frontend/dist & root dist ready for Vercel/Netlify ---');
}
