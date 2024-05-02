
const channelID = "2529710";
const readAPIKey = "8WHAHSLA3BMRQP65";
const numResults = 1; // Number of results to fetch
const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${readAPIKey}&results=${numResults}`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    if (data.feeds && data.feeds.length > 0) {
      data.feeds.forEach((feed) => {
        console.log(
          ` Entry at ${feed.created_at}: Field1 - ${feed.field1}, Field2 - ${feed.field2}`
        );

        // havesine formula
        function haversine(lat1, lon1, lat2, lon2) {
          const R = 6371; // Radius of the Earth in km
          const dLat = ((lat2 - lat1) * Math.PI) / 180; // difference in latitude
          const dLon = ((lon2 - lon1) * Math.PI) / 180; // difference in longitude
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
              Math.cos((lat2 * Math.PI) / 180) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c; // Distance in km
          return distance;
        }

        // haversin end here
        lon = feed.field2;
        console.log("type of lon = " + typeof lon);
        console.log("lon = " + lon);
        console.log(lon.slice(0, 9));

        var find = document.getElementById("Find");
        find.href = `https://www.google.com/maps?q=${feed.field1},${lon.slice(
          0,
          9
        )}`;

        latitude = feed.field1;
        longitude = lon.slice(0, 12);

        console.log("BUS Location:", latitude, longitude);
        // Bus Stop Location - JCER
        // 15.822203, 74.488814

        // Live location of my device
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            var init_latitude = position.coords.latitude.toFixed(12);
            var init_longitude = position.coords.longitude.toFixed(12);
            console.log("init_Latitude:", init_latitude);
            console.log("init_Longitude:", init_longitude);
            distance = haversine(
              latitude,
              longitude,
              init_latitude,
              init_longitude
            );

            console.log("Distance", distance.toFixed(2));
            var dis = document.getElementById("dis");

            dis.textContent = distance.toFixed(2) + "Km";
          });
        } else {
          console.log("Geolocation is not available on this device.");
        }
      });
    } else {
      console.log("No feeds found");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
