### How to run the WEB application:
Download the Server-part4 folder and open it in VSCode.

This folder contains the server code for the Web application, which is also adjusted to work with the TCP server.

.....................

Additionally, download the Web application code from the repository and also you can read the repository there in order to understand how to set up the Android code: [GitHub Repo](https://github.com/theComputerGu/AndroidYouTube/tree/main-part4)

and open it in VSCode. Detailed instructions on how to open the project can be found in the repository.

Now, download the TCP.cpp file and put it in WSL in VSCode. Compile it using the following command:

```sh
g++ -std=c++17 -o tcp TCP.cpp
```
Then, run the TCP server using this command:

```sh
./tcp
```

After that, run the Web server you downloaded earlier, and then run the Web application.
