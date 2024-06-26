import { Image, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import React from "react";

import { images } from "../constants";
import CustomButton from "./CustomButtons";

const EmptyState = ({ title, description }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="container"
        className="w-40 h-40"
      />
      <Text className="text-3xl text-gray-100 font-pmedium">{title}</Text>
      <Text className="text-lg text-gray-100 font-psemibold">
        {description}
      </Text>

      <CustomButton
        title="Create Video"
        handlePress={() => router.push("/create")}
        containerStyles="mt-5 w-full"
      />
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({});
