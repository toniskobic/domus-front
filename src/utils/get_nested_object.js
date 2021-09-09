const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((obj, key) =>
      (obj && obj[key] !== 'undefined') ? obj[key] : ' ', nestedObj);
  }

export default getNestedObject