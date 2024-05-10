import { GameObj, Vec2 } from "kaboom";
import { AnimTypes } from "../constants/animationTypes";

export const moveToLocation = (player: GameObj, angle: number, location?: Vec2) => {
  const lowerBound = 50;
  const upperBound = 125;

  if (angle > -upperBound && angle < -lowerBound && player.curAnim() !== AnimTypes.WALK_DOWN) {
    player.play(AnimTypes.WALK_DOWN)
    player.direction = "down";
  } else if (angle > lowerBound && angle < upperBound && player.curAnim() !== AnimTypes.WALK_UP) {
    player.play(AnimTypes.WALK_UP)
    player.direction = "up";
  } else if (Math.abs(angle) > upperBound) {
    player.flipX = false;
    if (player.curAnim() !== AnimTypes.WALK_SIDE) player.play(AnimTypes.WALK_SIDE);
    player.direction = "left";
  } else if (Math.abs(angle) < lowerBound) {
    player.flipX = true;
    if (player.curAnim() !== AnimTypes.WALK_SIDE) player.play(AnimTypes.WALK_SIDE);
    player.direction = "right";
  }

  if (location)
    player.moveTo(location, player.speed);
  else
    player.move(angle, player.speed);

  return;
}

export const stopAnim = (player: GameObj) => {
  if (player.direction === "up") {
    player.play(AnimTypes.IDLE_UP);
  } else if (player.direction === "down") {
    player.play(AnimTypes.IDLE_DOWN);
  } else {
    player.play(AnimTypes.IDLE_SIDE);
  }
}