function ColorBall({ state }) {
  const shadowSate = state ? 'shadow-[inset_0_0_0_20px_rgb(132,204,22)]' : ''

  return (
    <div
      className={
        'h-5 flex items-center justify-center rounded-full transition-shadow duration-500 aspect-square bg-sky-400 ' +
        shadowSate
      }
    />
  )
}

export default function ConnectionStatus({ pipeObj }) {
  const { name, state } = pipeObj
  // const [flipper, setflipper] = useState(false)

  // setInterval(() => {
  //   setflipper((prevflipper) => !prevflipper)
  // }, 3000)

  return (
    <div className="h-8 text-lg font-bold tracking-wide ">
      <div className="flex items-center gap-2">
        <p className="">{name}:</p>
        <ColorBall state={state} />
      </div>
    </div>
  )
}
