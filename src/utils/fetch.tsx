async function fetchData(url: string, httpReq: string, sessionToken: string) {
  try {
    const resp = await fetch(url, {
      method: httpReq,
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: sessionToken,
      }),
    });
    const data = await resp.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function changeData(
  url: string,
  httpReq: string,
  reqBody: Object,
  sessionToken: string
) {
  try {
    const resp = await fetch(url, {
      method: httpReq,
      body: JSON.stringify(reqBody),
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: sessionToken,
      }),
    });
    const data = await resp.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export { fetchData, changeData };
