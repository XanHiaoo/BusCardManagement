var electron =require('electron')
var app=electron.app
var BrowserWindow=electron.BrowserWindow
var mainWindow=null

app.on('ready',()=>{
    mainWindow=new BrowserWindow({width:800,height:800,
        webPreferences:{nodeIntegration:true,
            contextIsolation: false,/*很关键*/
            enableRemoteModule:true}
    });
    mainWindow.loadFile('mainwindow.html')
    mainWindow.on('closedd',()=>{
        mainWindow=null
    })
})