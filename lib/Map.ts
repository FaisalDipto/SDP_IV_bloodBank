import {Driver, MarkerData} from "@/types/type";

const directionsAPI = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export const generateMarkersFromData = ({
                                            data,
                                            userLatitude,
                                            userLongitude,
                                        }: {
    data: Driver[];
    userLatitude: number;
    userLongitude: number;
}): MarkerData[] => {
    return data.map((driver) => {
        const latOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005
        const lngOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005

        return {
            latitude: userLatitude + latOffset,
            longitude: userLongitude + lngOffset,
            id: driver.driver_id,
            title: `${driver.first_name} ${driver.last_name}`,
            ...driver,
        };
    });
};

export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  // Fallback if no user location is available
  if (!userLatitude || !userLongitude) {
      return {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
      };
  }

  // Fallback if no destination location is available
  if (!destinationLatitude || !destinationLongitude) {
      return {
          latitude: userLatitude,
          longitude: userLongitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
      };
  }

  // Calculate the bounding box to include both user and destination locations
  const minLat = Math.min(userLatitude, destinationLatitude);
  const maxLat = Math.max(userLatitude, destinationLatitude);
  const minLng = Math.min(userLongitude, destinationLongitude);
  const maxLng = Math.max(userLongitude, destinationLongitude);

  // Add some padding to the bounding box to prevent the map from being too zoomed in
  const latitudeDelta = (maxLat - minLat) * 1.3; // Adding padding
  const longitudeDelta = (maxLng - minLng) * 1.3; // Adding padding

  // Center the region on the middle point between user and destination
  const latitude = (userLatitude + destinationLatitude) / 2;
  const longitude = (userLongitude + destinationLongitude) / 2;

  return {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
  };
};


export const calculateDriverTimes = async ({
                                               markers,
                                               userLatitude,
                                               userLongitude,
                                               destinationLatitude,
                                               destinationLongitude,
                                           }: {
    markers: MarkerData[];
    userLatitude: number | null;
    userLongitude: number | null;
    destinationLatitude: number | null;
    destinationLongitude: number | null;
}) => {
    if (
        !userLatitude ||
        !userLongitude ||
        !destinationLatitude ||
        !destinationLongitude
    )
        return;

    try {
        const timesPromises = markers.map(async (marker) => {
            const responseToUser = await fetch(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${marker.latitude},${marker.longitude}&destination=${userLatitude},${userLongitude}&key=${directionsAPI}`,
            );
            const dataToUser = await responseToUser.json();
            const timeToUser = dataToUser.routes[0].legs[0].duration.value; // Time in seconds

            const responseToDestination = await fetch(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${directionsAPI}`,
            );
            const dataToDestination = await responseToDestination.json();
            const timeToDestination =
                dataToDestination.routes[0].legs[0].duration.value; // Time in seconds

            const totalTime = (timeToUser + timeToDestination) / 60; // Total time in minutes
            const price = (totalTime * 0.5).toFixed(2); // Calculate price based on time

            return {...marker, time: totalTime, price};
        });

        return await Promise.all(timesPromises);
    } catch (error) {
        console.error("Error calculating driver times:", error);
    }
};