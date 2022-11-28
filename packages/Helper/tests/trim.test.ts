import { assertEquals } from "testing/asserts";
import { describe, it } from "testing/bdd";
import { trim } from "../mod.ts";

describe("Helper - trim", () => {
  const cases = [
    { char: " ", text: "    Hello    " },
    { char: "/", text: "/Hello/" },
    { char: "/ ", text: "/ Hello/ " },
    { char: "\\|", text: "|Hello|" },
    { char: "\\.", text: ".Hello." },
  ];

  cases.map((c) => {
    it(`"${c.char}"`, () => {
      assertEquals(trim(c.text, c.char), "Hello");
    });
  });
});
