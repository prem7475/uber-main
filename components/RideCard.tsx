import { Image, Text, View } from "react-native";

import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";

const RideCard = ({ ride }: { ride: Ride }) => {
  const driverName = ride.driver 
    ? `${ride.driver.first_name} ${ride.driver.last_name}`
    : "Unknown Driver";

  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col items-start justify-center p-3 w-full">
        <View className="flex flex-row items-start justify-between w-full mb-3">
          <View className="flex-1">
            <View className="flex flex-row items-center gap-x-2 mb-3">
              <Image source={icons.to} className="w-5 h-5" />
              <Text className="text-md font-Jakarta flex-1" numberOfLines={1}>
                {ride.origin_address}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="w-5 h-5" />
              <Text className="text-md font-Jakarta flex-1" numberOfLines={1}>
                {ride.destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col w-full bg-general-500 rounded-lg p-3 items-start justify-center">
          <View className="flex flex-row items-center w-full justify-between mb-3">
            <Text className="text-sm font-Jakarta text-gray-500">
              Date & Time
            </Text>
            <Text className="text-sm font-JakartaBold" numberOfLines={1}>
              {formatDate(ride.created_at)} • {formatTime(ride.ride_time)}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-3">
            <Text className="text-sm font-Jakarta text-gray-500">
              Driver
            </Text>
            <Text className="text-sm font-JakartaBold">
              {driverName}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-3">
            <Text className="text-sm font-Jakarta text-gray-500">
              Car Seats
            </Text>
            <Text className="text-sm font-JakartaBold">
              {ride.driver?.car_seats || 4}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between">
            <Text className="text-sm font-Jakarta text-gray-500">
              Fare
            </Text>
            <Text className="text-sm font-JakartaBold text-green-600">
              ${ride.fare_price?.toFixed(2) || "0.00"}
            </Text>
          </View>

          {ride.payment_status && (
            <View className="flex flex-row items-center w-full justify-between mt-3 pt-3 border-t border-gray-300">
              <Text className="text-sm font-Jakarta text-gray-500">
                Payment
              </Text>
              <Text
                className={`text-sm font-JakartaBold capitalize ${
                  ride.payment_status === "completed" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {ride.payment_status}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default RideCard;
