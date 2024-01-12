const { app, BrowserWindow } = require('electron')
const http = require('http')
const fs = require('fs')

let mainWindow

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 })
  mainWindow.loadURL('http://localhost:3000') // Load a dummy URL

  const server = http.createServer((req, res) => {
    if (req.url === '/') {
      fs.readFile(__dirname + '/index.html', (err, data) => {
        if (err) {
          res.writeHead(404)
          res.end(JSON.stringify(err))
          return
        }
  
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data)
      })
    }
    
    else if (req.url === '/styles/style.css') {
      fs.readFile(__dirname + '/styles/style.css', (err, data) => {
        if (err) {
          res.writeHead(404)
          res.end(JSON.stringify(err))
          return
        }
  
        res.writeHead(200, { 'Content-Type': 'text/css' })
        res.end(data)
      })
    }
    
    else if (req.url === '/scripts/script.js') {
      fs.readFile(__dirname + '/scripts/script.js', (err, data) => {
        if (err) {
          res.writeHead(404)
          res.end(JSON.stringify(err))
          return
        }
  
        res.writeHead(200, { 'Content-Type': 'application/javascript' })
        res.end(data)
      })
    }
    
    else if (req.url === '/scripts/admin.js') {
      fs.readFile(__dirname + '/scripts/admin.js', (err, data) => {
        if (err) {
          res.writeHead(404)
          res.end(JSON.stringify(err))
          return
        }
  
        res.writeHead(200, { 'Content-Type': 'application/javascript' })
        res.end(data)
      })
    }
    
    else if (req.url.startsWith("/fonts/")) {
      fs.readFile(__dirname + '/fonts/' + req.url.replace('/fonts/', ''), (err, data) => {
        if (err) {
          res.writeHead(404)
          res.end(JSON.stringify(err))
          return
        }
  
        res.writeHead(200, { 'Content-Type': 'font/otf' })
        res.end(data)
      })
    }

    else if (req.url.startsWith("/images/")) {
      fs.readFile(__dirname + '/images/' + req.url.replace('/images/', ''), (err, data) => {
        if (err) {
          res.writeHead(404)
          res.end(JSON.stringify(err))
          return
        }
  
        res.writeHead(200, { 'Content-Type': 'image/png' })
        res.end(data)
      })
    }
    
    else if (req.url === '/map-bans.html') {
      fs.readFile(__dirname + '/map-bans.html', (err, data) => {
        if (err) {
          res.writeHead(404)
          res.end(JSON.stringify(err))
          return
        }
  
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data)
      })
    }
    
    else if (req.url === '/admin.html') {
      fs.readFile(__dirname + '/admin.html', (err, data) => {
        if (err) {
          res.writeHead(404)
          res.end(JSON.stringify(err))
          return
        }
  
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data)
      })
    }
    
    else if (req.url === '/starting-soon.html') {
      fs.readFile(__dirname + '/starting-soon.html', (err, data) => {
        if (err) {
          res.writeHead(404)
          res.end(JSON.stringify(err))
          return
        }
  
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data)
      })
    }
    
    else if (req.url === '/bracket.html') {
      fs.readFile(__dirname + '/bracket.html', (err, data) => {
        if (err) {
          res.writeHead(404)
          res.end(JSON.stringify(err))
          return
        }
  
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data)
      })
    }
  }) 

  server.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
