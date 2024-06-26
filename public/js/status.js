const statusIcon = document.getElementById("status-icon");
const statusText = document.getElementById("status-text");

const serviceUp = {
  color: ["bg-green-500", "dark:bg-green-400"],
  text: "All Services Operational",
};
const serviceDegraded = {
  color: ["bg-yellow-400", "dark:bg-yellow-200"],
  text: "Degraded Services",
};
const serviceDown = {
  color: ["bg-red-600", "dark:bg-red-500"],
  text: "All Services Down",
};
const serviceUnknown = {
  color: ["bg-gray-500", "dark:bg-gray-400"],
  text: "Services Status Unknown",
};

async function getServicesHealth() {
  try {
    const serviceStatus = await fetch(
      "https://status.wah.su/api/status-page/heartbeat/services"
    );

    const services = await serviceStatus.json();
    const heartbeatDict = services.heartbeatList;
    let lastHeartbeats = [];

    for (const [key, value] of Object.entries(heartbeatDict)) {
      lastHeartbeats.push(
        heartbeatDict[key][heartbeatDict[key].length - 1].status
      );
    }

    let status = "up";
    const count = lastHeartbeats.reduce((partialSum, a) => partialSum + a, 0);

    if (count === lastHeartbeats.length) {
      status = "up";
    } else if (count === 0) {
      status = "down";
    } else {
      status = "degraded";
    }

    if (status === "up") {
      statusIcon.classList.add(...serviceUp.color);
      statusIcon.classList.remove(
        ...serviceDegraded.color,
        ...serviceDown.color,
        ...serviceUnknown.color
      );
      statusText.textContent = serviceUp.text;
    } else if (status === "degraded") {
      statusIcon.classList.add(...serviceDegraded.color);
      statusIcon.classList.remove(
        ...serviceUp.color,
        ...serviceDown.color,
        ...serviceUnknown.color
      );
      statusText.textContent = serviceDegraded.text;
    } else if (status === "down") {
      statusIcon.classList.add(...serviceDown.color);
      statusIcon.classList.remove(
        ...serviceUp.color,
        ...serviceDegraded.color,
        ...serviceUnknown.color
      );
      statusText.textContent = serviceDown.text;
    }
  } catch (error) {
    statusIcon.classList.add(...serviceUnknown.color);
    statusIcon.classList.remove(
      ...serviceUp.color,
      ...serviceDegraded.color,
      ...serviceDown.color
    );
    statusText.textContent = serviceUnknown.text;
    console.log("Failed to fetch services status: " + error);
    return;
  }
}

getServicesHealth();

setInterval(getServicesHealth, 600000);
