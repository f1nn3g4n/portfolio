import { k } from './kaboomConfig';
import { lobby } from './scenes/lobby/lobby';

k.setBackground(k.Color.BLACK);

const note = document.getElementById("note");
const start = document.getElementById("start");

k.scene("start", () => {
  k.onMousePress(() => {
    k.go("lobby");
    start!.style.display = "none";
    note!.style.display = "table";
  })
});

k.scene('lobby', lobby)

k.go('start');