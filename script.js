let map = L.map("map").setView([17.385044, 78.486671], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

let marker;
let routeLine;
let routeData = [];
let currentIndex = 0;
let intervalId;
let isPlaying = false;

// Fetch dummy route
fetch("dummy-route.json")
  .then((res) => res.json())
  .then((data) => {
    routeData = data;
    if (routeData.length > 0) {
      marker = L.marker([routeData[0].latitude, routeData[0].longitude]).addTo(map);
      routeLine = L.polyline([[routeData[0].latitude, routeData[0].longitude]], {
        color: "blue",
      }).addTo(map);
      map.fitBounds(routeLine.getBounds());
    }
  });

// Simulate movement
function moveVehicle() {
  if (currentIndex >= routeData.length - 1) {
    clearInterval(intervalId);
    return;
  }

  currentIndex++;
  let point = routeData[currentIndex];
  marker.setLatLng([point.latitude, point.longitude]);
  routeLine.addLatLng([point.latitude, point.longitude]);

  document.getElementById("info").textContent =
    `Coordinate: ${point.latitude.toFixed(5)}, ${point.longitude.toFixed(5)}`;
}

// Play button
document.getElementById("playBtn").addEventListener("click", () => {
  if (!isPlaying) {
    isPlaying = true;
    intervalId = setInterval(moveVehicle, 1000);
  }
});

// Pause button
document.getElementById("pauseBtn").addEventListener("click", () => {
  isPlaying = false;
  clearInterval(intervalId);
});
