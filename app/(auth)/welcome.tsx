import { router } from "expo-router";
import { useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import { useState } from "react";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          padding: 10,
        }}
      >
        <Text
          style={{ color: "black", fontSize: 14, fontFamily: "JakartaBold" }}
        >
          Skip
        </Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View
            style={{
              width: 32,
              height: 4,
              marginHorizontal: 4,
              backgroundColor: "#E2E8F0",
              borderRadius: 9999,
            }}
          />
        }
        activeDot={
          <View
            style={{
              width: 32,
              height: 4,
              marginHorizontal: 4,
              backgroundColor: "#0286FF",
              borderRadius: 9999,
            }}
          />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View
            key={item.id}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <Image
              source={item.image}
              style={{ width: "100%", height: 300 }}
              resizeMode="contain"
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginTop: 40, // Tailwind mt-10 = 40px
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 20, // Tailwind text-3xl ≈ 30px
                  fontWeight: "bold",
                  marginHorizontal: 40, // Tailwind mx-10 = 40px
                  textAlign: "center",
                }}
              >
                {item.title}
              </Text>
            </View>

            <Text
              style={{
                fontSize: 12, // Tailwind text-lg ≈ 18px
                fontFamily: "JakartaSemiBold", // Assuming you loaded this font
                textAlign: "center",
                color: "#858585",
                marginHorizontal: 40, // mx-10
                marginTop: 12, // mt-3 = 12px
              }}
            >
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton title={isLastSlide ? "Get Started" : "Next"}
      onPress={() => isLastSlide ? router.replace("/(auth)/sign-up") : swiperRef.current?.scrollBy(1)} style={{
        alignSelf: 'center',
        marginTop: 40, // optional
        padding: 12,   // optional, for `p-3`
        width: '91.666667%' // optional, for `w-11/12`
      }} />
    </View>
  );
};

export default Onboarding;
