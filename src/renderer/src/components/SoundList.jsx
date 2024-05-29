import SoundItem from './SoundItem'
import { useState } from 'react'

export default function SoundList() {
  window.api.sendSounds((soundList) => {
    setSoundList(soundList)
  })

  const [soundList, setSoundList] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(window.storage.get('selectedSound'))

  function handleSelectSound(index) {
    window.storage.set('selectedSound', index)
    setSelectedIndex(index)
  }

  return (
    <div className="flex flex-wrap gap-4 px-6 pt-8">
      {soundList.length < 1
        ? ''
        : soundList.map((sound) => {
            return (
              <SoundItem
                key={sound.index}
                soundInfo={sound}
                isSelected={sound.index == selectedIndex}
                handleSelect={() => handleSelectSound(sound.index)}
              />
            )
          })}
    </div>
  )
}
