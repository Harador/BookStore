export const stringToCamel = (str: string) => {
  return str.trim().toLowerCase().replace(/([-_][a-z])/g, (group) =>
      group
        .toUpperCase()
        .replace('-', '')
        .replace('_', ''),
    );
};
