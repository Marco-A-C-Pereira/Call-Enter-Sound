export default function ConnectionStatus({ pipeObj }) {
  const { name, state } = pipeObj

  return (
    <div>
      <p>
        {name} Status: {state === true ? 'on' : 'off'}
      </p>
    </div>
  )
}
