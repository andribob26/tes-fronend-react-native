import React, { useEffect, useState, useCallback } from 'react'
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store/store';

SplashScreen.preventAutoHideAsync();

const Layout = () => {
    const colorScheme = useColorScheme();
    const [stateLoaded, setStateLoaded] = useState(false);
    const [fontLoaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    const onBeforeLimit = useCallback(() => setStateLoaded(true), []);

    useEffect(() => {
        if (fontLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontLoaded]);

    if (!fontLoaded) {
        return null;
    }


    return (
        
        <Provider store={store}>
            <PersistGate persistor={persistor} onBeforeLift={onBeforeLimit}>
                {stateLoaded && <App />}
            </PersistGate>
        </Provider>

    )
}

const App = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, animation: "fade" }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false, animation: "fade" }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: "fade" }} />
        </Stack>
    )
}

export default Layout