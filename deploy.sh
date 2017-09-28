#!/bin/bash

set -o errexit #abort if any command fails

REPO=$AZURE_URL


# config
git config --global user.email "travis"
git config --global user.name "travis CI deploy"

# deploy
cd release
git init
git add -A
git commit -m "Deployed to Azure. Build number: $TRAVIS_JOB_NUMBER"
git push --force --quiet $REPO master:master
echo "Successfully pushed changes to Azure"