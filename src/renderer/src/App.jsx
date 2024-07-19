import { Cog6ToothIcon } from '@heroicons/react/16/solid'
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
    <div className="font-sans h-screen max-h-screen overflow-hidden flex flex-col px-12 py-8 bg-[url('../assets/hexagons.svg')]">
      <Cog6ToothIcon
        onClick={handleDrawerState}
        className="fill-purple-700 absolute h-16 right-2 top-2 bg-red-400 p-1 rounded-lg cursor-pointer"
      />
      {isDrawerOpen ? <Drawer discordPipe={discordWebsocketStatus} drawerHandler={handleDrawerState} /> : ''}
      <div className="flex flex-col relative w-fit mx-auto bg-red-400 rounded-lg px-8 py-4">
        <h1 className="text-3xl uppercase font-extrabold text-center">Join announcer</h1>
        <div className="flex justify-center gap-12 ">
          <ConnectionStatus pipeObj={soundpadPipeStatus} />
          <ConnectionStatus pipeObj={discordWebsocketStatus} />
        </div>
      </div>
      <SoundList />
    </div>
  )
}

export default App
