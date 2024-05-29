import ConnectionStatus from './components/ConnectionStatus'
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

  return (
    <div className="font-sans">
      <div className="flex justify-center gap-6 pt-4 bg-purple-400">
        <ConnectionStatus pipeObj={soundpadPipeStatus} />
        <ConnectionStatus pipeObj={discordWebsocketStatus} />
        <button className="ml-auto mr-4 bg-red-400 cursor-pointer">Gear</button>
      </div>
      <SoundList />
    </div>
  )
}

export default App
