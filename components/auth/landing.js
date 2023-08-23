import { useEffect, useState } from "react";
import { Button, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { app } from '../../database/firebaseConfig'


const Landing = ({navigation}) =>{
    const [isLoading, setIsLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) =>{
            if(!user){
                setIsLogged(false);
            } else{
                setIsLogged(true);
            };
            setIsLoading(false);
        });
    }, []);


const Loading = () =>(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Carregando...</Text>
    </View>
);

const Logged = () =>(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Bem Vindo!!!</Text>
    </View>
);

//para navegar entre as telas é preciso colocar o navigation
const LoggedOut = () =>(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{marginBottom: '1rem'}}>Welcome to Imagigram</Text>

        {/* abaixo é um botão sem estilo, apenas com o nome que vai mudar com base no sistema utilizado, android ou ios */}
        <TouchableOpacity style = {styles.button}  onPress={() => navigation.navigate('Register') }>
            <Text style={styles.text}>Register</Text>
        </TouchableOpacity>

        {/* esse butão serve para navegar até o componente de login, no onPress foi utilizado o navigation para ir até o componente login */}
        <Button icon='login-variant' title="Login" onPress={() => navigation.navigate('Login') }/>
    </View>
);

if(isLoading){
    return <Loading/>;
}

if(isLogged){
    return <Logged/>;
}

return <LoggedOut/>;

};



export default Landing;


//aqui é feito todo o estilo do app, parecido com o css porém utilizando JS
const styles = StyleSheet.create({
    text: {
        color: '#FFFFFF',
        fontWeight: 600,
        textTransform: 'uppercase'
    },
    button:{
        alignItems: 'center',
        backgroundColor: '#2196F3',
        padding: 10,
        marginBottom: '1rem'
    }
});