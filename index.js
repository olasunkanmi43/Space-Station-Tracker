// let map = L.map('map').setView([0, 0], 2); // Initial map center

// // Add OpenStreetMap layer
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   maxZoom: 10,
// }).addTo(map);

// // Add a marker for the ISS
// const issMarker = L.marker([0, 0]).addTo(map);
// const latElem = document.getElementById("latitude");
//  const lonElem = document.getElementById("longitude");


// // Function to fetch ISS position
// async function fetchISSLocation() {
//   try {
//     const response = await fetch("http://api.open-notify.org/iss-now.json");
//     if (!response.ok) throw new Error("Network response was not ok");

//     const data = await response.json();
//     if (!data || !data.iss_position) throw new Error("Invalid data received");

//     const { latitude, longitude } = data.iss_position;
//     // Parse latitude and longitude as floating-point numbers
//     const lat = parseFloat(latitude);
//     const lon = parseFloat(longitude);

//     if (isNaN(lat) || isNaN(lon)) {
//       throw new Error("Received invalid coordinates");
//     }

//     updateISSPosition(lat, lon);
//     latElem.textContent = lat.toFixed(6); // Display with 6 decimal places
//     lonElem.textContent = lon.toFixed(6);
//   } catch (error) {
//     console.error(error);
//     document.getElementById("error-message").textContent =
//       "Unable to retrieve ISS location. Please try again later.";
//   }
// }


// // Update ISS position on map
// function updateISSPosition(lat, lon) {
//   issMarker.setLatLng([lat, lon]);
//   map.setView([lat, lon], map.getZoom());
// }

// // Fetch ISS location every 510 seconds
// setInterval(fetchISSLocation, 5000);
// fetchISSLocation(); // Initial call







let map = L.map('map').setView([0, 0], 2); 

// Add OpenStreetMap layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 10,
}).addTo(map);

// Add a marker for the ISS
const issMarker = L.marker([0, 0]).addTo(map);
const latElem = document.getElementById("latitude");
const lonElem = document.getElementById("longitude");

// Configure Toastr
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-bottom-right", // Change as needed
  timeOut: "5000", // 5 seconds
};

// Function to fetch ISS position
async function fetchISLocation() {
  try {
    const response = await fetch("http://api.open-notify.org/iss-now.json");
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    if (!data || !data.iss_position) throw new Error("Invalid data received");

    const { latitude, longitude } = data.iss_position;
    // Parse latitude and longitude as floating-point numbers
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      throw new Error("Received invalid coordinates");
    }

    updateISSPosition(lat, lon);
    latElem.textContent = lat.toFixed(6); // Display with 6 decimal places
    lonElem.textContent = lon.toFixed(6);
  } catch (error) {
    console.error(error);
    toastr.error("Unable to retrieve ISS location. Please try again later.", "Error");
  }
 
}

// Update ISS position on map
function updateISSPosition(lat, lon) {
  issMarker.setLatLng([lat, lon]);
  map.setView([lat, lon], map.getZoom());
  
}



// Fetch ISS location every 5 seconds
fetchISLocation();
setInterval(fetchISLocation, 5000);
 // Initial call
