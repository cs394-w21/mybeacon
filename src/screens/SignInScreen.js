import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Form from '../components/Form';
import * as Yup from 'yup';
import WelcomeHeader from '../components/WelcomeHeader';
import SignUpQuestion from '../components/SignUpQuestion';
import ContinueAsGuest from '../components/ContinueAsGuest';
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


const SignInScreen = ({navigation}) => {
  const [signInError, setSignInError] = useState('');

  async function handleOnSignIn(values) {
    const {email, password} = values;
    setSignInError(null);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('HomeScreen');
    } catch (error) {
      setSignInError(error.message);
    }
  }

  return (
    <SafeAreaView>
      <WelcomeHeader />
      <SafeAreaView style={styles.form}>
        <Form
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleOnSignIn}
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
          <Form.Button title='Sign In' />
          {<Form.ErrorMessage error={signInError} visible={true} />}
        </Form>
      </SafeAreaView>
      <SignUpQuestion navigation={navigation} />
      <ContinueAsGuest navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '85%',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },
  header: {
    width: '100%',
  }
})



export default SignInScreen;
