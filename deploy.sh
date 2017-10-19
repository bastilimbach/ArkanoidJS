#!/bin/bash
set -e
SHA=$(git rev-parse --verify --short HEAD)

cd dist
git init
git config user.name "Deploy Bot"
git config user.email "bot@sebastianlimbach.com"
git remote add upstream "https://$GITHUB_TOKEN@github.com/bastilimbach/ArkanoidJS.git"
git fetch upstream
git reset upstream/gh-pages

if git diff --quiet; then
    echo "No changes detected. Website doesn't need a re-deploy."
    exit 0
fi

touch .

git add -A .
git commit -m "[Bot] Website deploy: ${SHA}"
git push -q upstream HEAD:gh-pages
