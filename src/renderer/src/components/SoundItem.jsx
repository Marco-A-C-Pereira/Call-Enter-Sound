export default function SoundItem({ soundInfo }) {
  const { name, index, duration } = soundInfo
  const playSound = () => window.api.playSound(index)

  return (
    <button
      onClick={playSound}
      className="relative flex gap-1 px-4 py-2 overflow-hidden font-bold border border-black cursor-pointer bg-sky-400"
    >
      <div className="absolute top-0 flex flex-col items-center gap-1 rotate-45 -right-2">
        <div className="w-6 h-1 bg-purple-600"></div>
        <div className="w-8 h-1 bg-purple-600"></div>
      </div>
      <p>{name}</p>
      <p>{duration}</p>
    </button>
  )
}
