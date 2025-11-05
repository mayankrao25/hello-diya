## Setup Instructions

- Video tutorial for getting sharable link : 

https://youtu.be/bFCnDsQwNvA


### 1. Install Required Software

VS Code Installation, Node JS, Git Bash

- VS Code Tutorial : https://youtu.be/3eCmc0t6aqA?si=TkV0bVEz_95FbMmi

- Node Js Tutorial: https://youtu.be/uCgAuOYpJd0?si=2ICwr3Ih1P_ru9KA

- Git Bash Tutorial : https://www.youtube.com/watch?v=t2-l3WvWvqg


### 2. Open the Project

1. Open the "cute-website" folder in VS Code

2. Open terminal in VS Code (Terminal → New Terminal)

4. Type this command and press Enter:
   npm i

   after that, type this command: 

   npm run dev

   **If you get a script error on Windows, run this :**

   Set-ExecutionPolicy -Scope CurrentUser Unrestricted

   after that, try again the commands

5. You'll get a local view link
6. Ctrl + Click on the localhost link to view your website!


## 🎨 Customization Guide

### 📝 How to Change Main Content

Go to src folder. 
edit the text inside of textConfig.js file only!

## How to change Music 
Go to music folder. 
paste your new music there.
delete previous musics.
update your music names as music1.mp3, music2.mp3, music3.mp3


## 🌐 How to Share Your Website

Watch my tutorial:  https://youtu.be/bFCnDsQwNvA


## 🆘 Common Issues & Solutions

### ❌ "Cannot find module" errors
Solution: Run `npm install` to install all dependencies

### ❌ Images not loading
Solutions:
1. Make sure images are in `src/images/` folder
2. Check the import paths match your file names
3. Supported formats: `.jpg`, `.png`, `.gif`

### ❌ Music not playing
Solutions:
1. Check if `music.mp3` is in the `src/` folder
3. File size should be under 10MB

### ❌ Changes not showing
Solutions:
1. Save your files (Ctrl+S)
3. Hard refresh browser (Ctrl+Shift+R) or (CTRL + F5)