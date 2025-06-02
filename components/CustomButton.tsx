import React from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]): ViewStyle => {
  switch (variant) {
    case "secondary":
      return { backgroundColor: "#6B7280" }; // Gray
    case "danger":
      return { backgroundColor: "#EF4444" }; // Red
    case "success":
      return { backgroundColor: "#22C55E" }; // Green
    case "outline":
      return {
        backgroundColor: "transparent",
        borderColor: "#D1D5DB", // Neutral border
        borderWidth: 0.5,
      };
    case "primary":
    case "default":
    default:
      return { backgroundColor: "#0286ff" }; // Default blue
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]): TextStyle => {
  switch (variant) {
    case "primary":
      return { color: "black" };
    case "secondary":
      return { color: "#F3F4F6" }; // Light gray
    case "danger":
      return { color: "#FCA5A5" }; // Light red
    case "success":
      return { color: "#BBF7D0" }; // Light green
    case "default":
    default:
      return { color: "#FFFFFF" }; // White fallback
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  style,
  ...props
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      width: "100%",
      borderRadius: 9999,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
      ...getBgVariantStyle(bgVariant),
      ...style, // Allow override
    }}
    {...props}
  >
    {IconLeft && <IconLeft />}
    <Text
      style={{
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 8,
        ...getTextVariantStyle(textVariant),
      }}
    >
      {title}
    </Text>
    {IconRight && <IconRight />}
  </TouchableOpacity>
);

export default CustomButton;
