import { assertEquals } from "testing/asserts";
import { describe, it } from "testing/bdd";
import { getByKey } from "../mod.ts";

describe("Helper - getByKey", () => {
  const object = {
    age: 42,
    friends: { age: 62, name: "Obama" },
    name: "John",
  };

  it("should check simple key", () => {
    assertEquals(getByKey(object, "name"), "John");
    assertEquals(getByKey(object, "firstname"), undefined);
    assertEquals(getByKey(object, "friends"), {
      age: 62,
      name: "Obama",
    });
  });

  it("should check sub key", () => {
    assertEquals(getByKey(object, "friends.name"), "Obama");
    assertEquals(getByKey(object, "friends.age"), 62);
    assertEquals(getByKey(object, "friends.firstname"), undefined);
  });
});
