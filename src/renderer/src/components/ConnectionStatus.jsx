export default function ConnectionStatus({ pipeObj }) {
  const { name, state } = pipeObj
  const bgColor = state === true ? 'bg-green-600' : 'bg-red-600'

  return (
    <div className="h-8 text-lg font-bold tracking-wide">
      <div className="flex items-center gap-2">
        <p>{name} Status:</p>
        <div
          className={`h-5 flex items-center justify-center  rounded-full shadow-inner shadow-cyan-500 border border-black aspect-square ${bgColor} `}
        >
          <div className="h-2 translate-x-1 -translate-y-1 bg-white rounded-full opacity-30 aspect-square" />
        </div>
      </div>
    </div>
  )
}
