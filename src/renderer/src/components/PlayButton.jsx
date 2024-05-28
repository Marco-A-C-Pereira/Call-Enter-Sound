export default function PlayButton() {
  const playSound = () => window.api.playSound()

  return (
    <div>
      <button onClick={playSound}>PlayButton</button>
    </div>
  )
}
