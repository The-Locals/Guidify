# Guidify
This is The repository for the Android mobile application Guidify being developed for the module *Collaborative Project* by The Locals consisting of 3 members.
- Dennis Willie
- Jeremy Neo
- Tadas Gliadkovskis

## [Demo](https://www.youtube.com/watch?v=-QB9mWPh6uo)

# Features
- Real-Time Map Navigation 
- Custom Travel Guide Audio Playback, Storage, Uploading
- AI Filtering
- Custom Stitching of Travel Guides
- Content Sorting based on User Following

### Requirements
- [npm](https://nodejs.org/en/download/)
- [Android Studio Dolphin | 2021.3.1 Patch 1](https://developer.android.com/studio/archive) (to launch the emulator) 


# Setup
All of the setup is recommended to be done using Android Studio.

1. `git clone https://github.com/The-Locals/Guidify.git`
2. `cd Guidify`
3. `cd frontend`
4. `npm install -f`
## [Guide to Launch on Android Phone](https://reactnative.dev/docs/running-on-device#running-your-app-on-android-devices)

## Launch with phone Emulator
1. Using Android studio create a virtual device making sure its API version 32 [Guide](https://www.youtube.com/watch?v=GhuiNcOEv1A)
2. Using the terminal make sure you're in `Guidify/frontend`
3. run `npx react-native run-android`

## Launch with Local backend
1. `cd backend`
2. `npm install`
3. `npm start`
4. Before launching the frontend make sure to update the ip in `frontend/ip.json` to the machines IPv4 address which can be found in the console using `ipconfig` making sure it's the correct address u input.
5. Proceed to launch the app onto an emulator or onto the phone. 

# Built With

- [React Native](https://reactnative.dev/) FrontEnd. An open-source framework for building mobile applications using JavaScript and React, allowing for cross-platform development.

- [Node Js](https://nodejs.org/en) BackEnd. A JavaScript runtime environment that allows for the execution of JavaScript code server-side, enabling the development of scalable network applications.

- [MongoDB](https://www.mongodb.com/) Database. A document-oriented NoSQL database that uses JSON-like documents with optional schemas, allowing for a flexible and scalable data model.

- [Google Cloud Storage](https://cloud.google.com/storage) Blobstore. A scalable, durable, and highly available object storage service provided by Google Cloud, allowing for data storage and retrieval from anywhere.

## Prototype Design: https://www.figma.com/file/JcJeYDHMMXVelcdbKIeU9w/Guidify-Prototype?node-id=0%3A1&t=UqWPkVShNYlVzUr2-0

![Project Poster](https://github.com/TadasGliadkovskis/CA2-Bug-Project/assets/72204358/2236007f-f3cd-4790-b8d2-7eec922ef7e5)
