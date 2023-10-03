if (localStorage.getItem('team1') === null) localStorage.setItem('team1', 'Team 1')
if (localStorage.getItem('team2') === null) localStorage.setItem('team2', 'Team 2')

if (localStorage.getItem('score1') === null) localStorage.setItem('score1', 'Score 1')
if (localStorage.getItem('score2') === null) localStorage.setItem('score2', 'Score 2')

const team1Input = document.getElementById('team1-selector')
const team2Input = document.getElementById('team2-selector')

team1Input.addEventListener('input', function (e) {
  localStorage.setItem('team1', e.target.value)
})

team1Input.addEventListener('propertychange', function (e) {
  localStorage.setItem('team1', e.target.value)
})

team2Input.addEventListener('input', function (e) {
  localStorage.setItem('team2', e.target.value)
})

team2Input.addEventListener('propertychange', function (e) {
  localStorage.setItem('team2', e.target.value)
})

const score1Input = document.getElementById('score1-input')
const score2Input = document.getElementById('score2-input')

score1Input.addEventListener('input', function (e) {
  localStorage.setItem('score1', e.target.value)
})

score1Input.addEventListener('propertychange', function (e) {
  localStorage.setItem('score1', e.target.value)
})

score2Input.addEventListener('input', function (e) {
  localStorage.setItem('score2', e.target.value)
})

score2Input.addEventListener('propertychange', function (e) {
  localStorage.setItem('score2', e.target.value)
})

// Function to update the team selector options and team list
function updateTeams () {
  const teamSelector1 = document.getElementById('team1-selector')
  const teamSelector2 = document.getElementById('team2-selector')
  const teamList = document.getElementById('team-list')
  teamSelector1.innerHTML = '' // Clear existing options
  teamSelector2.innerHTML = '' // Clear existing options
  teamList.innerHTML = '' // Clear existing team list

  // Get teams from local storage or initialize empty array
  const teams = JSON.parse(localStorage.getItem('teams')) || []

  // Create and append new option elements
  teams.forEach(function (team) {
    const option1 = document.createElement('option')
    option1.value = team
    option1.text = team
    teamSelector1.appendChild(option1)

    const option2 = document.createElement('option')
    option2.value = team
    option2.text = team
    teamSelector2.appendChild(option2)

    // Create list item with team name and delete button
    const listItem = document.createElement('li')
    listItem.textContent = team
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'
    deleteButton.classList.add('button-small')
    deleteButton.addEventListener('click', function () {
      removeTeam(team)
    })
    listItem.appendChild(deleteButton)
    teamList.appendChild(listItem)
  })
}

// Function to handle adding a team
function addTeam () {
  const teamName = document.getElementById('team-name-input').value
  if (teamName) {
    const teams = JSON.parse(localStorage.getItem('teams')) || []
    teams.push(teamName)
    localStorage.setItem('teams', JSON.stringify(teams))
    document.getElementById('team-name-input').value = '' // Clear input
    updateTeams()
  }
}

// Function to handle removing a team
function removeTeam (teamName) {
  const teams = JSON.parse(localStorage.getItem('teams')) || []
  const index = teams.indexOf(teamName)
  if (index !== -1) {
    teams.splice(index, 1)
    localStorage.setItem('teams', JSON.stringify(teams))
    updateTeams()
  }
}

// Function to update the player selector options
function updatePlayersSelector () {
  const playerTeamSelector = document.getElementById('player-team-selector')
  const teams = JSON.parse(localStorage.getItem('teams')) || []
  playerTeamSelector.innerHTML = '<option value="">Select Team</option>' // Reset options

  teams.forEach(function (team) {
    const option = document.createElement('option')
    option.value = team
    option.text = team
    playerTeamSelector.appendChild(option)
  })
}

// Function to handle adding a player
function addPlayer () {
  const playerName = document.getElementById('player-name-input').value
  const selectedTeam = document.getElementById('player-team-selector').value

  if (playerName && selectedTeam) {
    addTeamMember(selectedTeam, playerName)
    document.getElementById('player-name-input').value = '' // Clear input
    updatePlayers()
  }
}

// Function to handle adding a team member
function addTeamMember (teamName, playerName) {
  const teams = JSON.parse(localStorage.getItem('teams')) || []
  const teamIndex = teams.indexOf(teamName)
  if (teamIndex !== -1) {
    const teamMembers = JSON.parse(localStorage.getItem('teamMembers')) || {}
    if (!teamMembers[teamName]) {
      teamMembers[teamName] = []
    }
    teamMembers[teamName].push(playerName)
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers))
  }
}

// Function to handle removing a team member
function removeTeamMember (teamName, playerName) {
  const teamMembers = JSON.parse(localStorage.getItem('teamMembers')) || {}
  if (teamMembers[teamName]) {
    const playerIndex = teamMembers[teamName].indexOf(playerName)
    if (playerIndex !== -1) {
      teamMembers[teamName].splice(playerIndex, 1)
      localStorage.setItem('teamMembers', JSON.stringify(teamMembers))
    }
  }
}
// Function to update the player list
function updatePlayers () {
  const playerList = document.getElementById('player-list')
  playerList.innerHTML = '' // Clear existing player list

  const teams = JSON.parse(localStorage.getItem('teams')) || []
  const teamMembers = JSON.parse(localStorage.getItem('teamMembers')) || {}

  teams.forEach(function (team) {
    const teamPlayers = teamMembers[team] || []

    // Create a new list for each team
    const teamList = document.createElement('ul')

    teamPlayers.forEach(function (player) {
      const listItem = document.createElement('li')
      listItem.textContent = player
      teamList.appendChild(listItem)
    })

    // Create a heading for the team
    const teamHeading = document.createElement('h3')
    teamHeading.textContent = `Team ${team}`

    // Append the team heading and list to the player list container
    playerList.appendChild(teamHeading)
    playerList.appendChild(teamList)
  })
}

// Attach event listener to the add team button
document.getElementById('add-team-button').addEventListener('click', addTeam)

// Attach event listener to the add player button
document.getElementById('add-player-button').addEventListener('click', addPlayer)

// Initial setup
updateTeams()
updatePlayersSelector()
updatePlayers()

document.addEventListener('DOMContentLoaded', function () {
  // Set input values for team selectors
  const team1Input = document.getElementById('team1-selector')
  const team2Input = document.getElementById('team2-selector')
  team1Input.value = localStorage.getItem('team1') || 'Team 1'
  team2Input.value = localStorage.getItem('team2') || 'Team 2'

  // Set input values for score inputs
  const score1Input = document.getElementById('score1-input')
  const score2Input = document.getElementById('score2-input')
  score1Input.value = localStorage.getItem('score1') || '0'
  score2Input.value = localStorage.getItem('score2') || '0'
})
