import { JokerType } from "../enums/JokerType.js";

export class JokerState {
  constructor(initalState) {
    this.isJokerUsed = initalState || {
      [JokerType.FIFTY_FIFTY]: false,
      [JokerType.SWAP_QUESTION]: false,
      [JokerType.SKIP_QUESTION]: false,
    };
  }

  isAvailible(type) {
    return !this.isJokerUsed[type];
  }
  use(type) {
    if (!this.isAvailible(type)) return false;
    this.isJokerUsed[type] = true;
    return true;
  }
}
