import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { GoogleInputProps } from "@/types/type";

// Define prediction type for clarity
type Prediction = {
  place_id: string;
  description: string;
};

const GoogleTextInput = ({
  icon,
  initialLocation = "Search",
  containerStyle,
  textInputBackgroundColor = "#FFFFFF",
  handlePress,
}: GoogleInputProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = "AIzaSyA60SGyYpn7wY-XrUU7MMtOCWjN3B7gRos";

  const fetchPredictions = async (text: string) => {
    try {
      if (text.length < 2) {
        setPredictions([]);
        return;
      }

      setIsLoading(true);

      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        text
      )}&key=${apiKey}&language=en`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.predictions) {
        setPredictions(data.predictions);
      } else {
        setPredictions([]);
      }
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setPredictions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchText) {
        fetchPredictions(searchText);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const handleSelectPlace = async (
    placeId: string,
    description: string
  ): Promise<void> => {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      const details = data.result;

      setPredictions([]);
      setSearchText(description);

      if (handlePress) {
        handlePress({
          latitude: details.geometry?.location?.lat || 0,
          longitude: details.geometry?.location?.lng || 0,
          address: description,
        });
      } else {
        console.log("Place selected:", description);
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  const getContainerStyle = () => {
    if (typeof containerStyle === "string") {
      if (
        containerStyle.includes("bg-white") ||
        containerStyle.includes("shadow")
      ) {
        return {
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
        };
      }
      return {};
    }

    return containerStyle || {};
  };

  return (
    <View style={[styles.outerContainer]}>
      <View style={[styles.container, getContainerStyle()]}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.textInput,
              { backgroundColor: textInputBackgroundColor },
            ]}
            placeholder={initialLocation}
            value={searchText}
            onChangeText={(text: string) => setSearchText(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {isLoading ? (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="small"
              color="#0000ff"
            />
          ) : (
            icon && <View style={styles.iconContainer}>{icon}</View>
          )}
        </View>
      </View>

      {predictions.length > 0 && (
        <FlatList
          data={predictions}
          keyExtractor={(item) => item.place_id}
          style={styles.listView}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() =>
                handleSelectPlace(item.place_id, item.description)
              }
            >
              <Text style={styles.description}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: "relative",
    zIndex: 50,
  },
  container: {
    borderRadius: 16,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  textInput: {
    flex: 1,
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  loadingIndicator: {
    position: "absolute",
    right: 15,
  },
  iconContainer: {
    position: "absolute",
    right: 15,
    zIndex: 60,
  },
  listView: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    position: "absolute",
    top: 55,
    left: 0,
    right: 0,
    zIndex: 100,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
    maxHeight: 200,
  },
  row: {
    padding: 13,
    height: 44,
    flexDirection: "row",
  },
  description: {
    fontSize: 15,
  },
});

export default GoogleTextInput;
