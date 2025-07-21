// screens/AccountSettingsScreen.tsx
import { View, StyleSheet, Alert } from 'react-native';
import { Appbar, List, Switch, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { signOut } from '@/auth/signOut';
import { router } from 'expo-router';

export default function AccountScreen() {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);

  const onPressLogout = async (): Promise<void> => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error(error);
      Alert.alert('ログインに失敗しました');
    }
  };

  return (
    <View style={styles.container}>
      {/* 通知設定スイッチ */}
      <List.Item
        title="通知設定"
        right={() => <Switch value={isEnabled} onValueChange={() => setIsEnabled(!isEnabled)} />}
      />

      {/* 利用規約リンク */}
      <List.Item
        title="利用規約を開く"
        right={() => <List.Icon icon="chevron-right" />}
        onPress={() => console.log('利用規約へ')}
      />

      {/* ログアウトボタン */}
      <Button mode="outlined" textColor="red" style={styles.logoutButton} onPress={onPressLogout}>
        ログアウト
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoutButton: {
    margin: 16,
    borderColor: 'red',
  },
});
