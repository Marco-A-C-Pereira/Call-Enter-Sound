import Checkbox from './Checkbox'
import DiscordTokenField from './DiscordTokenField.jsx'
import { XCircleIcon } from '@heroicons/react/16/solid'

export default function Drawer({ drawerHandler, discordPipe }) {
  return (
    <div className="fixed flex top-0 left-0 h-full w-full z-40">
      <div onClick={drawerHandler} className="w-7/12 h-full bg-pink-500 z-50 opacity-70" />
      <div className="w-5/12 h-full flex flex-col bg-lime-500 z-50 ">
        <XCircleIcon
          onClick={drawerHandler}
          className="h-16 cursor-pointer w-fit ml-auto mt-2 mr-2"
        />
        <h2 className="font-bold text-2xl text-center mb-2">Settings</h2>
        <div className="flex flex-col gap-2 mx-4">
          <Checkbox storageKey={'playOnUnmute'} label={'Play sound after unmute'} />
          <Checkbox storageKey={'playOnSpeakers'} label={'Hear you sound when playing'} />
          <div>
            <DiscordTokenField />
            <p className="font-bold">
              Discord Auth Status: {discordPipe.state ? 'sucess' : 'fail'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
