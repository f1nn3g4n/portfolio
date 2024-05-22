import { GameObj, KaboomCtx } from "kaboom";
import { scaleFactor } from "./constants/scaleFactor";
import { DIALOGUE } from "./scenes/lobby/lobby.constants";
import { stopAnim } from "./actions/movement";
import { AnimTypes } from "./constants/animationTypes";

export const playerDialogue = (objName: string, player: GameObj) => {
  player.isInDialogue = true;
  const clearDialogue = () => {
    player.isInDialogue = false;
  };
  try {
    const dialogue = DIALOGUE[objName];
    if (!dialogue) throw new Error("Missing dialogue!");
    displayDialogue(dialogue, clearDialogue);
  } catch (e) {
    console.error(`Dialogue failed to display for ${objName}:`, e);
    player.isInDialogue = false;
  }
};

export const displayDialogue = (text: string, onDisplayEnd: () => void) => {
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");
  if (!dialogueUI || !dialogue)
    throw new Error("Missing dialogue html elements");

  dialogueUI.style.display = "block";
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
  if (!closeBtn) throw new Error("Missing close button html element");

  const onCloseBtnClick = () => {
    onDisplayEnd();
    dialogueUI!.style.display = "none";
    closeBtn.removeEventListener("click", onCloseBtnClick);
    removeEventListener("keypress", onKeyPress);
  };
  const onKeyPress = (key: KeyboardEvent) => {
    if (key.code === "Enter") closeBtn.click();
  };

  closeBtn.addEventListener("click", onCloseBtnClick);

  addEventListener("keypress", onKeyPress);
};

export const setCamScale = (k: KaboomCtx) => {
  const resizeFactor = k.width() / k.height();
  if (resizeFactor < 1) {
    k.camScale(k.vec2(1));
  } else {
    k.camScale(k.vec2(1.5));
  }
};

export const spawn = (
  k: KaboomCtx,
  location: { x: number; y: number },
  map: GameObj,
  obj: GameObj,
) => {
  obj.pos = k.vec2(
    (map.pos.x + location.x) * scaleFactor,
    (map.pos.y + location.y) * scaleFactor,
  );
  k.add(obj);
};

export const enableWASD = (k: KaboomCtx, player: GameObj) => {
  k.onKeyRelease(() => {
    stopAnim(player);
  });
  k.onKeyDown((_key) => {
    if (player.isInDialogue) return;

    const right = k.isKeyDown("d");
    const left = k.isKeyDown("a");
    const up = k.isKeyDown("w");
    const down = k.isKeyDown("s");

    if (right) {
      player.flipX = false;
      if (player.curAnim() !== AnimTypes.WALK_SIDE)
        player.play(AnimTypes.WALK_SIDE);
      player.direction = "right";
    } else if (left) {
      player.flipX = true;
      if (player.curAnim() !== AnimTypes.WALK_SIDE)
        player.play(AnimTypes.WALK_SIDE);
      player.direction = "left";
    } else if (up) {
      if (player.curAnim() !== AnimTypes.WALK_UP)
        player.play(AnimTypes.WALK_UP);
      player.direction = "up";
    } else if (down) {
      if (player.curAnim() !== AnimTypes.WALK_DOWN)
        player.play(AnimTypes.WALK_DOWN);
      player.direction = "down";
    }

    let xSpeed = 0;
    let ySpeed = 0;

    if (right || left) xSpeed = right ? player.speed : -player.speed;
    if (up || down) ySpeed = up ? -player.speed : player.speed;

    // Kaboom doesn't handle diagonal movement well, goes too fast
    if (xSpeed && ySpeed) {
      xSpeed /= 2;
      ySpeed /= 2;
    }

    player.move(xSpeed, ySpeed);
  });
};
