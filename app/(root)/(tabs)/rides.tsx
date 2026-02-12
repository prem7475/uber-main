import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import RideCard from "@/components/RideCard";
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
    driver_id: 1,
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
    driver_id: 2,
    user_id: "user1",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    origin_address: "100 Central Park West, New York, NY",
    destination_address: "Times Square, New York, NY",
    origin_latitude: 40.7505,
    origin_longitude: -73.9680,
    destination_latitude: 40.7580,
    destination_longitude: -73.9855,
    ride_time: 20,
    fare_price: 22.00,
    payment_status: "paid",
    driver_id: 3,
    user_id: "user1",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const Rides = () => {
  const { user } = useUser();
  const [recentRides] = useState<Ride[]>(MOCK_RIDES);
  const [loading] = useState(false);
  const [filterActive, setFilterActive] = useState<"all" | "completed" | "cancelled">("all");

  const filteredRides = recentRides.filter((ride) => {
    if (filterActive === "completed") return ride.payment_status === "paid";
    if (filterActive === "cancelled") return ride.payment_status !== "paid";
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Premium Header */}
        <View className="bg-gradient-to-b from-black via-gray-800 to-gray-900 px-6 pt-6 pb-10 shadow-2xl">
          <Text className="text-4xl font-JakartaBold text-white mb-2">
            🚗 Your Rides
          </Text>
          <Text className="text-sm font-JakartaRegular text-gray-300 leading-5">
            Complete history of all your journeys
          </Text>

          {/* Quick Stats */}
          <View className="flex flex-row gap-3 mt-6">
            <View className="flex-1 bg-white/10 backdrop-blur rounded-2xl px-4 py-3 border border-white/20">
              <Text className="text-gray-300 text-xs font-JakartaRegular uppercase tracking-wide">
                Total Rides
              </Text>
              <Text className="text-white text-2xl font-JakartaBold mt-1">
                {recentRides.length}
              </Text>
            </View>
            <View className="flex-1 bg-white/10 backdrop-blur rounded-2xl px-4 py-3 border border-white/20">
              <Text className="text-gray-300 text-xs font-JakartaRegular uppercase tracking-wide">
                Total Spent
              </Text>
              <Text className="text-white text-2xl font-JakartaBold mt-1">
                ${(recentRides.reduce((sum, r) => sum + r.fare_price, 0)).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Filter Tabs */}
        <View className="px-6 pt-8 pb-6 flex flex-row gap-3">
          {(["all", "completed", "cancelled"] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setFilterActive(tab)}
              className={`px-6 py-3 rounded-full border-2 font-JakartaSemiBold text-sm active:opacity-70 ${
                filterActive === tab
                  ? "bg-black border-black"
                  : "border-gray-300 bg-white"
              }`}
            >
              <Text
                className={`font-JakartaSemiBold text-sm ${
                  filterActive === tab ? "text-white" : "text-gray-700"
                }`}
              >
                {tab === "all"
                  ? "All"
                  : tab === "completed"
                  ? "Completed"
                  : "Cancelled"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Rides Content */}
        <View className="px-6">
          {loading ? (
            <View className="flex items-center justify-center py-20">
              <ActivityIndicator size="large" color="#000" />
              <Text className="text-gray-600 mt-4 font-JakartaMedium">
                Loading your rides...
              </Text>
            </View>
          ) : filteredRides.length > 0 ? (
            <View>
              {/* Section Title */}
              <Text className="text-base font-JakartaBold text-gray-500 uppercase tracking-wider mb-4">
                {filterActive === "all"
                  ? "All Rides"
                  : filterActive === "completed"
                  ? "Completed Rides"
                  : "Cancelled Rides"}
              </Text>

              {/* Rides List */}
              {filteredRides.map((ride, index) => (
                <View
                  key={ride.id}
                  className={`${index < filteredRides.length - 1 ? "mb-4" : ""}`}
                >
                  <RideCard ride={ride} />
                </View>
              ))}
            </View>
          ) : (
            <View className="flex items-center justify-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border-2 border-gray-200">
              <Text className="text-6xl mb-4">🚫</Text>
              <Text className="text-gray-800 font-JakartaBold text-lg text-center">
                No {filterActive === "all" ? "rides" : filterActive} here yet
              </Text>
              <Text className="text-gray-600 text-sm font-JakartaRegular mt-3 px-6 text-center leading-5">
                {filterActive === "all"
                  ? "Your ride history will appear here once you complete your first journey"
                  : `No ${filterActive} rides to show`}
              </Text>

              {filterActive !== "all" && (
                <TouchableOpacity
                  onPress={() => setFilterActive("all")}
                  className="bg-black mt-6 px-8 py-3 rounded-2xl"
                >
                  <Text className="text-white font-JakartaBold text-sm">
                    View All Rides
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Rides;
