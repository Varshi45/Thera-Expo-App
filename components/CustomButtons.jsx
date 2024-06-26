import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      className={`bg-secondary items-center justify-center min-h-[35px] rounded-lg ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`${textStyles} text-white font-psemibold py-2 px-4`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
