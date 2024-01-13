if (localStorage.getItem('team1') === null) localStorage.setItem('team1', 'Team 1')
if (localStorage.getItem('team2') === null) localStorage.setItem('team2', 'Team 2')

const team1Input = document.getElementById('team1-selector')
const team2Input = document.getElementById('team2-selector')

team1Input.addEventListener('input', function (e) {
  localStorage.setItem('team1', e.target.value)

  const logo = localStorage.getItem(e.target.value + '_logo') || './images/placeholder-logo.png'
  localStorage.setItem('team1Logo', logo)
})

team1Input.addEventListener('propertychange', function (e) {
  localStorage.setItem('team1', e.target.value)
})

team2Input.addEventListener('input', function (e) {
  localStorage.setItem('team2', e.target.value)

  const logo = localStorage.getItem(e.target.value + '_logo') || './images/placeholder-logo.png'
  localStorage.setItem('team2Logo', logo)
})

team2Input.addEventListener('propertychange', function (e) {
  localStorage.setItem('team2', e.target.value)
})

const maxGamesInput = document.getElementById('max-games-input')

maxGamesInput.addEventListener('input', function (e) {
  localStorage.setItem('maxGames', e.target.value)
})

maxGamesInput.addEventListener('propertychange', function (e) {
  localStorage.setItem('maxGames', e.target.value)
})

const team1Wins = document.getElementById('team1-wins-input')
const team2Wins = document.getElementById('team2-wins-input')

team1Wins.addEventListener('input', function (e) {
  localStorage.setItem('team1Wins', e.target.value)
})

team1Wins.addEventListener('propertychange', function (e) {
  localStorage.setItem('team1Wins', e.target.value)
})

team2Wins.addEventListener('input', function (e) {
  localStorage.setItem('team2Wins', e.target.value)
})

team2Wins.addEventListener('propertychange', function (e) {
  localStorage.setItem('team2Wins', e.target.value)
})

const bracketInput = document.getElementById('bracket-input')

bracketInput.addEventListener('input', function (e) {
  localStorage.setItem('bracketURL', e.target.value)
})

bracketInput.addEventListener('propertychange', function (e) {
  localStorage.setItem('bracketURL', e.target.value)
})

const eventNameInput = document.getElementById('event-name-input')

eventNameInput.addEventListener('input', function (e) {
  localStorage.setItem('eventName', e.target.value)
})

eventNameInput.addEventListener('propertychange', function (e) {
  localStorage.setItem('eventName', e.target.value)
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
    deleteButton.classList.add('button-small-red')
    deleteButton.addEventListener('click', function () {
      removeTeam(team)
    })

    const logoButton = document.createElement('button')
    logoButton.textContent = 'Upload logo'
    logoButton.classList.add('button-small')
    logoButton.addEventListener('click', function () {
      uploadLogo(team)
    })

    listItem.appendChild(deleteButton)
    listItem.appendChild(logoButton)
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

function uploadLogo(teamName) {
  let logo = prompt('Please enter a URL to the logo', './images/placeholder-logo.png')

  if (logo != null) {
    localStorage.setItem(teamName + '_logo', logo)
  }
}

// Attach event listener to the add team button
document.getElementById('add-team-button').addEventListener('click', addTeam)

// Initial setup
updateTeams()

document.addEventListener('DOMContentLoaded', function () {
  // Set input values for team selectors
  const team1Input = document.getElementById('team1-selector')
  const team2Input = document.getElementById('team2-selector')
  team1Input.value = localStorage.getItem('team1') || 'Team 1'
  team2Input.value = localStorage.getItem('team2') || 'Team 2'

  maxGamesInput.value = localStorage.getItem('maxGames') || 3

  team1Wins.value = localStorage.getItem('team1Wins') || 0
  team2Wins.value = localStorage.getItem('team2Wins') || 0
})
