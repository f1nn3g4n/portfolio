import { AnimTypes } from "../../constants/animationTypes";
import { scaleFactor } from "../../constants/scaleFactor";
import { k } from "../../kaboomConfig";

export const PlayerAnims = {
  [AnimTypes.IDLE_DOWN]: 374,
  [AnimTypes.WALK_DOWN]: { from: 12, to: 15, loop: true, speed: 8 },
  [AnimTypes.IDLE_SIDE]: 50,
  [AnimTypes.WALK_SIDE]: { from: 48, to: 51, loop: true, speed: 8 },
  [AnimTypes.IDLE_UP]: 159,
  [AnimTypes.WALK_UP]: { from: 84, to: 87, loop: true, speed: 8 },
}

export const playerConfig = () => {
  k.loadSprite('harvey', './harvey.png', {
    sliceX: 36,
    sliceY: 14,
    anims: PlayerAnims
  });
  return [
    k.sprite('harvey', {anim: AnimTypes.IDLE_DOWN}),
    k.area({
      shape: new k.Rect(k.vec2(0,3), 16, 32)
    }),
    k.anchor("center"),
    k.pos(),
    // makes tangible
    k.body(),
    k.scale(scaleFactor),
    {
      speed: 400,
      direction: "down",
      isInDialogue: false,
    },
    "player",
  ]
}