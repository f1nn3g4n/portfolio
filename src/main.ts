import { k } from './kaboomConfig';
import { lobby } from './scenes/lobby/lobby';

k.setBackground(k.Color.BLACK);

const note = document.getElementById("note");

k.scene("start", () => {
  k.add([
    k.text("Welcome! Click anywhere to start", { size: 24 }),
    k.Color.WHITE,
    k.anchor('center'),
    k.pos(0)
  ]);

  k.camPos(0, 0);

  k.onMousePress(() => {
    k.go("lobby");
    note!.style.display = "flex";
  })
});

k.scene('lobby', lobby)

k.go('start');