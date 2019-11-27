const { BrowserWindow, app, Menu } = require('electron')
const { http } = require('./server')

const port = 3242

const createWindow = () => {
  global.win = new BrowserWindow(
    {
      frame: true,
      width: 1366,
      height: 788,
      resizable: false,
      center: true,
      transparent: true,
      backgroundColor: '#00FFFFFF',
      alwaysOnTop: false,
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true
      }
    }
  )

  global.win.loadURL(`http://localhost:${port}`, { userAgent: 'Chrome' })
  global.win.on('closed', () => {
    global.win = null
  })
  const menu = [
    {
      label: 'El podcast Setup',
      submenu: [
        { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: function () { app.quit() } }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select all', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click (_item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload()
          }
        },
        {
          label: 'Open dev tools',
          accelerator: 'CmdOrCtrl+Alt+i',
          click (_item, focusedWindow) {
            focusedWindow.webContents.openDevTools()
          }
        }
      ]
    }
  ]
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu))
}

app.on('ready', () => {
  http.listen(port, () => {
    createWindow()
  })
})

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (global.win === null) {
    createWindow()
  }
})
