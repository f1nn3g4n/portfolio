import {
  moveInDirection,
  moveToLocation,
  stopAnim,
} from "../../actions/movement";
import { tedConfig, tonyConfig } from "../../characters/cat";
import { playerConfig } from "../../characters/player";
import { scaleFactor } from "../../constants/scaleFactor";
import { k } from "../../kaboomConfig";
import { enableWASD, playerDialogue, setCamScale, spawn } from "../../utils";

export const lobby = async () => {
  const mapData = await (await fetch("./lobby.json")).json();
  k.loadSprite("map", "./lobby.png");
  const layers = mapData.layers;

  const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);

  const player = k.make(playerConfig());
  const ted = k.make(tedConfig());
  const tony = k.make(tonyConfig());

  enableWASD(k, player);

  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const obj of layer.objects) {
        map.add([
          k.area({ shape: new k.Rect(k.vec2(0), obj.width, obj.height) }),
          k.pos(obj.x, obj.y),
          k.body({ isStatic: true }),
          obj.name,
        ]);

        if (obj.name)
          k.onClick(obj.name, () => playerDialogue(obj.name, player));
      }
    } else if (layer.name === "spawns") {
      for (const obj of layer.objects) {
        if (obj.name === "player") {
          spawn(k, obj, map, player);
        } else if (obj.name === "tony") {
          spawn(k, obj, map, tony);
          // make him wander around
          k.loop(10, () => {
            moveInDirection(tony, k.rand(-50, 50), k.rand(-50, 50));
          });
        } else if (obj.name === "ted") {
          spawn(k, obj, map, ted);
        }
      }
    }
  }

  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  k.onUpdate(() => {
    k.camPos(player.pos.x, player.pos.y + 100);
  });

  k.onMouseDown((m) => {
    if (m !== "left" || player.isInDialogue) return;

    const worldMousePos = k.toWorld(k.mousePos());
    moveToLocation(player, worldMousePos);
  });
  k.onMouseRelease((_m) => stopAnim(player));

  player.onCollide("ted", () => playerDialogue("ted", player));
  player.onCollide("tony", () => playerDialogue("tony", player));
};
