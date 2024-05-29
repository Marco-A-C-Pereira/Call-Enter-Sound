import ConnectionStatus from './components/ConnectionStatus'
import Drawer from './components/Drawer.jsx'
import SoundList from './components/SoundList'
import { useState } from 'react'

function App() {
  window.api.updatePipe((value) => {
    switch (value.name) {
      case 'Soundpad':
        setSoundpadPipeStatus(value)
        break
      case 'Discord':
        setDiscordWebsocketStatus(value)
    }
  })

  // eslint-disable-next-line no-unused-vars
  const [soundpadPipeStatus, setSoundpadPipeStatus] = useState({
    name: 'Soundpad',
    state: false
  })

  const [discordWebsocketStatus, setDiscordWebsocketStatus] = useState({
    name: 'Discord',
    state: false
  })

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  function handleDrawerState() {
    setIsDrawerOpen((prevIsDrawerOpen) => !prevIsDrawerOpen)
  }

  return (
    <div className="font-sans">
      {isDrawerOpen ? <Drawer drawerHandler={handleDrawerState} /> : ''}
      <div className="flex justify-center gap-6 pt-4 bg-purple-400">
        <ConnectionStatus pipeObj={soundpadPipeStatus} />
        <ConnectionStatus pipeObj={discordWebsocketStatus} />
        <button onClick={handleDrawerState} className="ml-auto mr-4 bg-red-400 cursor-pointer">
          Gear
        </button>
      </div>
      <SoundList />
    </div>
  )
}

export default App
