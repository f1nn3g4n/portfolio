import {
  AnchorComp,
  AreaComp,
  BodyComp,
  GameObj,
  PosComp,
  ScaleComp,
  SpriteComp,
} from "kaboom";

export type Character = GameObj<
  SpriteComp | PosComp | BodyComp | AreaComp | ScaleComp | AnchorComp
> & {
  speed: number;
  direction: string;
  isInDialogue: boolean;
};
