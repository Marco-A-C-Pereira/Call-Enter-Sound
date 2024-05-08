const soundsDiv = document.getElementById("soundsDiv");

const soundBtn = document.getElementById("playSound");
soundBtn.addEventListener("click", async () => {
  await window.soundpad.playSound();
});
