[![Build Status](https://travis-ci.org/gelstudios/gitfiti.svg?branch=master)]() [![Heroku](https://heroku-badge.herokuapp.com/?app=rbhachu-smartbrain-f-master)]() 


<h1 align="center">SmartBrain Master (Front-End Client)</h1>
<div align="center">

:rocket: **[View Live Demo](https://rbhachu-smartbrain-f-master.herokuapp.com/)** :rocket:<br>

![SmartBrain Preview](./src/images/site-demo.gif)

</div>

## How to use the App
<p>
You can use the following test login details;
<br>
<b>user:</b> a@a.com
<br>
<b>password:</b> a
<br>
Or click on the 'Register' tab and create your own new login details to use instead.
<br><br>
Once logged in simply copy, then paste an image url from the web (example:  https://www.website.com/image.png) into the search input field, then click the 'DETECT' button to run the Face Detection API. [show animation???]
<br><br>
Each time you upload an image your image count value you is incremented by +1 value as the image upload count. You can view your total Image upload count in the 'View Profile' tab, along with a Rank Badge, which is fed from AWS Lambda. The Rank Badge will then change based on the current image upload count.
<p/>


## Description
<p>
A React App that detects, then highlights faces in web images. Including a user profile with image upload count and a Ranking Badge served from AWS Lambda. 
<br><br>
Built with React.js, Node.js, Express, PostgreSQL, Redis, Tachyon CSS, Clarifai Face Detection API, and all running on Heroku Servers. 
<br><br>
Back-end Server Repo Link:[https://github.com/rbhachu/smartbrain-backend-jwt](https://github.com/rbhachu/smartbrain-backend-jwt)
<br><br>
<i>This repo is based on the [ZTM Web Developer Zero to Mastery](https://www.udemy.com/the-complete-web-developer-zero-to-mastery) and [ZTM Junior to Senior Web Developer](https://www.udemy.com/course/the-complete-junior-to-senior-web-developer-roadmap/) courses, but has since been heavily updated by myself personally, after completing both courses.</i>
</p>

## Features
<p>
-Multi-face detection using clarifai face api
<br><br>
-Ranking badge element served from external AWS Lambda service
<br><br>
-User authentication using JSON Web Tokens (JWT) with Redis server for session management
<br><br>
-User profile with capture of image uploads, stored via postgresql database
<br><br>
-Portable Web App (PWA) enabled 
<br><br>
-Responsive layout using Flexbox
<br><br>
-TS Particles for background animation
<br><br>
-Parallax tilt for interactive site logo
<br><br>
-Form validation with Bcryprt for password encryption/decryption to PostgreSQL Database
<br><br>
-Tabbed layout
<br><br>
-Editable user profile
<br><br>
-Custom site fav icon with support for apple, android etc
<br><br>
-Hosted and running on Heroku Servers (Please Note: Using free tier, so takes a few seconds to warmup servers.)
</p>


## Dependencies/NPM Modules
[react v17.0.2](https://www.npmjs.com/package/react) - Part of React core<br>
[react-dom v17.0.2](https://www.npmjs.com/package/react-dom) - Part of React core<br>
[react-scripts v4.0.3](https://www.npmjs.com/package/react-scripts) - Part of React core<br>
[tachyons v4.12.0](https://www.npmjs.com/package/tachyons) - For dynamic css<br>
[prop-types v15.7.2](https://www.npmjs.com/package/prop-types) - for tab interface<br>
[react-parallax-tilt v1.5.23](https://www.npmjs.com/package/react-parallax-tilt) - For background animation<br>
[react-tsparticles v1.28.0](https://www.npmjs.com/package/react-tsparticles) - For interactive logo heading<br>



## Installation
<p>Open your Code Editor and 'CD' into your working directory, then download the repo to that location, by executing the following command in your terminal.<p>

```sh
git clone https://github.com/rbhachu/smartbrain-frontend-jwt.git
```
<p>Once the repo has been downloaded, 'CD' to the newly downloaded project folder ('cd smartbrain-frontend'). Then execute the following command in your terminal.<p>

```sh
npm install
```


## Configuration
<p>There is a settings file in the root of the project folder called '.env' which is also know as the Enviromental Variables file.
<br><br>
Using this file you can control how you want the app to run; Remoteley or Locally.
<br><br>
To run the app Remotely, overwrite the current values in the .env file with the following values;
<br>

```sh
#FRONT-END CLIENT
REACT_APP_CLIENT_URL=https://rbhachu-smartbrain-f-master.herokuapp.com

#BACK-END SERVER
REACT_APP_SERVER_URL=https://rbhachu-smartbrain-b-master.herokuapp.com

#AWS LAMDA
REACT_APP_AWS_LAMBDA=https://vqvvli950h.execute-api.us-east-1.amazonaws.com
```
<br>
<br>
Alternatively, to run the app Locally, overwrite the current values in the .env file with the following values; *
<br>

```sh
#FRONT-END CLIENT
REACT_APP_SERVER_URL=http://localhost:3001

#BACK-END SERVER
REACT_APP_CLIENT_URL=http://localhost:3000

#AWS LAMDA
REACT_APP_AWS_LAMBDA=https://vqvvli950h.execute-api.us-east-1.amazonaws.com
```

<br>
<i>* You will also need to download the SmartBrain Back-End Server Repo and install it too. The Repo also includes full instructions on how to do this too.
Back-End Server Repo Link: https://github.com/rbhachu/smartbrain-backend-jwt</i>
</p>



## Deployment
<p>Finally, to run the app, simply execute the following command in your terminal (ensuring you are in the correct project directory too).</p>

```sh
npm start
```
<p>After a few seconds, your browser should automatically open to the following link;

[http://localhost:3000](http://localhost:3000)

and display the project in the browser.</p>
![SmartBrain Preview](./src/images/site-preview.png)



## Author
👤 **Rishi Singh Bhachu**<br>
:octocat: [GitHub](https://github.com/rbhachu)<br>
<a target="_blank" title="https://www.linkedin.com/in/RishiSinghBhachu/" href="https://www.linkedin.com/in/RishiSinghBhachu/"><img src="https://img.shields.io/badge/-Rishi&nbsp;Singh&nbsp;Bhachu-0077B5?style=flat&logo=Linkedin&logoColor=white"/></a>


## Issues
Please drop me a message if you have any issues or problems running the project.

## Show your support
It would be greatly appreciated if you could also give this project a ⭐️ too!