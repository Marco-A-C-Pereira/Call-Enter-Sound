import ConnectionStatus from './components/ConnectionStatus'
import PlayButton from './components/PlayButton'
import { useState } from 'react'

function App() {
  window.api.updatePipe((value) => {
    setSoundpadPipeStatus(value)
  })

  // eslint-disable-next-line no-unused-vars
  const [soundpadPipeStatus, setSoundpadPipeStatus] = useState({
    name: 'Soundpad',
    state: false
  })

  return (
    <>
      <div className="flex gap-6">
        <ConnectionStatus pipeObj={soundpadPipeStatus} />
      </div>
      <PlayButton />
    </>
  )
}

export default App
