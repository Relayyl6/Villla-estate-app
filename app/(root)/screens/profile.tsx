import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import { useGlobalContext } from '@/lib/global-provider'
import Header from '@/component/Header'

const Profile = () => {
    const { user } = useGlobalContext();
    console.log(user);

  return (
    <SafeAreaView className='bg-white h-full relative'>
        <ScrollView className='bg-white px-5'>
            <Header username="profile" />

            <View className='flex flex-row mt-5 rounded-lg'>
                <View className='flex items-center flex-col'>
                    <Image
                        source={icons.person}
                        alt="person"
                        className='relative size-36 rounded-fll bg-black-300'
                    />
                </View>
                <View className='px-2 flex flex-col justify-around my-3'>
                    <Text className='bg-black text-white p-2'>
                        name: {user?.name}
                    </Text>
                    <Text className='bg-black text-white p-2'>
                        email: {user?.email}
                    </Text>
                </View>
            </View>

            

            
        </ScrollView>

        <View className='absolute bottom-0 right-0'>
                <Image
                    source={icons.edit}
                    alt="edit details"
                    className="size-4"
                />
            </View>
    </SafeAreaView>
  )
}

export default Profile