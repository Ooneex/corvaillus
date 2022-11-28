import { assertEquals } from "testing/asserts";
import { describe, it } from "testing/bdd";
import { hasProperty } from "../mod.ts";

describe("Helper - hasProperty", () => {
  const object = {
    age: 42,
    friends: { age: 62, name: "Obama" },
    name: "John",
  };

  it("should check simple key", () => {
    assertEquals(hasProperty(object, "name"), true);
    assertEquals(hasProperty(object, "firstname"), false);
    assertEquals(hasProperty(object, "friends"), true);
  });

  it("should check sub key", () => {
    assertEquals(hasProperty(object, "friends.firstname"), false);
    assertEquals(hasProperty(object, "friends.name"), true);
  });
});
