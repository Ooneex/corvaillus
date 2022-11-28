import { getByKey } from "./getByKey.ts";

export const hasProperty = (object: unknown, key: string): boolean => {
  return getByKey(object, key) !== undefined;
};
