import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.EXPO_PUBLIC_COGNITO_USER_POOL_ID as string,
  ClientId: process.env.EXPO_PUBLIC_COGNITO_APP_CLIENT_ID as string,
};

export default new CognitoUserPool(poolData);
