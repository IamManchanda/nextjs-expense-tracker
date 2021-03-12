const fetcher = (url, options = {}) =>
  fetch(url, options).then((r) => r.json());

export default fetcher;
