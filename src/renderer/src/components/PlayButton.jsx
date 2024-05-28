export default function PlayButton() {
  const playSound = () => window.api.playSound()

  return (
    <div>
      <button className="bg-red-300 rounded-md p-2" onClick={playSound}>PlayButton</button>
    </div>
  )
}
