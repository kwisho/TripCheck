import FormInput from '@/components/common/FormInput';
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Title } from 'react-native-paper';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressLogin = () => {
    if (!email || !password) {
      Alert.alert('エラー', 'メールアドレスとパスワードを入力してください');
      return;
    }
    // TODO: ログインAPI呼び出しなどの処理
    Alert.alert('ログイン成功', `メール: ${email}`);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>TripCheck ログイン</Title>
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
      <FormButton title="ログイン" onPress={onPressLogin} disabled={!email || !password} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
});
