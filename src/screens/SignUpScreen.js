import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Form from '../components/Form';
import * as Yup from 'yup';
import firebase from '../firebase';

const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Please enter a valid email')
      .email()
      .label('Email'),
    password: Yup.string()
      .required()
      .min(6, 'Password must have at least 6 characters')
      .label('Password'),
    confirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Confirmation password must match password'),
});

const SignUpScreen = ({ navigation }) => {
    const [signInError, setSignInError] = useState('');
    
    async function handleOnSignUp(values) {
        const { name, email, password } = values;
        setSignInError(null);
        try {
          const authCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
          const user = authCredential.user;
          await user.updateProfile({displayName: name});
          navigation.navigate('HomeScreen');
        } catch (error) {
          setSignInError(error.message);
        }
    }

    return (
      <SafeAreaView>
        <SafeAreaView style={styles.form}>
          <Form
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleOnSignUp}
          >
            <Form.Field
              name="email"
              leftIcon="email"
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <Form.Field
              name="password"
              leftIcon="lock"
              placeholder="Enter password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
            />
            <Form.Field
              name="confirmPassword"
              leftIcon="lock"
              placeholder="Confirm password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
            />
            <Form.Button title='Sign Up'/>
            {<Form.ErrorMessage error={signInError} visible={true}/>}
          </Form>
        </SafeAreaView>
      </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    form: {
        width: '85%',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: '10%'
    },
});

export default SignUpScreen;