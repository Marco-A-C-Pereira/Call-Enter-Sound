import PlayButton from './components/PlayButton'

function App() {
  window.api.sendMsg((value) => {
    window.api.reciveMsg(value)
  })

  return (
    <>
          <PlayButton />
    </>
  )
}

export default App
