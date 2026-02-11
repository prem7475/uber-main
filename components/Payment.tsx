import { useAuth } from "@clerk/clerk-expo";
import RazorpayCheckout from 'react-native-razorpay';
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
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
      // Mock order creation since backend is removed
      // In production, this would call your backend API
      const mockOrder = {
        id: `order_${Date.now()}`,
        amount: Math.round(parseFloat(String(amount)) * 100), // Razorpay uses smallest currency unit
        currency: "INR",
      };
      return mockOrder;
    } catch (error) {
      console.error("Error creating payment order:", error);
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
      // Mock verification since backend is removed
      // In production, this would verify the payment signature with your backend
      console.log("Payment verified (mock):", { razorpay_payment_id, razorpay_order_id });
      return true;
    } catch (error) {
      console.error("Error verifying payment:", error);
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
          try {
            // Mock ride creation - no backend to store to
            // In production, this would save to your database
            console.log("Ride booking details (frontend-only):", {
              origin_address: userAddress,
              destination_address: destinationAddress,
              fare_price: parseFloat(String(amount)),
              driver_id: driverId,
              razorpay_payment_id: razorpay_payment_id,
            });
            setSuccess(true);
          } catch (error) {
            console.error("Error processing ride:", error);
            Alert.alert("Error", "Failed to process ride. Please try again.");
          }
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
