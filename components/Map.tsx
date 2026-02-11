import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { icons } from "@/constants";
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/store";
import { Driver, MarkerData } from "@/types/type";

const directionsAPI = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

// Mock drivers data - no backend to fetch from
const MOCK_DRIVERS: Driver[] = [
  {
    id: "1",
    first_name: "James",
    last_name: "Wilson",
    email: "james@example.com",
    profile_image_url: "https://i.pravatar.cc/150?img=1",
    car_seats: 4,
    car_model: "Toyota Camry",
    car_year: 2022,
    car_color: "Silver",
    car_image_url: "https://via.placeholder.com/150?text=Camry",
    rating: 4.8,
    latitude: 40.7128,
    longitude: -74.0060,
  },
  {
    id: "2",
    first_name: "Sarah",
    last_name: "Johnson",
    email: "sarah@example.com",
    profile_image_url: "https://i.pravatar.cc/150?img=2",
    car_seats: 4,
    car_model: "Honda Accord",
    car_year: 2023,
    car_color: "Black",
    car_image_url: "https://via.placeholder.com/150?text=Accord",
    rating: 4.9,
    latitude: 40.7250,
    longitude: -74.0100,
  },
  {
    id: "3",
    first_name: "Mike",
    last_name: "Taylor",
    email: "mike@example.com",
    profile_image_url: "https://i.pravatar.cc/150?img=3",
    car_seats: 5,
    car_model: "Tesla Model 3",
    car_year: 2023,
    car_color: "White",
    car_image_url: "https://via.placeholder.com/150?text=Tesla",
    rating: 4.7,
    latitude: 40.7050,
    longitude: -74.0150,
  },
];

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();
  const { selectedDriver, setDrivers } = useDriverStore();

  const [drivers, setLocalDrivers] = useState<Driver[]>(MOCK_DRIVERS);
  const [loading, setLoading] = useState(false);
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    if (Array.isArray(drivers)) {
      if (!userLatitude || !userLongitude) return;

      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });

      setMarkers(newMarkers);
    }
  }, [drivers, userLatitude, userLongitude]);

  useEffect(() => {
    if (
      markers.length > 0 &&
      destinationLatitude !== undefined &&
      destinationLongitude !== undefined
    ) {
      calculateDriverTimes({
        markers,
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      }).then((drivers) => {
        setDrivers(drivers as MarkerData[]);
      });
    }
  }, [markers, destinationLatitude, destinationLongitude]);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  if (loading || (!userLatitude && !userLongitude))
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );

  if (error)
    return (
      <View className="flex justify-between items-center w-full">
        <Text>Error: {error}</Text>
      </View>
    );

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl"
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      {markers.map((marker, index) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === +marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))}

      {destinationLatitude && destinationLongitude && (
        <>
          <Marker
            key="destination"
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title="Destination"
            image={icons.pin}
          />
          <MapViewDirections
            origin={{
              latitude: userLatitude!,
              longitude: userLongitude!,
            }}
            destination={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            apikey={directionsAPI!}
            strokeColor="#0286FF"
            strokeWidth={2}
          />
        </>
      )}
    </MapView>
  );
};

export default Map;
