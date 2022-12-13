import {
  afterAll,
  assertEquals,
  assertInstanceOf,
  assertThrows,
  describe,
  it,
} from "../../deps.ts";
import { File, Path } from "./deps.ts";
import { Directory, DirectoryException } from "./mod.ts";

// Todo: See how to use Deno.makeTempFileSync()

describe("Directory", () => {
  const currentDir = crypto.randomUUID();
  const copyDir = crypto.randomUUID();
  const moveDir = crypto.randomUUID();
  const renameDir = crypto.randomUUID();
  const infoDir = crypto.randomUUID();
  const directory = new Directory(`__var\\${currentDir}`);

  afterAll(() => {
    try {
      Deno.removeSync("__var", { recursive: true });
    } catch (e) {
      console.log(e.message);
    }
  });

  it("path", () => {
    assertEquals(directory.getPath(), `__var${Path.DS}${currentDir}`);
  });

  it("name", () => {
    assertEquals(directory.getName(), currentDir);
  });

  it("directory", () => {
    assertEquals(directory.getDirectory().getPath(), "__var");
  });

  it("ensure", () => {
    assertEquals(directory.exists(), false);
    directory.ensure();
    assertEquals(directory.exists(), true);
  });

  it("cd", () => {
    assertThrows(() => {
      directory.cd("foo");
    }, DirectoryException);

    directory.mkdir("foo");
    directory.cd("foo");
    assertEquals(directory.exists(), true);
    assertEquals(
      directory.getPath(),
      `__var${Path.DS}${currentDir}${Path.DS}foo`,
    );
    directory.cd("..");
    assertEquals(
      directory.getPath(),
      `__var${Path.DS}${currentDir}`,
    );
  });

  it("list directories", () => {
    assertEquals(directory.directories().length, 1);
    directory.mkdir("bar");
    assertEquals(directory.directories().length, 2);
    directory.mkdir("bar/dir1");
    assertEquals(directory.directories().length, 2);
    assertEquals(directory.directories(null, true).length, 3);
    assertInstanceOf(directory.directories()[0], Directory);
  });

  it("empty", () => {
    directory.empty();
    assertEquals(directory.directories().length, 0);
  });

  it("touch", () => {
    const file = directory.touch("text.txt", "my content");
    assertEquals(file.exists(), true);
  });

  it("list files", () => {
    assertEquals(directory.files().length, 1);
    assertInstanceOf(directory.files()[0], File);
  });

  it("cp", () => {
    const cpDir = directory.cp(`__var\\${copyDir}`);
    assertEquals(cpDir.exists(), true);
    assertEquals(directory.exists(), true);
  });

  it("rm", () => {
    directory.rm(undefined, true);
    assertEquals(directory.exists(), false);
  });

  it("mv", () => {
    const directory = new Directory(`__var\\${currentDir}`);
    directory.ensure();
    let result = directory.mv(directory.getPath());
    assertEquals(directory.isEquals(result), true);
    result = directory.mv(`__var\\${moveDir}`);
    assertEquals(directory.exists(), false);
    assertEquals(result.exists(), true);
    assertEquals(directory.isEquals(result), false);
  });

  it("rename", () => {
    const directory = new Directory(`__var\\${currentDir}`);
    directory.ensure();
    directory.touch("rename.txt", "Rename content.");
    directory.rename(renameDir);
    assertEquals(directory.getName(), renameDir);
  });

  describe("Directory info", () => {
    const directory = new Directory(`__var\\${infoDir}`);
    const path = directory.getPath();
    directory.ensure();
    it("size", () => {
      assertEquals(directory.getSize(), Deno.lstatSync(path).size);
    });
    it("updatedAt", () => {
      assertEquals(directory.updatedAt(), Deno.lstatSync(path).mtime);
    });
    it("accessAt", () => {
      assertEquals(directory.accessAt(), Deno.lstatSync(path).atime);
    });
    it("createdAt", () => {
      assertEquals(directory.accessAt(), Deno.lstatSync(path).birthtime);
    });
    it("mode", () => {
      assertEquals(directory.getMode(), Deno.lstatSync(path).mode);
    });
    it("uid", () => {
      assertEquals(directory.getUid(), Deno.lstatSync(path).uid);
    });
    it("gid", () => {
      assertEquals(directory.getGid(), Deno.lstatSync(path).gid);
    });
  });
});
