import { View, Text, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import React from 'react'
import icons from '@/constants/icons';
import { login } from '@/lib/Appwrite';
import { useGlobalContext } from '@/lib/global-provider'
import { Redirect } from 'expo-router';

const SignIn = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  if (!loading && isLoggedIn) return <Redirect href='/' />

  const handlelogin = async () => {
    const result = await login();

    if (result) {
      refetch()
    } else {
      Alert.alert('Error', "Failed to login");
    }
  };

  return (
      <SafeAreaView className='h-full bg-white'>
        <ScrollView contentContainerClassName='h-full'>
            <Image
              source={images.onboarding}
              alt="onboarding"
              className='w-full h-4/6'
              resizeMode='contain'
            />

            <View className='px-5'>
              <Text className='text-base text-center uppercase font-rubik text-black-200'>
                Welcome to your Dream Home
              </Text>
              <Text className="text-2xl font-rubik-bold text-black-300 text-center mt-2">
                Lets get you closer to your {"\n"}
                <Text className='text-blue-700 text-2xl'>Your Ideal Home</Text>
              </Text>
              <Text className="text-lg font-rubik text-black-200 text-center mt-9">Login to Restate</Text>
              <TouchableOpacity onPress={handlelogin} className='bg-black shadow-md shadow-zinc-300 rounded-full w-full py-4 px-4 mt-3'>
                <View className="flex flex-row items-center justify-center">
                  <Image
                    source={icons.google}
                    alt="sign in button"
                    className='w-5 h-5'
                    resizeMode='contain'
                  />
                  <Text className='text-lg font-medium font-rubik-medium text-black-300 ml-3'>Continue with Google</Text>
                </View>
              </TouchableOpacity>
            </View>
        </ScrollView>
      </SafeAreaView>
  )
}

export default SignIn