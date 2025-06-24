import { signIn } from '@/auth/signIn';
import FormButton from '@/components/common/FormButton';
import FormInput from '@/components/common/FormInput';
import { RootStackParamList } from '@/types/navigation';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text } from 'react-native-paper';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onPressLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert('エラー', 'メールアドレスとパスワードを入力してください');
      return;
    }
    try {
      await signIn(email, password);
      navigation.navigate('(tabs)');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={{ marginBottom: 16, textAlign: 'center' }}>
        TripCheck ログイン
      </Text>
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
