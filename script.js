let team1Roster = []
let team2Roster = []

function reload () {
  const team1Name = localStorage.getItem('team1')
  const team2Name = localStorage.getItem('team2')

  // Update team names and scores
  document.getElementById('team1').innerHTML = team1Name || 'Team 1'
  document.getElementById('team2').innerHTML = team2Name || 'Team 2'

  setTeamNameFontSize()

  // Update Team 1 roster
  const team1RosterElement = document.querySelector('.team1-roster ul')
  team1RosterElement.innerHTML = ''

  if (team1Roster.length > 0) {
    team1Roster.forEach(player => {
      const listItem = document.createElement('li')
      listItem.classList.add('player-item')
      listItem.setAttribute('id', 'player-' + player)

      const img = document.createElement('img')
      img.src = `https://123dmwm.com/img/skin/3d.php?user=${player}`
      img.width = '48'
      img.height = '48'

      const infoDiv = document.createElement('div')
      infoDiv.classList.add('info')

      const usernameP = document.createElement('p')
      usernameP.classList.add('username', 'red')
      usernameP.textContent = player

      const statsDiv = document.createElement('div')
      statsDiv.classList.add('stats')

      const killsIcon = document.createElement('i')
      killsIcon.classList.add('fa-solid', 'fa-skull')

      const killsSpan = document.createElement('span')
      killsSpan.style.padding = '0 12px 0 3px'
      killsSpan.textContent = 'Kills: 0'

      const deathsIcon = document.createElement('i')
      deathsIcon.classList.add('fa-solid', 'fa-cross')

      const deathsSpan = document.createElement('span')
      deathsSpan.style.padding = '0 12px 0 3px'
      deathsSpan.textContent = 'Deaths: 0'

      const capturesIcon = document.createElement('i')
      capturesIcon.classList.add('fa-solid', 'fa-flag')

      const capturesSpan = document.createElement('span')
      capturesSpan.style.padding = '0 12px 0 3px'
      capturesSpan.textContent = 'Captures: 0'

      statsDiv.append(killsIcon, killsSpan, deathsIcon, deathsSpan, capturesIcon, capturesSpan)

      infoDiv.append(usernameP, statsDiv)

      listItem.append(img, infoDiv)

      team1RosterElement.appendChild(listItem)
    })
  }

  // Update Team 2 roster
  const team2RosterElement = document.querySelector('.team2-roster ul')
  team2RosterElement.innerHTML = ''

  if (team2Roster.length > 0) {
    team2Roster.forEach(player => {
      const listItem = document.createElement('li')
      listItem.classList.add('player-item')
      listItem.setAttribute('id', 'player-' + player)

      const infoDiv = document.createElement('div')
      infoDiv.classList.add('info')

      const usernameP = document.createElement('p')
      usernameP.classList.add('username', 'blue')
      usernameP.textContent = player

      const statsDiv = document.createElement('div')
      statsDiv.classList.add('stats')

      const killsIcon = document.createElement('i')
      killsIcon.classList.add('fa-solid', 'fa-skull')

      const killsSpan = document.createElement('span')
      killsSpan.style.padding = '0 12px 0 3px'
      killsSpan.textContent = 'Kills: 0'

      const deathsIcon = document.createElement('i')
      deathsIcon.classList.add('fa-solid', 'fa-cross')

      const deathsSpan = document.createElement('span')
      deathsSpan.style.padding = '0 12px 0 3px'
      deathsSpan.textContent = 'Deaths: 0'

      const capturesIcon = document.createElement('i')
      capturesIcon.classList.add('fa-solid', 'fa-flag')

      const capturesSpan = document.createElement('span')
      capturesSpan.style.padding = '0 12px 0 3px'
      capturesSpan.textContent = 'Captures: 0'

      statsDiv.append(killsIcon, killsSpan, deathsIcon, deathsSpan, capturesIcon, capturesSpan)

      infoDiv.append(usernameP, statsDiv)

      const img = document.createElement('img')
      img.src = `https://123dmwm.com/img/skin/3d.php?user=${player}`
      img.width = '48'
      img.height = '48'

      listItem.append(infoDiv, img)

      team2RosterElement.appendChild(listItem)
    })
  }

  // Update game wins display
  const maxGames = localStorage.getItem('maxGames')
  updateGameWins(maxGames)
}

reload()

function setTeamNameFontSize () {
  const team1NameElement = document.getElementById('team1')
  const team2NameElement = document.getElementById('team2')

  const maxFontSize = 24 // Maximum font size you want to allow
  const maxNameLength = 6 // Maximum characters you want to display without resizing

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
  const element = document.getElementById('player-' + player)

  const statsDiv = document.createElement('div')
  statsDiv.classList.add('stats')

  const killsIcon = document.createElement('i')
  killsIcon.classList.add('fa-solid', 'fa-skull')

  const killsSpan = document.createElement('span')
  killsSpan.style.padding = '0 12px 0 3px'
  killsSpan.textContent = `Kills: ${data.kills}`

  const deathsIcon = document.createElement('i')
  deathsIcon.classList.add('fa-solid', 'fa-cross')

  const deathsSpan = document.createElement('span')
  deathsSpan.style.padding = '0 12px 0 3px'
  deathsSpan.textContent = `Deaths: ${data.deaths}`

  const capturesIcon = document.createElement('i')
  capturesIcon.classList.add('fa-solid', 'fa-flag')

  const capturesSpan = document.createElement('span')
  capturesSpan.style.padding = '0 12px 0 3px'
  capturesSpan.textContent = `Captures: ${data.captures}`

  statsDiv.append(killsIcon, killsSpan, deathsIcon, deathsSpan, capturesIcon, capturesSpan)

  // Check if stats already exist
  const existingStatsDiv = element.querySelector('.stats')
  if (existingStatsDiv) {
    existingStatsDiv.innerHTML = statsDiv.innerHTML // Update existing stats
  } else {
    element.appendChild(statsDiv) // Add stats if they don't exist
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
            captures: 0
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

// Fetch game data every second
setInterval(fetchGameData, 1000)

// Fetch player data every 5 seconds
setInterval(fetchPlayerData, 5000)
