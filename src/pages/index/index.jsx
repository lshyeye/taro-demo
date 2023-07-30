import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import List from "../list";
import "./index.css";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="index">
      <Text>Hello world!</Text>
      <List />
    </View>
  );
}
