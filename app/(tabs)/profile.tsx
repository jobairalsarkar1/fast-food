import seed from "@/lib/seed";
import React from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <Button title="Seed" onPress={() => seed()} />
    </SafeAreaView>
  );
};

export default Profile;
