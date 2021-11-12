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

export { fetchData };
