let team1Roster = []
let team2Roster = []

function reload () {
  const team1Name = localStorage.getItem('team1')
  const team2Name = localStorage.getItem('team2')

  // Update team names and scores
  document.getElementById('team1').innerHTML = team1Name || 'Team 1'
  document.getElementById('team2').innerHTML = team2Name || 'Team 2'

  setTeamNameFontSize()

  // Update game wins display
  const maxGames = localStorage.getItem('maxGames')
  updateGameWins(maxGames)
}

reload()

function setTeamNameFontSize () {
  const team1NameElement = document.getElementById('team1')
  const team2NameElement = document.getElementById('team2')

  const maxFontSize = 24 // Maximum font size you want to allow
  const maxNameLength = 10 // Maximum characters you want to display without resizing

  // Calculate the font size based on the length of the team names
  const team1Name = team1NameElement.textContent
  const team2Name = team2NameElement.textContent
  const team1FontSize = Math.min(maxFontSize, maxNameLength / team1Name.length * maxFontSize)
  const team2FontSize = Math.min(maxFontSize, maxNameLength / team2Name.length * maxFontSize)

  // Set the calculated font size
  team1NameElement.style.fontSize = `${team1FontSize}px`
  team2NameElement.style.fontSize = `${team2FontSize}px`
}

let lastTeam1 = localStorage.getItem('team1')
let lastTeam2 = localStorage.getItem('team2')
let lastMaxGames = localStorage.getItem('maxGames')

function checkAndUpdate () {
  const currentTeam1 = localStorage.getItem('team1')
  const currentTeam2 = localStorage.getItem('team2')
  const currentMaxGames = localStorage.getItem('maxGames')

  let hasChanges = false

  if (currentTeam1 !== lastTeam1 || currentTeam2 !== lastTeam2) {
    hasChanges = true
  }

  if (currentMaxGames !== lastMaxGames) {
    hasChanges = true
  }

  if (hasChanges) {
    reload() // Update the information

    // Update last known state
    lastTeam1 = currentTeam1
    lastTeam2 = currentTeam2
    lastMaxGames = currentMaxGames
  }

  // Schedule the next check
  setTimeout(checkAndUpdate, 1000) // Check every second
}

checkAndUpdate() // Start the process

function updateScoreboardHUD (data) {
  const timerElement = document.getElementById('timer')
  timerElement.textContent = data.timeRemaining

  const score1 = document.getElementById('score1')
  const score2 = document.getElementById('score2')

  score1.innerHTML = data.redCaptures
  score2.innerHTML = data.blueCaptures
}

function updateGameWins (maxGames) {
  const team1Wins = document.getElementById('team1-wins')
  const team2Wins = document.getElementById('team2-wins')

  // Clear existing elements
  team1Wins.innerHTML = ''
  team2Wins.innerHTML = ''

  for (let i = 0; i < maxGames; i++) {
    const team1WinElement = document.createElement('div')
    const team2WinElement = document.createElement('div')

    // Add win class to indicate a win
    if (i < parseInt(localStorage.getItem('team1Wins') || 0)) {
      team1WinElement.classList.add('win')
    } else {
      team1WinElement.classList.add('unplayed')
    }

    if (i < parseInt(localStorage.getItem('team2Wins') || 0)) {
      team2WinElement.classList.add('win')
    } else {
      team2WinElement.classList.add('unplayed')
    }

    team1Wins.appendChild(team1WinElement)
    team2Wins.appendChild(team2WinElement)
  }

  const gameInfo = document.getElementById("game-info");

  // Update the content of the existing <p> element
  const gameNumber = (parseInt(localStorage.getItem('team1Wins')) || 0) + (parseInt(localStorage.getItem('team2Wins')) || 0) + 1
  gameInfo.innerHTML = "Game " + gameNumber + " <span style='color: gray;'>|</span> <span style='color: white;'>Best of " + (maxGames || 1) + "</span>"
}

function fetchGameData () {
  fetch('http://localhost:22000/api/game')
    .then(response => response.json())
    .then(data => {
      updateScoreboardHUD(data)

      // Update team rosters based on the response
      team1Roster = data.redPlayers || []
      team2Roster = data.bluePlayers || []

      // Call the reload function with updated rosters
      reload()
    })
    .catch(error => console.error('Error:', error))
}

