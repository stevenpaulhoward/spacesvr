// @ts-ignore
import * as culori from "culori";
import { NpmDependencies, Schema } from "./types/idea";

/**
 * an idea is the fundamental atom of the ideal reality.
 * everything is an idea, whether the idea is accurately visualized or not.
 */
export class Idea {
  // definition
  id: string;
  props: any;

  // aliases
  name: string;

  // size
  schema: Schema;
  npm_dependencies: NpmDependencies;

  // thought
  purpose: string;
  predecessor: string;

  // mediation
  mediation: number; // [0, 1)
  specificity: number; // [0, 1]
  utility: number; // [0, 1]

  constructor() {
    this.setFromCreation();
    return this;
  }

  setFromCreation(m = 0, s = 0, u = 0.5) {
    this.mediation = m;
    this.specificity = s;
    this.utility = u;

    return this;
  }

  updateFromText(text: string) {
    const len = text.length;
    this.mediation = hashStringToRange(text);
    this.specificity = (1 - (len == 0 ? 1 : 1 / len)) * 0.5;

    return this;
  }

  updateUtility(utility: number) {
    this.utility = utility;

    return this;
  }

  getHex(): string {
    const fixedColor = culori.rgb({
      mode: "oklch",
      l: this.utility,
      c: this.specificity * 0.322,
      h: this.mediation * 360,
    });

    return culori.formatHex(fixedColor);
  }

  getOpposite(): Idea {
    const newM =
      this.mediation + 0.5 > 1 ? this.mediation - 0.5 : this.mediation + 0.5;
    const newS = this.specificity;

    const newU = 0.5 - (this.utility - 0.5);
    return new Idea().setFromCreation(newM, newS, newU);
  }
}

const AVG_CHAR_VAL = 100; // each char is roughly 100, so loop every ~50 chars

const hashStringToRange = (str: string, loop = 20): number => {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    count += str.substr(i, 1).charCodeAt(0);
  }
  const scaledLoop = loop * AVG_CHAR_VAL;
  return (count % scaledLoop) / scaledLoop;
};

const wrapNumber = (num: number, range = 10) => {
  return (num % range) / range;
};
