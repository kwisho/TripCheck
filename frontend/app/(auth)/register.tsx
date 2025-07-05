import { signUp } from '@/auth/signUp';

import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-paper';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressRegister = async () => {
    if (!email || !password) {
      Alert.alert('エラー', 'メールアドレスとパスワードを入力してください');
      return;
    }
    try {
      const message = await signUp(email, password);
      Alert.alert('成功', message);
      router.push({
        pathname: '/confirm-code',
        params: { email },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ImageBackground
          source={require('@/assets/images/login-bg.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.panel}>
            <Text style={styles.title}>会員登録</Text>

            <TextInput
              placeholder="メールアドレス"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="#999"
            />
            <TextInput
              placeholder="パスワード"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#999"
            />

            <TouchableOpacity
              style={[styles.loginButton, !(email && password) && { opacity: 0.5 }]}
              onPress={onPressRegister}
            >
              <Text style={styles.loginButtonText}>登録</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              既にアカウントをお持ちの方は{'\n'}
              <Text style={styles.link} onPress={() => router.replace('/login')}>
                こちら
              </Text>
            </Text>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  panel: {
    width: '85%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: '#0a6ea9',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 16,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  link: {
    color: '#0a6ea9',
    fontWeight: '600',
  },
});
