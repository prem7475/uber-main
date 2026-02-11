import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import RideCard from "@/components/RideCard";
import { images } from "@/constants";
import { Ride } from "@/types/type";

// Mock recent rides - no backend to fetch from
const MOCK_RIDES: Ride[] = [
  {
    id: "1",
    origin_address: "123 Main St, New York, NY",
    destination_address: "456 Park Ave, New York, NY",
    origin_latitude: 40.7128,
    origin_longitude: -74.0060,
    destination_latitude: 40.7350,
    destination_longitude: -74.0100,
    ride_time: 25,
    fare_price: 25.50,
    payment_status: "paid",
    driver_id: "1",
    user_id: "user1",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    origin_address: "789 Broadway, New York, NY",
    destination_address: "321 5th Ave, New York, NY",
    origin_latitude: 40.7450,
    origin_longitude: -74.0080,
    destination_latitude: 40.7550,
    destination_longitude: -74.0120,
    ride_time: 18,
    fare_price: 18.75,
    payment_status: "paid",
    driver_id: "2",
    user_id: "user1",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const Rides = () => {
  const { user } = useUser();

  const [recentRides] = useState<Ride[]>(MOCK_RIDES);
  const [loading] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={recentRides}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent rides found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <>
            <Text className="text-2xl font-JakartaBold my-5">All Rides</Text>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Rides;
