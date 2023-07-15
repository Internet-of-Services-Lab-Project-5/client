export async function initSearch(firstname: string, lastname: string, birthdate: string) {
  try {
    const response = await fetch(`http://${import.meta.env.VITE_SERVER_URL}/initSearch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, birthdate }),
    });

    if (!response.ok) throw new Error("Request failed");

    const data = await response.json();
    return data.dealId || "";
  } catch (error) {
    console.error("Error:", error);
    return "";
  }
}

export async function fetchResults(dealId: string) {
  try {
    const response = await fetch(`http://${import.meta.env.VITE_SERVER_URL}/fetchResults`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dealId: dealId,
      }),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    return data.results.map((result: any) => JSON.parse(result));
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export function checkStatus(
  dealId: string,
  callback: (tasksCount: number, completedTasksCount: number) => void
) {
  const source = new EventSource(
    `http://${import.meta.env.VITE_SERVER_URL}/checkStatus?dealId=${dealId}`
  );

  source.onmessage = function (event) {
    if (event.data) {
      const { tasksCount, completedTasksCount } = JSON.parse(event.data);
      callback(tasksCount as number, completedTasksCount as number);
    }
  };
  source.onerror = function (event) {
    console.log("Event:", event);
  };
}

export async function checkConnectionToServer() {
  var serverStatus: {
    available?: boolean;
    message?: string;
  } = {};
  try {
    const response = await fetch(`http://${import.meta.env.VITE_SERVER_URL}/`);
    const data = await response.json();
    if (data.status === "ok") {
      serverStatus = {
        available: true,
        message: "Server is ready",
      };
    } else {
      serverStatus = {
        available: false,
        message: data.status,
      };
    }
  } catch (e) {
    console.warn(e);
    serverStatus = {
      available: false,
      message: "Server is offline!",
    };
  } finally {
    return serverStatus;
  }
}

export function test() {
  const source = new EventSource(`http://${import.meta.env.VITE_SERVER_URL}/onPropose`);

  source.onmessage = function (event) {
    console.log("Event:", event);
  };
  source.onerror = function (event) {
    console.log("Event:", event);
  };
}

export async function test2() {
  const response = await fetch(`http://${import.meta.env.VITE_SERVER_URL}/test`);
  const data = await response.json();
  console.log("data:", data);
}

export async function vote() {
  try {
    const response = await fetch(`http://${import.meta.env.VITE_SERVER_URL}/vote`, {
      method: "GET",
    });
    const data = await response.json();
    return data.message || "";
  } catch (error) {
    console.error("Error:", error);
    return "";
  }
}

// -----------------------------------------------------------------------------
//                              DATABASE REQUESTS
// -----------------------------------------------------------------------------

export async function getPassengers() {
  try {
    const response = await fetch(`http://${import.meta.env.VITE_SERVER_URL}/queries`, {
      method: "GET",
    });
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
