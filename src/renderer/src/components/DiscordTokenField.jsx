import { useState } from 'react'

export default function DiscordTokenField() {
  const [discordToken, setDiscordToken] = useState(window.storage.get('gatewayToken'))

  function handleTokenInput(inputValue) {
    setDiscordToken(inputValue)
    window.storage.set('gatewayToken', inputValue)
  }

  return (
    <>
      <label htmlFor="discord-key-input" className="block mb-2 text-md font-medium text-gray-900">
        Discord token
      </label>
      <input
        type="text"
        id="discord-key-input"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Your key here"
        value={discordToken}
        onChange={(e) => handleTokenInput(e.target.value)}
      />
      <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Never share this token anywhere.{' '}
        <a
          href="https://youtu.be/YEgFvgg7ZPI"
          target="_blank"
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          rel="noreferrer"
        >
          How to extract you discord token
        </a>
      </p>
    </>
  )
}
