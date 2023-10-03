# OBS Overlay for Jacob's CTF ClassiCube Server

This OBS overlay is specifically designed for the [Jacob's CTF](https://jacobsc.tf) ClassiCube server. It includes a comprehensive suite of features to visually enhance the quality of tournament streams.

## Key Features

- **Scoreboard:** Keep track of team scores automatically.
- **Round Timer:** Ensure precise timing for each round.
- **Team Overlays:** Display team names and roster.
- **Player Stat Tracking:** Monitor kills, deaths, captures, and points.
- **Control Panel:** Easily configure team names for seamless integration.

All statistics are synchronized with the CTF server.

## Planned Features

- **Kill Feed:** Get instant updates on player kills, flag grabs, and captures.
- **Custom Team Profile Pictures:** Add a personalized touch to team identities.

Stay tuned for these exciting upcoming features!

## Installation

### Prerequisites:
- OBS Studio installed
- A web server (e.g., WampServer)
  
### Instructions:

1. **Clone or Download the Repository**
   - Click on the "Code" button on the repository page.
   - Choose "Download ZIP" to get a compressed file with all the necessary files.
   - Extract the contents to a folder on your computer.
  
2. **Set Up Your Web Server**
   - Create a new folder on your web server to host the overlay files.
   - Copy the extracted files to the folder you created on your web server.
  
3. **Launch OBS Studio**
   - Open OBS Studio on your computer.
  
4. **Add Browser Source**
   - In OBS Studio, go to 'Sources' and click the '+' icon.
   - Select 'Browser' from the list.
  
5. **Configure Browser Source**
   - In the URL field, enter the link to your folder, e.g., http://localhost/scoreboard/index.html.
  
6. **Set Custom Browser Docks**
   - Click on 'Docks' in OBS Studio and select 'Custom Browser Docks...'.
   - Add Dock Name and a link to your folder's admin page e.g., http://localhost/scoreboard/admin.html.
   - It is recommended to use 1920 x 1080 for width and height, respectively.
   - Optional: Anchor the Dock
     If desired, you can drag the dock to anchor it in a specific location.
  
7. **Position the Overlay**
   - Adjust the position and size of the overlay to your liking within the OBS Studio window.
