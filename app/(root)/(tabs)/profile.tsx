import { View, Text, Image, StyleSheet } from "react-native";
import { useUser } from "@clerk/clerk-expo";

const Profile = () => {
  const { user } = useUser();

  const getUserDisplayName = () => {
    if (user?.firstName) return user.firstName;
    if (user?.emailAddresses?.length > 0)
      return user.emailAddresses[0].emailAddress.split("@")[0];
    return "User";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome, {getUserDisplayName()}!
      </Text>

      <Image
        source={{ uri: user?.imageUrl }}
        style={styles.avatar}
      />

      <Text style={styles.emailText}>
        {user?.primaryEmailAddress?.emailAddress}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: "PlusJakartaSans-ExtraBold",
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 12,
  },
  emailText: {
    fontSize: 16,
    fontFamily: "PlusJakartaSans-Medium",
    color: "#6B7280",
  },
});

export default Profile;
