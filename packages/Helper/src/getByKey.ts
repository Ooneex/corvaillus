export const getByKey = <T>(object: unknown, key: unknown): T | undefined => {
  const keys = (key as string).split(".");

  for (let i = 0; i < keys.length; i++) {
    key = keys[i];

    try {
      // @ts-ignore:
      object = object[key];
      if (object === undefined) {
        return undefined;
      }
    } catch {
      return undefined;
    }
  }

  return (object as (T | undefined));
};
