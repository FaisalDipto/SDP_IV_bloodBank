import { View, Text, FlatList } from "react-native";

const donationHistory = [
  {
    id: "d1",
    donorName: "Asif Brown",
    bloodGroup: "A+",
    phoneNumber: "+880123456789",
    location: "Kathmandu, Nepal",
    latitude: 27.717245,
    longitude: 85.323961,
    date: "2024-08-12",
    time: "10:20 AM",
  },
  {
    id: "d2",
    donorName: "Omar Wilson",
    bloodGroup: "B+",
    phoneNumber: "+880198765432",
    location: "Pune, India",
    latitude: 18.520430,
    longitude: 73.856744,
    date: "2024-08-13",
    time: "2:00 PM",
  },
  {
    id: "d3",
    donorName: "Fahim Wilson",
    bloodGroup: "O-",
    phoneNumber: "+8801122334455",
    location: "Rijeka, Croatia",
    latitude: 45.327063,
    longitude: 14.442176,
    date: "2024-08-14",
    time: "3:45 PM",
  },
];

const History = () => {
  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#F9FAFB" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>
        Donation History
      </Text>

      <FlatList
        data={donationHistory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fff",
              padding: 16,
              marginBottom: 12,
              borderRadius: 12,
              shadowColor: "#ccc",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>
              {item.donorName}
            </Text>
            <Text>Blood Group: {item.bloodGroup}</Text>
            <Text>Phone: {item.phoneNumber}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Time: {item.time}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default History;
