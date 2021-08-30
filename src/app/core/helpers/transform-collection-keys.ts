export function transformCollKeys(
  col: {[key: string]: any} | any[],
  transform: Function,
): Object | unknown[] {
  let newCol: any;

  if (Array.isArray(col)) {
    newCol = [];
    col.forEach((val) => {
      val = val && typeof val === 'object'
            ? transformCollKeys(val, transform)
            : val;
      newCol.push(val);
    });
  } else {
    newCol = {};
    Object.keys(col)
      .forEach((key) => {
        const value = col[key];
        key = transform(key);
        newCol[key] = value && typeof value === 'object' && !(value instanceof Date)
          ? transformCollKeys(value, transform)
          : value;
      });
  }

  return newCol;
}
