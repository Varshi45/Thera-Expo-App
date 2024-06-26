import { View, Text } from "react-native";
import React from "react";

const InfoBox = ({ title, subtitle, textStyles, containerStyles }) => {
  return (
    <View className={containerStyles}>
      <Text className={`${textStyles} text-white font-psemibold text-center`}>
        {title}
      </Text>
      {subtitle && (
        <Text className="text-white font-psemibold text-center">
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default InfoBox;
