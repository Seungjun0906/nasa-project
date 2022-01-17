// const API_URL = "http://localhost:8000/v1";
const API_URL = "v1";

async function httpGetPlanets() {
  const res = await fetch(`${API_URL}/planets`);
  const data = await res.json();
  // console.log(data);
  return data;

  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const res = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await res.json();
  return fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch({ launchDate, mission, rocket, target }) {
  try {
    const res = await fetch(`${API_URL}/launches`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mission,
        launchDate,
        rocket,
        target,
      }),
    });

    return res;
  } catch (err) {
    return {
      ok: false,
    };
  }
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  try {
    const res = await fetch(`${API_URL}/launches/${id}`, {
      method: "DELETE",
    });
    return res;
  } catch (err) {
    console.log(err);
    return { ok: false };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
