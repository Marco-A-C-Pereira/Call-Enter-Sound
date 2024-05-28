import { exec } from 'child_process'

export { isRunning, wait, watcher }

async function isRunning(processName) {
  return new Promise((resolve, reject) => {
    exec('tasklist', (err, stdout, stderr) => {
      const isProcessRunning = stdout.toLowerCase().indexOf(processName.toLowerCase()) > -1

      resolve(isProcessRunning)
    })
  })
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function watcher(processName, startFunction) {
  const watcherInterval = setInterval(async () => {
    if (await isRunning(processName)) {
      clearInterval(watcherInterval)
      startFunction()
    }
  }, 1250)
}
