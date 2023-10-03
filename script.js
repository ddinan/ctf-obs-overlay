function reload (team1Roster = [], team2Roster = []) {
  const team1Name = localStorage.getItem('team1')
  const team2Name = localStorage.getItem('team2')

  // Update team names and scores
  document.getElementById('team1').innerHTML = team1Name || 'Team 1'
  document.getElementById('team2').innerHTML = team2Name || 'Team 2'

  console.log(team1Roster)
  console.log(team2Roster)

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
}

reload()

let lastTeam1 = localStorage.getItem('team1')
let lastTeam2 = localStorage.getItem('team2')
let lastTeam1Roster = JSON.parse(localStorage.getItem('teamMembers'))['Team 1'] || []
let lastTeam2Roster = JSON.parse(localStorage.getItem('teamMembers'))['Team 2'] || []

function checkAndUpdate () {
  const currentTeam1 = localStorage.getItem('team1')
  const currentTeam2 = localStorage.getItem('team2')
  const currentTeam1Roster = JSON.parse(localStorage.getItem('teamMembers'))['Team 1'] || []
  const currentTeam2Roster = JSON.parse(localStorage.getItem('teamMembers'))['Team 2'] || []

  let hasChanges = false

  if (
    currentTeam1 !== lastTeam1 ||
    currentTeam2 !== lastTeam2
  ) {
    hasChanges = true
  }

  if (!arraysAreEqual(currentTeam1Roster, lastTeam1Roster) ||
      !arraysAreEqual(currentTeam2Roster, lastTeam2Roster)) {
    hasChanges = true
  }

  if (hasChanges) {
    reload() // Update the information

    // Update last known state
    lastTeam1 = currentTeam1
    lastTeam2 = currentTeam2
    lastTeam1Roster = currentTeam1Roster.slice()
    lastTeam2Roster = currentTeam2Roster.slice()
  }

  // Schedule the next check
  setTimeout(checkAndUpdate, 1000) // Check every second
}

function arraysAreEqual (arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }

  return true
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

function fetchGameData () {
  fetch('http://localhost:22000/api/game')
    .then(response => response.json())
    .then(data => {
      updateScoreboardHUD(data)

      // Update team rosters based on the response
      const team1Roster = data.redPlayers || []
      const team2Roster = data.bluePlayers || []

      // Call the reload function with updated rosters
      reload(team1Roster, team2Roster)
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
  const team1Roster = JSON.parse(localStorage.getItem('teamMembers'))[localStorage.getItem('team1')] || []
  const team2Roster = JSON.parse(localStorage.getItem('teamMembers'))[localStorage.getItem('team2')] || []

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
