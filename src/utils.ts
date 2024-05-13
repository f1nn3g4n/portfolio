import { GameObj, KaboomCtx } from "kaboom";
import { scaleFactor } from "./constants/scaleFactor";
import { DIALOGUE } from "./scenes/lobby/lobby.constants";

export const playerDialogue = (objName: string, player: GameObj) => {
  player.isInDialogue = true;
  try {
    const dialogue = DIALOGUE[objName];
    if (!dialogue) throw new Error('Missing dialogue!');
    displayDialogue(dialogue, () => player.isInDialogue = false)
  } catch (e) {
    console.error(`Dialogue failed to display for ${objName}:`, e);
    player.isInDialogue = false;
  }
}

export const displayDialogue = (text: string, onDisplayEnd: () => {}) => {
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");
  if (!dialogueUI || !dialogue) throw new Error('Missing dialogue html elements');

  dialogueUI.style.display = 'block';
  let index = 0;
  let currentText = "";

  // Display text one character at a time
  const intervalRef = setInterval(() => {
    if (index < text.length) {
      currentText += text[index];
      dialogue.innerHTML = currentText;
      index++;
      return;
    }

    clearInterval(intervalRef);
  }, 1);

  const closeBtn = document.getElementById("close");
  if (!closeBtn) throw new Error('Missing close button html element');

  const onCloseBtnClick = () => {
    onDisplayEnd();
    dialogueUI!.style.display = 'none';
    dialogue!.innerHTML = "";
    clearInterval(intervalRef);
    closeBtn!.removeEventListener("click", onCloseBtnClick);
  }

  closeBtn.addEventListener("click", onCloseBtnClick);

  addEventListener("keypress", (key) => {
    if (key.code === "Enter") {
      closeBtn.click();
    }
  });
}

export const setCamScale = (k: KaboomCtx) => {
  const resizeFactor = k.width() / k.height();
  if (resizeFactor < 1) {
    k.camScale(k.vec2(1));
  } else {
    k.camScale(k.vec2(1.5));
  }
}

export const spawn = (
  k: KaboomCtx, 
  location: {x: number, y: number}, 
  map: GameObj,
  obj: GameObj
) => {
  obj.pos = k.vec2(
    (map.pos.x + location.x) * scaleFactor,
    (map.pos.y + location.y) * scaleFactor
  );
  k.add(obj);
}
