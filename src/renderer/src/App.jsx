import PlayButton from './components/PlayButton'
import electronLogo from './assets/electron.svg'

function App() {
  window.api.sendMsg((value) => {
    window.api.reciveMsg(value)
  })

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <PlayButton />
        </div>
      </div>
    </>
  )
}

export default App
