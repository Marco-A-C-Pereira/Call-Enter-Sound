import { useState } from 'react'

export default function Checkbox({ label, storageKey }) {
  const [checkboxState, setCheckboxState] = useState(window.storage.get(storageKey))

  function handleCheckboxState() {
    setCheckboxState((prevCheckboxState) => !prevCheckboxState)
    window.storage.set(storageKey, !checkboxState)
  }

  return (
    <div className="flex">
      <input type="checkbox" checked={checkboxState} onChange={handleCheckboxState} />
      <p className="text-xl">{label}</p>
    </div>
  )
}
