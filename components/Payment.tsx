import { useAuth } from "@clerk/clerk-expo";
import RazorpayCheckout from 'react-native-razorpay';
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { PaymentProps } from "@/types/type";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const {
    userAddress,
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationAddress,
    destinationLongitude,
  } = useLocationStore();

  const { userId } = useAuth();
  const [success, setSuccess] = useState<boolean>(false);

  const createRazorpayOrder = async () => {
    try {
      const response = await fetchAPI("/(api)/(razorpay)/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          currency: "INR", // Assuming INR, change if needed
        }),
      });

      if (response.error) {
        throw new Error(response.error);
      }
      return response.order;
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      Alert.alert("Payment Error", "Could not create payment order.");
      return null;
    }
  };

  const verifyRazorpayPayment = async (
    razorpay_payment_id: string,
    razorpay_order_id: string,
    razorpay_signature: string,
  ) => {
    try {
      const response = await fetchAPI("/(api)/(razorpay)/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        }),
      });

      if (response.error) {
        throw new Error(response.error);
      }
      return response.success;
    } catch (error) {
      console.error("Error verifying Razorpay payment:", error);
      Alert.alert("Payment Error", "Could not verify payment.");
      return false;
    }
  };

  const handlePayment = async () => {
    const order = await createRazorpayOrder();
    if (!order) return;

    const options = {
      description: "Ride Payment",
      image: images.logo, // Assuming you have a logo image in your assets
      currency: order.currency,
      key: process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID, // Use environment variable for Razorpay Key ID
      amount: order.amount,
      name: "Uber Clone",
      order_id: order.id,
      prefill: {
        email: email,
        contact: "", // Optional: prefill user contact number
        name: fullName,
      },
      theme: { color: "#F37254" },
    };

    RazorpayCheckout.open(options)
      .then(async (data: any) => {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = data;
        const isVerified = await verifyRazorpayPayment(
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        );

        if (isVerified) {
          await fetchAPI("/(api)/ride/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              origin_address: userAddress,
              destination_address: destinationAddress,
              origin_latitude: userLatitude,
              origin_longitude: userLongitude,
              destination_latitude: destinationLatitude,
              destination_longitude: destinationLongitude,
              ride_time: rideTime.toFixed(0),
              fare_price: parseInt(amount) * 100,
              driver_id: driverId,
              user_id: userId,
              status: "paid", // Set status to paid after successful payment
            }),
          });
          setSuccess(true);
        } else {
          Alert.alert("Payment Failed", "Payment verification failed.");
        }
      })
      .catch((error: any) => {
        Alert.alert("Payment Failed", error.description || "Something went wrong.");
        console.error("Razorpay Error:", error);
      });
  };

  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={handlePayment}
      />

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />

          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Booking placed successfully
          </Text>

          <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
            Thank you for your booking. Your reservation has been successfully
            placed. Please proceed with your trip.
          </Text>

          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

export default Payment;
