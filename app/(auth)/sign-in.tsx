import { Text, ScrollView, View, Image } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";
const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = async () => {
    
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ backgroundColor: "white", position: "relative" }}>
        <Image
          source={images.bda}
          style={{
            width: "100%",
            height: 250,
            zIndex: 0,
          }}
        />
        <Text
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            fontSize: 24,
            color: "black",
            fontFamily: "JakartaSemiBold",
          }}
        >
          Welcome!
        </Text>
      </View>

      <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <InputField
          label="Email"
          placeholder="Enter your Email"
          icon={icons.email}
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        <InputField
          label="Password"
          placeholder="Enter your Password"
          icon={icons.lock}
          secureTextEntry={true}
          value={form.password}
          onChangeText={(value) => setForm({ ...form, password: value })}
        />
        <CustomButton
          title="Sign-In"
          onPress={onSignInPress}
          style={{
            marginTop: 24, // mt-6 → 6 * 4 = 24
            width: "91.6666%", // w-11/12 → approx. 91.67%
          }}
        />

        <OAuth />

        <Link href="/sign-up" style={{ marginTop: 40, flexDirection: "row" }}>
          <Text style={{ fontSize: 16, color: "#A0AEC0", textAlign: "center" }}>
            Don't have an account?
          </Text>
          <Text style={{ fontSize: 16, color: "Blue", textAlign: "center" }}>
            Sign Up
          </Text>
        </Link>
      </View>
      {/* {Verification} */}
    </ScrollView>
  );
};

export default SignIn;
