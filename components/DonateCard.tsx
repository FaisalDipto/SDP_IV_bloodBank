import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/util";
import { MarkerData } from "@/types/type"; // Use MarkerData instead of Ride
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";

const DonateCard = ({ donor }: { donor: MarkerData }) => {
  const mapUri = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat%3A${donor.longitude}%2C${donor.latitude}&zoom=14.3497&marker=lonlat%3A${donor.longitude}%2C${donor.latitude}%3Btype%3Aawesome%3Bcolor%3A%23bb3f73%3Bsize%3Ax-large%3Bicon%3Acar&apiKey=9faf87061ac4492e94b2d294fe516877`;

  const handleCall = () => {
    Linking.openURL(`tel:${donor.phone_number}`);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: 12,
        shadowColor: "#9ca3af",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 3.5,
        elevation: 16,
        marginBottom: 16,
        padding: 12,
      }}
    >
      {/* Top: Map + Name */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: mapUri }}
          style={{
            width: 80,
            height: 90,
            borderRadius: 12,
            marginRight: 16,
          }}
        />
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "PlusJakartaSans-Bold",
              marginBottom: 4,
            }}
          >
            {donor.first_name} {donor.last_name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#6B7280",
              fontFamily: "PlusJakartaSans-Medium",
            }}
          >
            Blood Group: {donor.blood_group}
          </Text>
        </View>
      </View>

      {/* Bottom Info: Phone + Location */}
      <View
        style={{
          marginTop: 12,
          backgroundColor: "#F6F7FB",
          borderRadius: 12,
          padding: 12,
        }}
      >
        <TouchableOpacity onPress={handleCall}>
          <Text
            style={{
              fontSize: 14,
              color: "#3B82F6",
              fontFamily: "PlusJakartaSans-Medium",
              marginBottom: 4,
            }}
          >
            📞 {donor.phone_number}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 13,
            fontFamily: "PlusJakartaSans-Medium",
            color: "#6B7280",
          }}
        >
          Location: {donor.title}
        </Text>
      </View>
    </View>
  );
};

export default DonateCard;
