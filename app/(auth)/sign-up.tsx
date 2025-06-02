import { Text, ScrollView, View, Image, Alert } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({
        ...verification,

        state: "pending",
      });
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert("Error", (err as { errors: { longMessage: string }[] }).errors[0].longMessage);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        // TODO: Cleate a database user
        await fetchAPI('/(api)/user', {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
          }),
        });
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setVerification({
          ...verification,
          error: "Verification Failed",
          state: "failed",
        });
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };

  // if (pendingVerification) {
  //   return (
  //     <>
  //       <Text>Verify your email</Text>
  //       <TextInput
  //         value={code}
  //         placeholder="Enter your verification code"
  //         onChangeText={(code)=> setCode(code)}
  //       />
  //       <TouchableOpacity onPress={onVerifyPress}>
  //         <Text>Verify</Text>
  //       </TouchableOpacity>
  //     </>
  //   )
  // }

  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View
          style={{
            backgroundColor: "white",
            position: "relative",
            width: "100%",
            height: 250,
          }}
        >
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
            Create your Account
          </Text>
        </View>

        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
            title="Sign-Up"
            onPress={onSignUpPress}
            className="mt-6"
          />

          <OAuth />
          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Already have an account?</Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>
        {/* {Verification} */}
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() =>
            setVerification({ ...verification, state: "success" })
          }
        >
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 28, // px-7 (7 * 4 = 28)
              paddingVertical: 36, // py-9 (9 * 4 = 36)
              borderRadius: 24, // rounded-2xl ≈ 24px
              minHeight: 300, // min-h-[300px]
            }}
          >
            <Text
              style={{
                fontSize: 18, // text-2xl = 24px
                fontFamily: "JakartaExtraBold", // custom font
                marginBottom: 8, // mb-2 = 8px
                fontWeight: "bold",
              }}
            >
              Verification
            </Text>
            <Text
              style={{
                fontSize: 14, // text-2xl
                fontFamily: "Jakrta", // custom font family
                marginBottom: 20, // mb-5 (5 * 4 = 20)
              }}
            >
              We have sent a code to {form.email}
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />

            {verification.error && (
              <Text
                style={{
                  color: "#ef4444", // Tailwind red-500
                  fontSize: 14, // Tailwind text-sm
                  marginTop: 4, // Tailwind mt-1 (1 * 4px)
                }}
              >
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify Email"
              onPress={onVerifyPress}
              style={{
                marginTop: 20, // Tailwind mt-5 (5 * 4px)
                backgroundColor: "#22C55E", // Tailwind bg-green-500 (success)
              }}
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={verification.state === "success"}>
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 28, // Tailwind px-7 = 7 * 4
              paddingVertical: 36, // Tailwind py-9 = 9 * 4
              borderRadius: 24, // Tailwind rounded-2xl = 2xl ≈ 24
              minHeight: 300,
            }}
          >
            <Image
              source={images.check}
              style={{
                width: 110,
                height: 110,
                alignSelf: "center",
                marginVertical: 20,
              }}
            />
            <Text
              style={{
                fontSize: 25,
                fontFamily: "Jakarta-Bold",
                textAlign: "center",
              }}
            >
              Verified
            </Text>
            <Text
              style={{
                fontSize: 10, // text-base
                color: "#9CA3AF", // text-gray-400
                fontFamily: "Jakarta-Regular", // font-Jakarta (assumed regular)
                textAlign: "center",
                marginTop: 8, // mt-2
              }}
            >
              You have successfully verified your account
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() =>
                router.push("/(root)/(tabs)/home")}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
