import React from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity } from "react-native";

const fakeMessages = [
  { id: "1", text: "Hello, I heard you're donating blood?", sender: "other" },
  { id: "2", text: "Yes! A+ blood. Let me know where to meet.", sender: "me" },
  { id: "3", text: "Awesome. I’ll be at the hospital in 30 minutes.", sender: "other" },
  { id: "4", text: "Perfect. Thanks for your help!", sender: "me" },
];

const Chat = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB", padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16 }}>
        Chat with Donor
      </Text>

      <FlatList
        data={fakeMessages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View
            style={{
              alignSelf: item.sender === "me" ? "flex-end" : "flex-start",
              backgroundColor: item.sender === "me" ? "#DCFCE7" : "#E5E7EB",
              padding: 10,
              borderRadius: 12,
              marginVertical: 4,
              maxWidth: "80%",
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.text}</Text>
          </View>
        )}
      />

      {/* Input box (non-functional for now) */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
          padding: 10,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#ddd",
        }}
      >
        <TextInput
          style={{
            flex: 1,
            height: 44,
            borderColor: "#ddd",
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 12,
            marginRight: 8,
          }}
          placeholder="Type a message..."
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#2563EB",
            borderRadius: 8,
            paddingHorizontal: 16,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
