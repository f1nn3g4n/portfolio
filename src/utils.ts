import { GameObj, KaboomCtx } from "kaboom";
import { scaleFactor } from "./constants/scaleFactor";

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
