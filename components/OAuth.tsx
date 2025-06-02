import { View, Text, Image } from "react-native";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";

const OAuth = () => {
  const handleGoogleSignIn = async () => {};

  return (
    <View style={{ marginTop: 16, alignItems: "center", width: "100%" }}>
      <View style={{ flexDirection: "row", alignItems: "center", width: "100%", marginBottom: 16 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "#E5E7EB" }} />
        <Text style={{ marginHorizontal: 10, fontSize: 16, color: "#000" }}>Or</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "#E5E7EB" }} />
      </View>

      <CustomButton
        title="Log In with Google"
        className="w-full shadow-none"
        style={{ backgroundColor: 'white' }}
        IconLeft={() => (
          <Image source={icons.google} resizeMode="contain" style={{ width: 20, height: 20, marginRight: 8,  shadowColor: "transparent" }} />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
