const prettyJSON = (json: string | object | undefined | null): string => {
  if (!json) return '';
  return JSON.stringify(json, null, 4);
};

export {
  prettyJSON
}