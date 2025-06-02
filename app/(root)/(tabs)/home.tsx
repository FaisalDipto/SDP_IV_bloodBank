import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const [selectedDonor, setSelectedDonor] = useState(null);

// // When a donor is selected (e.g., from a card tap)
// setSelectedDonor({
//   latitude: donor.latitude,
//   longitude: donor.longitude,
// });

const nearbyDonors = [
  // A+
  {
    id: 1,
    latitude: 23.8103,
    longitude: 90.4125,
    title: "Dhaka, Bangladesh",
    first_name: "Rakib",
    last_name: "Hasan",
    phone_number: "+8801711001100",
    blood_group: "A+",
  },
  {
    id: 2,
    latitude: 22.3569,
    longitude: 91.7832,
    title: "Chattogram, Bangladesh",
    first_name: "Naim",
    last_name: "Khan",
    phone_number: "+8801722002200",
    blood_group: "A+",
  },

  // O-
  {
    id: 3,
    latitude: 24.9045,
    longitude: 91.8611,
    title: "Sylhet, Bangladesh",
    first_name: "Tariq",
    last_name: "Ahmed",
    phone_number: "+8801733003300",
    blood_group: "O-",
  },
  {
    id: 4,
    latitude: 23.4607,
    longitude: 91.1809,
    title: "Comilla, Bangladesh",
    first_name: "Junaid",
    last_name: "Islam",
    phone_number: "+8801744004400",
    blood_group: "O-",
  },

  // B+
  {
    id: 5,
    latitude: 25.7439,
    longitude: 89.2752,
    title: "Rangpur, Bangladesh",
    first_name: "Sabbir",
    last_name: "Rahman",
    phone_number: "+8801755005500",
    blood_group: "B+",
  },
  {
    id: 6,
    latitude: 24.3636,
    longitude: 88.6241,
    title: "Rajshahi, Bangladesh",
    first_name: "Rasel",
    last_name: "Mia",
    phone_number: "+8801766006600",
    blood_group: "B+",
  },

  // AB-
  {
    id: 7,
    latitude: 22.8456,
    longitude: 89.5403,
    title: "Khulna, Bangladesh",
    first_name: "Mehedi",
    last_name: "Hasan",
    phone_number: "+8801777007700",
    blood_group: "AB-",
  },
  {
    id: 8,
    latitude: 23.0547,
    longitude: 89.0928,
    title: "Jessore, Bangladesh",
    first_name: "Hridoy",
    last_name: "Ali",
    phone_number: "+8801788008800",
    blood_group: "AB-",
  },
];


const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function HomePage() {
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [selectedDonor, setSelectedDonor] = useState<typeof nearbyDonors[0] | null>(null);
  const [userLocation, setUserLocation] = useState<{latitude: number; longitude: number} | null>(null);

  // Get user location on mount
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const filteredDonors = selectedGroup === "All"
    ? nearbyDonors
    : nearbyDonors.filter(donor => donor.blood_group === selectedGroup);

  // Map region logic: center on selected donor, else user location, else default
  const mapRegion = selectedDonor
    ? {
        latitude: selectedDonor.latitude,
        longitude: selectedDonor.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : userLocation
    ? {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : {
        latitude: 27.717245, // fallback Kathmandu lat/lng
        longitude: 85.323961,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Map */}
      <View style={{ height: 300 }}>
        <MapView style={{ flex: 1 }} region={mapRegion}>
          {/* Show user location marker */}
          {userLocation && (
            <Marker
              coordinate={userLocation}
              title="Your Location"
              pinColor="blue"
            />
          )}
          {/* Show nearby donors markers */}
          {filteredDonors.map(donor => (
            <Marker
              key={donor.id}
              coordinate={{ latitude: donor.latitude, longitude: donor.longitude }}
              title={`${donor.first_name} ${donor.last_name}`}
              description={`${donor.blood_group} Blood Group`}
              pinColor={selectedDonor?.id === donor.id ? "green" : "red"}
              onPress={() => setSelectedDonor(donor)}
            />
          ))}
        </MapView>
      </View>

      {/* Blood Group Filter */}
      <View style={styles.dropdownContainer}>
        {bloodGroups.map(group => (
          <TouchableOpacity
            key={group}
            style={[
              styles.bloodGroupButton,
              selectedGroup === group && styles.bloodGroupButtonSelected,
            ]}
            onPress={() => {
              setSelectedGroup(group);
              setSelectedDonor(null); // Reset selected donor on filter change
            }}
          >
            <Text
              style={[
                styles.bloodGroupText,
                selectedGroup === group && styles.bloodGroupTextSelected,
              ]}
            >
              {group}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Donors List */}
      <FlatList
        data={filteredDonors}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.donorCard}
            onPress={() => setSelectedDonor(item)}
          >
            <Text style={styles.donorName}>{item.first_name} {item.last_name}</Text>
            <Text style={styles.donorLocation}>{item.title}</Text>
            <Text style={styles.donorPhone}>{item.phone_number}</Text>
            <Text style={styles.donorBlood}>Blood Group: {item.blood_group}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <Text style={{ marginTop: 20, textAlign: "center" }}>
            No donors found for this blood group.
          </Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 12,
    justifyContent: "center",
  },
  bloodGroupButton: {
    borderWidth: 1,
    borderColor: "#777",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 4,
    backgroundColor: "#f0f0f0",
  },
  bloodGroupButtonSelected: {
    backgroundColor: "#4ade80",
    borderColor: "#22c55e",
  },
  bloodGroupText: {
    color: "#444",
    fontWeight: "500",
  },
  bloodGroupTextSelected: {
    color: "white",
    fontWeight: "700",
  },
  donorCard: {
    backgroundColor: "white",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  donorName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  donorLocation: {
    fontSize: 14,
    color: "#555",
  },
  donorPhone: {
    fontSize: 14,
    color: "#222",
    marginTop: 4,
  },
  donorBlood: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: "600",
    color: "#16a34a",
  },
});
