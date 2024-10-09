### How to run the Web application:
Download the Server-part4 folder and open it in Visual Studio Code (VSCode).

this folder contains the server code for the Web application, which is also adjusted to work with the TCP server.

after downloading the server you need to run this code: nmp start - and it needs to look like this:

![alt text](<Screenshot 2024-10-08 210317.png>)

Download the Web application from this GitHub repository: [GitHub Repo](https://github.com/theComputerGu/AndroidYouTube/tree/main-part4)

and open it using  Vscode. Instructions on how to open and set up the project can be found in the repository [GitHub Repo](https://github.com/theComputerGu/AndroidYouTube/tree/main-part4).

after set up the android code and run it need to look like this:

![alt text](<Screenshot 2024-10-09 012017.png>)

Now, download the TCP.cpp file and put it in WSL (Windows Subsystem for Linux) in VSCode. Compile it using the following command:

```sh
g++ -std=c++17 -o tcp TCP.cpp
```
Then, run the TCP server using this command:

```sh
./tcp
```

like this:

![alt text](<Screenshot 2024-10-08 205933.png>)


