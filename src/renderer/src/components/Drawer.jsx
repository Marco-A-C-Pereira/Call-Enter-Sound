import Checkbox from './Checkbox'

export default function Drawer({ drawerHandler }) {
  return (
    <div className="fixed flex h-full w-full z-40">
      <div onClick={drawerHandler} className="w-2/3 h-full bg-pink-500 z-50 opacity-70" />
      <div className="w-1/3 h-full  flex flex-col bg-lime-500 z-50">
        <button onClick={drawerHandler} className="ml-auto mt-2 mr-2 h-fit border border-black">
          X
        </button>
        <p>Settings</p>
        <div>
          <Checkbox storageKey={'playOnUnmute'} label={'Play sound after unmute'} />
          <Checkbox storageKey={'playOnSpeakers'} label={'Hear you sound when playing'} />
        </div>
      </div>
    </div>
  )
}
