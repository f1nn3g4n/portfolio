import { GameObj, Vec2 } from "kaboom";
import { Character } from "../characters/character.type";
import { AnimTypes } from "../constants/animationTypes";

/** Move to location as long as called */
export const moveToLocation = (player: Character, location: Vec2) => {
  const lowerBound = 50;
  const upperBound = 125;
  const angle = player.pos.angle(location);

  if (
    angle > -upperBound &&
    angle < -lowerBound &&
    player.curAnim() !== AnimTypes.WALK_DOWN
  ) {
    player.play(AnimTypes.WALK_DOWN);
    player.direction = "down";
  } else if (
    angle > lowerBound &&
    angle < upperBound &&
    player.curAnim() !== AnimTypes.WALK_UP
  ) {
    player.play(AnimTypes.WALK_UP);
    player.direction = "up";
  } else if (Math.abs(angle) > upperBound) {
    player.flipX = false;
    if (player.curAnim() !== AnimTypes.WALK_SIDE)
      player.play(AnimTypes.WALK_SIDE);
    player.direction = "left";
  } else if (Math.abs(angle) < lowerBound) {
    player.flipX = true;
    if (player.curAnim() !== AnimTypes.WALK_SIDE)
      player.play(AnimTypes.WALK_SIDE);
    player.direction = "right";
  }

  player.moveTo(location, player.speed);

  return;
};

/** Walk until the player hits something */
export const moveInDirection = (
  player: Character,
  dx: number,
  dy: number,
  interval = 4,
) => {
  let animType: AnimTypes;
  if (Math.abs(dx) > Math.abs(dy)) {
    animType = AnimTypes.WALK_SIDE;
    if (dx > 0) {
      player.flipX = false;
      player.direction = "right";
    } else {
      player.flipX = true;
      player.direction = "left";
    }
  } else {
    if (dy > 0) {
      animType = AnimTypes.WALK_DOWN;
      player.direction = "down";
    } else {
      animType = AnimTypes.WALK_UP;
      player.direction = "up";
    }
  }

  const intervalRef = setInterval(() => {
    // for some reason, kaboom will sometimes not play the animation
    // thus the intervalRef spams the play function
    // @TODO: find a better solution
    player.play(animType);
    player.move(dx, dy);
    if (player.getCollisions().length) {
      stopAnim(player);
      clearInterval(intervalRef);
    }
  }, interval);
};

export const stopAnim = (player: GameObj) => {
  if (player.direction === "up") {
    player.play(AnimTypes.IDLE_UP);
  } else if (player.direction === "down") {
    player.play(AnimTypes.IDLE_DOWN);
  } else {
    player.play(AnimTypes.IDLE_SIDE);
  }
};
