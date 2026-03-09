import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  TouchableOpacity
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { Theme } from '../../theme';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

export const LoginScreen = () => {
  const [email, setEmail] = useState('parent@mentora.com');
  const [password, setPassword] = useState('123456');
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    const success = await login(email, password);
    if (!success) {
      Alert.alert('Login Failed', 'Invalid credentials or user not found.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Card style={styles.card}>
        <Text style={styles.title}>Mentora</Text>
        <Text style={styles.subtitle}>Connect and Grow</Text>

        <Input
          label="Email or Phone"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />

        <Button 
          title="Login" 
          onPress={handleLogin} 
          isLoading={isLoading}
          style={styles.button}
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Demo: parent@mentora.com, alice@mentora.com, mentor@mentora.com</Text>
          <Text style={styles.footerText}>Password: anything</Text>
        </View>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    padding: Theme.spacing.lg,
  },
  card: {
    padding: Theme.spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as any,
    color: Theme.colors.primary,
    textAlign: 'center',
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
  },
  button: {
    marginTop: Theme.spacing.md,
  },
  forgotPassword: {
    marginTop: Theme.spacing.lg,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: Theme.colors.primary,
    fontSize: 14,
  },
  footer: {
    marginTop: Theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
    paddingTop: Theme.spacing.md,
  },
  footerText: {
    fontSize: 12,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  }
});
