import { Image, Text, View } from "react-native";

import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";

const RideCard = ({ ride }: { ride: Ride }) => {
  const driverName = ride.driver 
    ? `${ride.driver.first_name} ${ride.driver.last_name}`
    : "Unknown Driver";

  return (
    <View className="mx-5 mb-4 bg-white rounded-3xl overflow-hidden shadow-md"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <View className="flex flex-col p-5">
        {/* Trip Details Header */}
        <View className="flex flex-row items-start justify-between mb-4">
          <View className="flex-1">
            {/* From */}
            <View className="flex flex-row items-start gap-3 mb-4">
              <View className="w-6 h-6 rounded-full bg-black flex items-center justify-center mt-0.5">
                <Text className="text-white text-xs font-bold">●</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xs font-JakartaRegular text-gray-500 mb-1">
                  From
                </Text>
                <Text className="text-sm font-JakartaSemiBold text-gray-900 leading-5">
                  {ride.origin_address}
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View className="w-0.5 h-4 bg-gray-300 ml-2.5 mb-2" />

            {/* To */}
            <View className="flex flex-row items-start gap-3">
              <View className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mt-0.5">
                <Text className="text-white text-xs font-bold">●</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xs font-JakartaRegular text-gray-500 mb-1">
                  To
                </Text>
                <Text className="text-sm font-JakartaSemiBold text-gray-900 leading-5">
                  {ride.destination_address}
                </Text>
              </View>
            </View>
          </View>

          {/* Ride Info Badge */}
          <View className="bg-gray-100 rounded-2xl px-3 py-2 ml-3">
            <Text className="text-xl font-JakartaBold text-black">
              ${ride.fare_price?.toFixed(2) || "0.00"}
            </Text>
            <Text className="text-xs font-JakartaRegular text-gray-600 mt-1">
              {ride.ride_time} min
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View className="w-full h-px bg-gray-200 my-4" />

        {/* Ride Details Grid */}
        <View className="flex flex-row justify-between items-center mb-4">
          <View className="items-start">
            <Text className="text-xs font-JakartaRegular text-gray-500 mb-1">
              Driver
            </Text>
            <Text className="text-sm font-JakartaBold text-gray-900">
              {driverName}
            </Text>
          </View>

          <View className="items-center">
            <Text className="text-xs font-JakartaRegular text-gray-500 mb-1">
              Date
            </Text>
            <Text className="text-sm font-JakartaBold text-gray-900">
              {formatDate(ride.created_at)}
            </Text>
          </View>

          <View className="items-end">
            <Text className="text-xs font-JakartaRegular text-gray-500 mb-1">
              Status
            </Text>
            <View className="flex flex-row items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full">
              <View className="w-2 h-2 rounded-full bg-green-500" />
              <Text className="text-sm font-JakartaBold text-green-700 capitalize">
                {ride.payment_status === "paid" ? "Completed" : ride.payment_status}
              </Text>
            </View>
          </View>
        </View>

        {/* Additional Info */}
        <View className="pt-3 border-t border-gray-200 flex flex-row justify-between">
          <View>
            <Text className="text-xs font-JakartaRegular text-gray-500 mb-1">
              Seats
            </Text>
            <Text className="text-sm font-JakartaBold text-gray-900">
              {ride.driver?.car_seats || 4} Available
            </Text>
          </View>
          <View>
            <Text className="text-xs font-JakartaRegular text-gray-500 mb-1">
              Distance
            </Text>
            <Text className="text-sm font-JakartaBold text-gray-900">
              ~{Math.round(ride.ride_time * 1.5)} km
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCard;
