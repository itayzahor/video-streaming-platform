### How to run the Android application:
Download the Server-part4 folder and open it in Visual Studio Code (VSCode).

his folder contains the server code for the Web application, which is also adjusted to work with the TCP server.

.............

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
