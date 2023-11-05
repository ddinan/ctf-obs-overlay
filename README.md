# OBS Overlay for Jacob's CTF ClassiCube Server

This OBS overlay is specifically designed for the [Jacob's CTF](https://jacobsc.tf) ClassiCube server. It includes a comprehensive suite of features to visually enhance the quality of tournament streams. 

## Key Features

- **Direct linking** The software uses the Jacob's CTF server API for grabbing information.
- **Scoreboard:** Keep track of team scores automatically.
- **Round Timer:** Ensure precise timing for each round.
- **Team Overlays:** Display team names and roster.
- **Player Stat Tracking:** Monitor kills, deaths, captures, and points.
- **Control Panel:** Easily configure team names for seamless integration.
- **Map ban screen** Configure and select/deselect maps to visualize team map bans.
- **'Starting soon' screen** Let your viewers know that the stream is starting soon.
- **Bracket screen** A direct Challonge integration to show the bracket and upcoming matches.

All statistics are synchronized with the CTF server.

## Planned Features
- **Intermission screen** Let your viewers know that the stream will resume soon.
- **Kill Feed:** Get instant updates on player kills, flag grabs, and captures.
- **Custom Team Profile Pictures:** Add a personalized touch to team identities.
- **Team list** Show a list of teams and their rosters for team introduction.

Stay tuned for these upcoming features!

## Installation

### Prerequisites:
- OBS Studio installed
- Windows
  
### Instructions:

1. Download the latest release
   - Navigate to the [releases](https://github.com/ddinan/ctf-obs-overlay/releases) page and click on `release.zip` to download the software.

2. **Run the application**
   - Double-click on `TournamentOverlay.exe`. If this is your first time running the application, your anti-virus software may perform a routine scan, which is just a standard security measure.
  
3. **Launch OBS Studio**
   - Open OBS Studio on your computer.
  
4. **Add Browser Source**
   - In OBS Studio, go to 'Sources' and click the '+' icon.
   - Select 'Browser' from the list.
  
5. **Configure Browser Source**
   - In the URL field, enter the link to your folder, e.g., http://localhost:3000/index.html.
  
6. **Set Custom Browser Docks**
   - Click on 'Docks' in OBS Studio and select 'Custom Browser Docks...'.
   - Add Dock Name and a link to your folder's admin page e.g., http://localhost:3000/admin.html.
   - It is recommended to use 1920 x 1080 for width and height, respectively.
   - Optional: If desired, you can drag the dock to anchor it in a specific location.
  
7. **Position the Overlay**
   - Adjust the position and size of the overlay to your liking within the OBS Studio window.