function updatePlayerHUD (player, data) {
  let element = document.getElementById('player-' + player)

  if (!element) {
    element = document.createElement('li')
    element.id = 'player-' + player
    element.classList.add('player-item', 'border-gradient')

    if (team1Roster.includes(player)) {
      element.classList.add('red', 'border-gradient-red')
    } else if (team2Roster.includes(player)) {
      element.classList.add('blue', 'border-gradient-blue')
    }

    // Create img element
    const img = document.createElement('img')
    img.src = `https://123dmwm.com/img/skin/3d.php?user=${player}`
    img.width = '48'
    img.height = '48'
    if (team1Roster.includes(player)) img.classList.add('left')
    else img.classList.add('right')

    // Create div.info
    const infoDiv = document.createElement('div')
    infoDiv.classList.add('info')

    // Create p.username
    const usernameP = document.createElement('p')
    usernameP.classList.add('username')
    usernameP.textContent = player

    // Create div.stats
    const statsDiv = document.createElement('div')
    statsDiv.classList.add('stats')

    // Create spans for kills, deaths, and captures with initial value '0'
    const killsIcon = document.createElement('i')
    killsIcon.classList.add('fa-solid', 'fa-crosshairs', 'stats-padding')

    const killsSpan = document.createElement('span')
    killsSpan.style.padding = '0 12px 0 3px'
    killsSpan.textContent = '0'

    const deathsIcon = document.createElement('i')
    deathsIcon.classList.add('fa-solid', 'fa-skull', 'stats-padding')

    const deathsSpan = document.createElement('span')
    deathsSpan.style.padding = '0 12px 0 3px'
    deathsSpan.textContent = '0'

    const capturesIcon = document.createElement('i')
    capturesIcon.classList.add('fa-solid', 'fa-flag', 'stats-padding')

    const capturesSpan = document.createElement('span')
    capturesSpan.style.padding = '0 12px 0 3px'
    capturesSpan.textContent = '0'

    const pointsIcon = document.createElement('i')
    pointsIcon.style.color = 'lime';
    pointsIcon.classList.add('fa-solid', 'fa-dollar-sign', 'stats-padding')

    const pointsSpan = document.createElement('span')
    pointsSpan.style.padding = '0 12px 0 3px'
    pointsSpan.style.color = 'lime';
    pointsSpan.textContent = '0'

    statsDiv.append(killsIcon, killsSpan, deathsIcon, deathsSpan, capturesIcon, capturesSpan, pointsIcon, pointsSpan)
    infoDiv.append(usernameP, statsDiv)
    if (team1Roster.includes(player)) element.append(img, infoDiv)
    else element.append(infoDiv, img)

    // Append the created element to the appropriate roster
    if (team1Roster.includes(player)) {
      document.querySelector('.team1-roster ul').appendChild(element)
    } else if (team2Roster.includes(player)) {
      document.querySelector('.team2-roster ul').appendChild(element)
    }
  }

  // Update stats if they exist
  const statsDiv = element.querySelector('.stats')
  if (statsDiv) {
    statsDiv.querySelector('.fa-crosshairs + span').textContent = data.kills
    statsDiv.querySelector('.fa-skull + span').textContent = data.deaths
    statsDiv.querySelector('.fa-flag + span').textContent = data.captures
    statsDiv.querySelector('.fa-dollar-sign + span').textContent = data.points
  }
}

function fetchPlayerData () {
  const allPlayers = [...team1Roster, ...team2Roster]

  allPlayers.forEach(player => {
    console.log(player)
    fetch(`http://localhost:22000/api/player?p=${player}`)
      .then(response => response.json())
      .then(data => {
        if (data.error === 'Player not found.') {
          // Handle the case where player is not found (offline)
          const offlineData = {
            kills: 0,
            deaths: 0,
            captures: 0,
            points: 0
          }
          updatePlayerHUD(player, offlineData)
        } else {
          updatePlayerHUD(player, data)
        }
      })
      .catch(error => {
        console.error(`Error fetching data for ${player}:`, error)
      })
  })
}

let gameDataIntervalStarted = false

// Fetch game data every second
setInterval(() => {
  fetchGameData()
  gameDataIntervalStarted = true // Set the flag once the interval starts
}, 1000)

// Fetch player data every 5 seconds
setInterval(fetchPlayerData, 5000)

function setupInitialHUDs () {
  const allPlayers = [...team1Roster, ...team2Roster]

  allPlayers.forEach(player => {
    const offlineData = {
      kills: 0,
      deaths: 0,
      captures: 0,
      points: 0
    }

    updatePlayerHUD(player, offlineData)
  })
}

// Check if the game data interval has started, and then set up initial HUDs
function checkAndSetupInitialHUDs () {
  if (gameDataIntervalStarted) {
    setupInitialHUDs()
  } else {
    setTimeout(checkAndSetupInitialHUDs, 100) // Check again in 100 milliseconds
  }
}

// Start checking and setting up HUDs
checkAndSetupInitialHUDs()
