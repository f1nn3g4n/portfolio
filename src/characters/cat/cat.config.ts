import { AnimTypes } from "../../constants/animationTypes";
import { scaleFactor } from "../../constants/scaleFactor";
import { k } from "../../kaboomConfig";

export const CatAnims = {
  [AnimTypes.IDLE_DOWN]: { from: 28, to: 29, loop: true, speed: 2 },
  [AnimTypes.WALK_DOWN]: { from: 0, to: 3, loop: true, speed: 8 },
  [AnimTypes.IDLE_SIDE]: { from: 20, to: 23, loop: true, speed: 4},
  [AnimTypes.WALK_SIDE]: { from: 4, to: 7, loop: true, speed: 8 },
  [AnimTypes.IDLE_UP]: 18,
  [AnimTypes.WALK_UP]: { from: 8, to: 11, loop: true, speed: 8 },
}

export const catConfig = (name: string, sliceY = 9) => {
  k.loadSprite(`${name}Sprite`, `./${name}.png`, {
    sliceX: 4,
    sliceY,
    anims: CatAnims,
  });
  return [
    k.sprite(`${name}Sprite`, {anim: AnimTypes.IDLE_DOWN}),
    k.area({
      shape: new k.Rect(k.vec2(0,3), 10, 10)
    }),
    k.anchor("center"),
    k.pos(),
    k.body(),
    k.scale(scaleFactor),
    {
      speed: 5,
      direction: "down",
      isInDialogue: false,
    },
    name,
  ]
}