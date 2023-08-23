import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { app } from '../../database/firebaseConfig'

const Register = () =>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () =>{

        //aqui é para ter o controle de erro ao fazer a ligação com o backend
        try {
            const auth = getAuth(app);
            const data = await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log('err', error);
        }

    };
       
  

    return (
        //View é como se fosse uma DIV
        <View>
        {/* aqui é como é feito o input para o formulario */}
            <TextInput placeholder="Nome" onChangeText={setName}/>
            <TextInput placeholder="E-mail" onChangeText={setEmail}/>
            <TextInput placeholder="Senha" secureTextEntry onChangeText={setPassword}/>
            <Button title="submit" onPress={handleSubmit}/>
        </View>
    );
};

export default Register;