import React from "react";
import { View, Text } from "react-native";

const DonarLayout = ({ children } : { children: React.ReactNode}) => {
  return (
    <View>
      <Text>Top of the layout</Text>
      {children}
      <Text>Bottom of the Layout</Text>
    </View>
  )
}

export default DonarLayout;