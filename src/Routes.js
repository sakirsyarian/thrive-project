import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from './pages/Login';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Upload from './pages/Upload';


const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                <Stack.Screen name='Detail' component={Detail} />
                <Stack.Screen name='Upload' component={Upload} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;