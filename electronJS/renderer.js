const soundBtn = document.getElementById("playSound");
soundBtn.addEventListener("click", async () => {
  await window.soundpad.playSound();
});

const soundsDiv = document.getElementById("soundsDiv");
document.addEventListener("load", async () => {
  const soundList = await window.soundpad.getSounds();

  console.log(soundList);

  soundList.forEach((sound) => {
    const p = document.createElement("p");
    p.innerText = sound.name;

    soundsDiv.appendChild(p);
  });
});

// const body = document.getElementById("body");
// const pipeStatus = document.createElement("p");
// pipeStatus.innerText = window.soundpad.pipeStatus();

// soundsDiv.appendChild(pipeStatus);
