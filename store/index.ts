import { create } from "zustand"
import { DriverStore, LocationStore, MarkerData } from "@/types/type"

export const useLocationStore = create((set) => ({
  // Initialize with safe default values
  userAddress: "",
  userLongitude: null,
  userLatitude: null,
  destinationLongitude: null,
  destinationLatitude: null,
  destinationAddress: "",
  
  setUserLocation: ({latitude, longitude, address} : {latitude : number, longitude : number, address : string}) => {
    // Validate inputs to prevent setting undefined/null values
    if (latitude === undefined || latitude === null || longitude === undefined || longitude === null) {
      console.warn("Invalid coordinates passed to setUserLocation");
      return;
    }
    
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address || ""  // Use empty string instead of null for address
    }));
  },
  
  setDestinationLocation: ({latitude, longitude, address} : {latitude : number, longitude : number, address : string}) => {
    // Validate inputs to prevent setting undefined/null values
    if (latitude === undefined || latitude === null || longitude === undefined || longitude === null) {
      console.warn("Invalid coordinates passed to setDestinationLocation");
      return;
    }
    
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address || ""  // Use empty string instead of null for address
    }));
  },
}))

export const useDonerStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,
  setSelectedDriver: (driverId: number) => set(() => ({ selectedDriver: driverId})),
  setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers: drivers })),
  clearSelectedDriver: () => set(() => ({ selectedDriver: null}))
}))