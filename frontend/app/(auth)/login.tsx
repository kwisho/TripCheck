import { getCurrentUser } from '@/auth/auth';
import { signIn } from '@/auth/signIn';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onPressLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert('メールアドレスとパスワードを入力してください');
      return;
    }

    try {
      await signIn(email, password);
      router.push('/');
    } catch (error) {
      console.error(error);
      Alert.alert('ログインに失敗しました');
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
            <Text style={styles.title}>ログイン</Text>

            <TextInput
              placeholder="メールアドレス"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="#999"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="パスワード"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#999"
              autoCapitalize="none"
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />

            <TouchableOpacity
              style={[styles.loginButton, !(email && password) && { opacity: 0.5 }]}
              onPress={onPressLogin}
            >
              <Text style={styles.loginButtonText}>ログイン</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.footerText}>
                パスワードをお忘れの方は <Text style={styles.link}>こちら</Text>
              </Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              アカウントをお持ちでない方は、{'\n'}
              <Text style={styles.link} onPress={() => router.push('/register')}>
                新規登録はこちら
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
