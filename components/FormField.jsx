import { Image, StyleSheet,TextInput, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {icons} from "../constants"

const FormField = ({
  title,
  value,
  placeholder,
  handleChange,
  otherStyles,
  ...props
}) => {
  const [isPassword, setIsPassword] = useState(false);

  const togglePassword = () => {
    setIsPassword(!isPassword);
  };

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="w-full rounded-2xl px-4 border-2 focus:bg-secondary border-black-200 h-14 px-4 bg-black-100 items-center flex-row">
        <TextInput
          className="w-full flex-1 text-base font-psemibold h-full text-white"
          placeholder={placeholder}
          placeholderTextColor={"#8D8D8D"}
          value={value}
          onChangeText={handleChange}
          secureTextEntry={title === "Password" && !isPassword ? true : false}
          {...props}
        />

        {title === "Password" && (
            <TouchableOpacity onPress={() => {
                setIsPassword(!isPassword)
            }}>
                {/* <Text className="text-white font-pmedium">
                    {isPassword ? "Hide" : "Show"}
                </Text> */}
                <Image source={!isPassword? icons.eye : icons.eyehide} className="w-5 h-5" resizeMode="container" />
            </TouchableOpacity>
            )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({});
