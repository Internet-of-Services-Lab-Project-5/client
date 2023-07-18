import { Airline, Passenger } from "./types";

// -----------------------------------------------------------------------------
//                              SESSION REQUESTS
// -----------------------------------------------------------------------------

export async function login(user: string, password: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });
    if (!response.ok) throw new Error("Request failed");
    const data = await response.json();
    return data.loggedIn || false;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

// -----------------------------------------------------------------------------
//                               IEXEC REQUESTS
// -----------------------------------------------------------------------------

export async function initSearch(passengers: Passenger[]) {
  const passengersString = JSON.stringify(
    passengers.map((p) => ({
      firstname: p["first_name"],
      lastname: p["last_name"],
      birthdate: p["birthdate"],
    }))
  );
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/initSearch`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: passengersString,
      }
    );
    if (!response.ok) throw new Error("Request failed");
    const data = await response.json();
    return data.statusKey || "";
  } catch (error) {
    console.error("Error:", error);
    return "";
  }
}

export function observe(statusKey: string, callback: () => void) {
  const source = new EventSource(
    `${import.meta.env.VITE_SERVER_URL}/observe?statusKey=${statusKey}`
  );

  source.onmessage = function (event) {
    if (event.data) {
      const { isCompleted } = JSON.parse(event.data);
      console.log("isCompleted:", isCompleted);
      if (isCompleted) {
        callback();
        source.close();
      }
    }
    source.onerror = function (event) {
      console.log("Event:", event);
    };
  };
}

export async function fetchResults(statusKey: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/fetchResults`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statusKey: statusKey }),
      }
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    return data !== null
      ? data.results
          .filter((entry: any) => !!entry)
          .map((result: any) => JSON.parse(result))
      : [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function checkStatus(statusKey: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/checkStatus`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statusKey }),
      }
    );
    if (!response.ok) throw new Error("Request failed");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return {};
  }
}

export async function updateDataset() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/updateDataset`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) throw new Error("Request failed");
  } catch (error) {
    console.error("Error:", error);
  }
}

// -----------------------------------------------------------------------------
//                           SMART CONTRACT REQUESTS
// -----------------------------------------------------------------------------

export async function getCandidate() {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/candidate`);
  const data = await response.json();
  console.log("data:", data);
  if (
    data.candidate &&
    data.candidate[0] &&
    data.candidate[0] !== "No Candidate"
  )
    return data.candidate[0];
  return undefined;
}

export async function getAirlines() {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/airlines`);
  const data = await response.json();
  console.log("data:", data);
  if (data.airlines) return data.airlines.map((a: Airline) => a.name);
  return [];
}

export async function getIsVoting() {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/isVoting`);
  const data = await response.json();
  console.log("data:", data);
}

export async function voteForCandidate(saysYes: boolean) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vote: saysYes }),
    });
    const data = await response.json();
    console.log("data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function propose(
  name: string,
  ethAddress: string,
  iExecAddress: string
) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/propose`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, ethAddress, iExecAddress }),
    });
    const data = await response.json();
    console.log("data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

export function onProposed(callback: () => void) {
  const source = new EventSource(
    `${import.meta.env.VITE_SERVER_URL}/onProposed`
  );

  source.onmessage = function (event) {
    console.log("Event:", event);
    callback();
  };
  source.onerror = console.warn;
}

export function onAdded(callback: () => void) {
  const source = new EventSource(`${import.meta.env.VITE_SERVER_URL}/onAdded`);

  source.onmessage = function (event) {
    console.log("Event:", event);
    callback();
  };
  source.onerror = console.warn;
}

export function onRejected(callback: () => void) {
  const source = new EventSource(
    `${import.meta.env.VITE_SERVER_URL}/onRejected`
  );

  source.onmessage = function (event) {
    console.log("Event:", event);
    callback();
  };
  source.onerror = console.warn;
}

// -----------------------------------------------------------------------------
//                              DATABASE REQUESTS
// -----------------------------------------------------------------------------

export async function getPassengers() {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/queries`, {
      method: "GET",
    });
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function addPassenger(
  firstname: string,
  lastname: string,
  birthdate: string,
  incident: string,
  incidentDate: string
) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/queries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname,
        lastname,
        birthdate,
        incident,
        incidentDate,
      }),
    });
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function addPassengers(
  passengers: {
    firstname: string;
    lastname: string;
    birthdate: string;
    incident: string;
    incidentDate: string;
  }[]
) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/queries/many`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passengers }),
      }
    );
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function deletePassenger(
  firstname: string,
  lastname: string,
  birthdate: string
) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/queries`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, birthdate }),
    });
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function createTable() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/queries/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function dropTable() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/queries/drop`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
