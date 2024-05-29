export default function SoundItem({ soundInfo, isSelected, handleSelect }) {
  const { name, index, duration } = soundInfo
  const playSound = () => window.api.playSound(index)

  const selectedMark = (
    <div className="absolute top-0 flex flex-col items-center gap-1 rotate-45 -right-2">
      <div className="w-6 h-1 bg-purple-600"></div>
      <div className="w-8 h-1 bg-purple-600"></div>
    </div>
  )

  return (
    <button
      onClick={playSound}
      onDoubleClick={handleSelect}
      className="relative flex gap-1 px-4 py-2 overflow-hidden font-bold border border-black cursor-pointer bg-sky-400"
    >
      {isSelected ? selectedMark : ''}
      <p>{name}</p>
      <p>{duration}</p>
    </button>
  )
}
