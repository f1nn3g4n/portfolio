import { moveToLocation, stopAnim } from "../../actions/movement";
import { catConfig } from "../../characters/cat/cat.config";
import { playerConfig } from "../../characters/player/player.config";
import { scaleFactor } from "../../constants/scaleFactor";
import { k } from "../../kaboomConfig";
import { displayDialogue, setCamScale, spawn } from "../../utils";
import { DIALOGUE } from "./lobby.constants";

export const lobby = async () => {
  const mapData = await (await fetch('./lobby.json')).json();
  k.loadSprite('map', './lobby.png');
  const layers = mapData.layers;

  const map = k.add([
    k.sprite('map'),
    k.pos(0),
    k.scale(scaleFactor)
  ]);

  console.log(mapData);
  console.log(layers);

  const player = k.make(playerConfig());
  const ted = k.make(catConfig());
  const tony = k.make(catConfig());

  for (const layer of layers) {
    if (layer.name === 'boundaries') {
      for (const obj of layer.objects) {
        map.add([
          k.area({shape: new k.Rect(k.vec2(0), obj.width, obj.height)}),
          k.pos(obj.x, obj.y),
          k.body({isStatic: true}),
          obj.name,
        ]);

        if (obj.name) {
          player.onCollide(obj.name, () => {
            player.isInDialogue = true;
            displayDialogue('whatsup', () => player.isInDialogue = false);
          })
        }
      }
    } else if (layer.name === "spawns") {
      for (const obj of layer.objects) {
        if (obj.name === "player") {
          spawn(k, obj, map, player);
        } else if (obj.name === "tony") {
          spawn(k, obj, map, tony);
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
  })

  k.onMouseDown((m) => {
    if (m !== "left" || player.isInDialogue) return;

  const worldMousePos = k.toWorld(k.mousePos());

  const mouseAngle = player.pos.angle(worldMousePos);
  moveToLocation(player, mouseAngle, worldMousePos);
});
  k.onMouseRelease((m) => stopAnim(player));

  //make cat wander around
  k.loop(5, () => {
    const angle = k.vec2(k.rand(-1, 1), k.rand(-1, 1));
    const direction = angle.angle(k.vec2(0,0));

    const intervalRef = setInterval(() => {
      moveToLocation(tony, direction);
      if (tony.getCollisions().length) {
        stopAnim(tony);
        clearInterval(intervalRef);
      }
    }, 3);
  });

  player.onCollide("cat", () => {
    player.isInDialogue = true;
    displayDialogue(DIALOGUE["cat"], () => player.isInDialogue = false);
  })
}