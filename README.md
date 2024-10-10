# YouTube Part 4

## Introduction
Welcome to our YouTube Part 4 repository! This section is dedicated to the Android and Web YouTube app that we developed during the Advanced Programming course at Bar-Ilan University (BIU).

This repository contains the Android code, Web code, and server component that are adjusted for both Android and Web applications.

You can find the Jira repository here:[Jira Repository](https://itayzahor1.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?epics=visible&issueParent=10001)

In this part, we built a TCP server that runs a video recommendation system to improve the YouTube platform. It works smoothly with the rest of the project and helps enhance the user experience by providing more personalized content recommendations.

You can check the wiki folder, which contains pictures of the Web and Android apps after adding the TCP server after running everything together.

## How to Run Part 4
### How to run the Android application:
Download the Server-part4 folder and open it in Visual Studio Code (VSCode). This folder contains the server code for the Android application, which is adjusted to work with the TCP server.

Download the Android application from this GitHub repository: [GitHub Repo](https://github.com/theComputerGu/AndroidYouTube/tree/main-part4)

and open it using Android Studio. Instructions on how to open the project can be found in the repository.

Now, download the TCP.cpp file and put it in WSL (Windows Subsystem for Linux) in VSCode. Compile it using the following command:

```sh
g++ -std=c++17 -o tcp TCP.cpp
```
Then, run the TCP server using this command:

```sh
./tcp
```
After that, run the Android server you downloaded earlier, and then run the Android application.

### How to run the WEB application:
Download the Server-part4 folder and open it in Visual Studio Code (VSCode).

this folder contains the server code for the Web application, which is also adjusted to work with the TCP server.

navigate to the "Server-part4" folder create "config" folder create a file named ".env.local" under the config folder and fill it with:

```sh
CONNECTION_STRING="mongodb://localhost:27017"
PORT=12345
```

open MongoDBCompass and connect to "mongodb://localhost:27017" under the "test" DB imoprt the json files from the 'dataForServer' folder import users.json to users and videos.json to videos.


now you can open your browser on http://localhost:12345/ and see the website

Now, download the TCP.cpp file and put it in WSL (Windows Subsystem for Linux) in VSCode. Compile it using the following command:

```sh
g++ -std=c++17 -o tcp TCP.cpp
```
Then, run the TCP server using this command:

```sh
./tcp
```


After that, run the Web server you downloaded earlier, and then run the Web application.

```sh
Written by:
Tom Uklein (206594053)  
Itay Zahor (208127480)  
Mark Sheinberg (324078708)
```
