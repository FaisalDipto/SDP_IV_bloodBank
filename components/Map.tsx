import { calculateRegion, generateMarkersFromData } from "@/lib/Map";
import { useDonerStore, useLocationStore } from "@/store";
import { View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { useEffect, useState } from "react";
import { MarkerData } from "@/types/type";
import { icons } from "@/constants";

const drivers = [
  {
      "id": "1",
      "first_name": "James",
      "last_name": "Wilson",
      "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      "car_seats": 4,
      "rating": "4.80"
  },
  {
      "id": "2",
      "first_name": "David",
      "last_name": "Brown",
      "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      "car_seats": 5,
      "rating": "4.60"
  },
  {
      "id": "3",
      "first_name": "Michael",
      "last_name": "Johnson",
      "profile_image_url": "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
      "car_image_url": "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
      "car_seats": 4,
      "rating": "4.70"
  },
  {
      "id": "4",
      "first_name": "Robert",
      "last_name": "Green",
      "profile_image_url": "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/",
      "car_image_url": "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
      "car_seats": 4,
      "rating": "4.90"
  }
]

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();
  const { selectedDriver, setDrivers} = useDonerStore()
  const [markers, setMarkers] = useState<MarkerData[]>([])
  
  const [region, setRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Check if we have minimum required coordinates
      if (typeof userLatitude === 'number' && typeof userLongitude === 'number') {
        const calculatedRegion = calculateRegion({
          userLongitude,
          userLatitude,
          destinationLatitude,
          destinationLongitude,
        });
        
        setRegion(calculatedRegion);
      } else {
        // Set default region if coordinates are not available
        setRegion({
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (error) {
      console.error("Error calculating region:", error);
      // Fallback to default region on error
      setRegion({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } finally {
      setIsLoading(false);
    }
  }, [userLatitude, userLongitude, destinationLatitude, destinationLongitude]);

  useEffect(() => {
    if(Array.isArray(drivers)) {
      if(!userLatitude || !userLongitude) return;

      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      })
      setMarkers(newMarkers)
    }
  }, [drivers])

  // Show loading indicator while region is being calculated
  if (isLoading || !region) {
    return (
      <View style={{ 
        width: "100%", 
        height: "100%", 
        borderRadius: 16,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center" 
      }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Loading map...</Text>
      </View>
    );
  }

  // Only render the map when we have a valid region
  return (
    <View style={{ width: "100%", height: "100%", borderRadius: 16 }}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 16,
        }}
        initialRegion={region}
        showsPointsOfInterest={false}
        showsUserLocation={true}
        userInterfaceStyle="light"
        >
          {markers.map((marker) => (
            <Marker key={marker.id} coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
            title={marker.title}
            image={
              selectedDriver === marker.id ? icons.selectedMarker : icons.blood
            }/>
          ))}
        </MapView>
    </View>
  );
};

export default Map;