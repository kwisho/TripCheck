import { signUp } from '@/auth/signUp';
import FormButton from '@/components/common/FormButton';
import FormInput from '@/components/common/FormInput';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

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
    <View style={styles.container}>
      <FormInput
        label="メールアドレス"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        secureTextEntry={false}
      />

      <FormInput
        label="パスワード"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <FormButton title="登録" onPress={onPressRegister} disabled={!email || !password} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
});
