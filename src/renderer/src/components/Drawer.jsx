import Checkbox from './Checkbox'
import { XCircleIcon } from '@heroicons/react/16/solid'
import { useState } from 'react';

export default function Drawer({ drawerHandler }) {
  const [discordToken, setDiscordToken] = useState(window.storage.get('gatewayToken'))

  function handleTokenInput(inputValue) {
    setDiscordToken(inputValue)
    window.storage.set('gatewayToken', inputValue)
  }

  return (
    <div className="fixed flex top-0 left-0 h-full w-full z-40">
      <div onClick={drawerHandler} className="w-2/3 h-full bg-pink-500 z-50 opacity-70" />
      <div className="w-1/3 h-full flex flex-col bg-lime-500 z-50 ">
        <XCircleIcon
          onClick={drawerHandler}
          className="h-16 cursor-pointer w-fit ml-auto mt-2 mr-2"
        />
        <h2 className="font-bold text-2xl text-center mb-2">Settings</h2>
        <div className="flex flex-col gap-2 ml-4">
          <Checkbox storageKey={'playOnUnmute'} label={'Play sound after unmute'} />
          <Checkbox storageKey={'playOnSpeakers'} label={'Hear you sound when playing'} />
          <div>
            <label
              htmlFor="discord-key-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Discord portal key
            </label>
            <input
              type="text"
              id="discord-key-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your key here"
              value={discordToken}
              onChange={e => handleTokenInput(e.target.value) }
            />
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              Never share this key anywhere.{' '}
              <a
                href="https://youtu.be/YEgFvgg7ZPI"
                target="_blank"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                rel="noreferrer"
              >
                How to extract you discord key
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
