import {
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ placeholder, initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`w-full px-4 rounded-2xl h-14 items-center flex-row ${
        isFocused ? "border border-secondary-100" : "bg-black-100"
      }`}
    >
      <TextInput
        className="flex-1 text-base font-pregular h-full text-white"
        placeholder={placeholder}
        placeholderTextColor={"#cdcde0"}
        value={query}
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) return Alert.alert("Please enter a search query");
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
