import {
  afterAll,
  assertEquals,
  assertNotEquals,
  describe,
  it,
} from "../../deps.ts";
import { Path } from "./deps.ts";
import { File } from "./mod.ts";

describe("File", () => {
  const currentDir = crypto.randomUUID();
  const file = new File(`__var\\${currentDir}/test.txt`);

  afterAll(() => {
    try {
      Deno.removeSync("__var", { recursive: true });
    } catch (e) {
      console.log(e.message);
    }
  });

  it("path", () => {
    assertEquals(
      file.getPath(),
      `__var${Path.DS}${currentDir}${Path.DS}test.txt`,
    );
  });

  it("name", () => {
    assertEquals(file.getName(), "test.txt");
  });

  it("directory", () => {
    assertEquals(file.getDirectory().getPath(), `__var${Path.DS}${currentDir}`);
  });

  it("extension", () => {
    assertEquals(file.getExt(), "txt");
  });

  it("ensure", () => {
    assertEquals(file.exists(), false);
    file.ensure();
    assertEquals(file.exists(), true);
  });

  it("read and write content", () => {
    file.write("Hello deno");
    assertEquals(file.read(), "Hello deno");
    file.write("Welcome to");
    assertEquals(file.read(), "Welcome to");
    file.addContent(" Deno land");
    assertNotEquals(file.read(), " Deno land");
    assertEquals(file.read(), "Welcome to Deno land");
  });

  it("replace content", () => {
    file.replaceText(/Welcome to/, "Hi");
    assertEquals(file.read(), "Hi Deno land");
  });

  it("empty", () => {
    file.empty();
    assertEquals(file.read(), "");
  });

  it("cp", () => {
    const copiedFile = file.cp(`__var\\${currentDir}/testCopy.txt`);
    assertEquals(copiedFile.exists(), true);
    assertEquals(file.exists(), true);
  });

  it("rename", () => {
    file.rename("copy.txt");
    assertEquals(
      file.getPath(),
      `__var${Path.DS}${currentDir}${Path.DS}copy.txt`,
    );
    assertEquals(file.getName(), "copy.txt");
  });

  it("mv", () => {
    const file = new File(`__var\\${currentDir}/test.txt`);
    file.ensure();
    file.mv(`__var\\${currentDir}/newDir`);
    assertEquals(
      file.getPath(),
      `__var${Path.DS}${currentDir}${Path.DS}newDir${Path.DS}test.txt`,
    );
  });

  it("rm", () => {
    const file = new File(`__var\\${currentDir}/test.txt`);
    file.ensure();
    file.rm();
    assertEquals(file.exists(), false);
  });

  describe("File info", () => {
    const file = new File(`__var\\${currentDir}/testInfo.txt`);
    const path = file.getPath();
    file.ensure();
    it("size", () => {
      assertEquals(file.getSize(), Deno.lstatSync(path).size);
    });
    it("updatedAt", () => {
      assertEquals(file.updatedAt(), Deno.lstatSync(path).mtime);
    });
    it("accessAt", () => {
      assertEquals(file.accessAt(), Deno.lstatSync(path).atime);
    });
    it("createdAt", () => {
      assertEquals(file.accessAt(), Deno.lstatSync(path).birthtime);
    });
    it("mode", () => {
      assertEquals(file.getMode(), Deno.lstatSync(path).mode);
    });
    it("uid", () => {
      assertEquals(file.getUid(), Deno.lstatSync(path).uid);
    });
    it("gid", () => {
      assertEquals(file.getGid(), Deno.lstatSync(path).gid);
    });
  });
});
