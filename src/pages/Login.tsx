import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const LoginContainer = styled.div`
  margin-top: 70px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    ${theme.colors.primary.skyBlue}10, 
    ${theme.colors.primary.green}10,
    ${theme.colors.primary.orange}05
  );
  padding: ${theme.spacing.lg} ${theme.spacing.md};
`;

const LoginCard = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.xl};
  padding: ${theme.spacing['2xl']};
  width: 100%;
  max-width: 450px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      ${theme.colors.primary.skyBlue}, 
      ${theme.colors.primary.green}
    );
  }
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const LoginTitle = styled.h1`
  background: linear-gradient(135deg, 
    ${theme.colors.primary.skyBlue}, 
    ${theme.colors.primary.green}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize['2xl']};
`;

const LoginSubtitle = styled.p`
  color: ${theme.colors.neutral.gray600};
  font-size: ${theme.typography.fontSize.md};
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.neutral.gray800};
  margin-bottom: ${theme.spacing.xs};
  font-size: ${theme.typography.fontSize.md};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} calc(${theme.spacing.md} + 30px);
  border: 2px solid ${theme.colors.neutral.gray300};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.md};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${theme.colors.primary.skyBlue};
    box-shadow: 0 0 0 3px ${theme.colors.primary.skyBlue}20;
  }

  &::placeholder {
    color: ${theme.colors.neutral.gray400};
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.md};
  color: ${theme.colors.neutral.gray400};
  font-size: ${theme.typography.fontSize.md};
  pointer-events: none;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: ${theme.spacing.md};
  background: none;
  border: none;
  color: ${theme.colors.neutral.gray400};
  font-size: ${theme.typography.fontSize.md};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  
  &:hover {
    color: ${theme.colors.neutral.gray600};
  }
`;

const ForgotPassword = styled(Link)`
  align-self: flex-end;
  color: ${theme.colors.primary.skyBlue};
  font-size: ${theme.typography.fontSize.sm};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.medium};
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.skyBlue}, 
    ${theme.colors.primary.green}
  );
  color: ${theme.colors.neutral.white};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: ${theme.spacing.sm};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.xl};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${theme.spacing.lg} 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${theme.colors.neutral.gray300};
  }
  
  span {
    padding: 0 ${theme.spacing.md};
    color: ${theme.colors.neutral.gray500};
    font-size: ${theme.typography.fontSize.sm};
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const SocialButton = styled.button<{ $provider: 'google' | 'facebook' }>`
  flex: 1;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.neutral.gray300};
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.lg};
  color: ${props => props.$provider === 'google' ? '#DB4437' : '#4267B2'};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  &:hover {
    border-color: ${props => props.$provider === 'google' ? '#DB4437' : '#4267B2'};
    background: ${props => props.$provider === 'google' ? '#DB443710' : '#4267B210'};
    transform: translateY(-1px);
  }
`;

const SignupPrompt = styled.div`
  text-align: center;
  margin-top: ${theme.spacing.lg};
  color: ${theme.colors.neutral.gray600};
  
  a {
    color: ${theme.colors.primary.skyBlue};
    text-decoration: none;
    font-weight: ${theme.typography.fontWeight.semibold};
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  input[type="checkbox"] {
    width: auto;
    margin: 0;
  }
  
  label {
    margin: 0;
    font-weight: ${theme.typography.fontWeight.normal};
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.neutral.gray600};
    cursor: pointer;
  }
`;

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Login functionality will be implemented with backend integration!');
    }, 1500);
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login will be implemented with OAuth integration!`);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <LoginTitle>Welcome Back</LoginTitle>
          <LoginSubtitle>Sign in to your Premium Numbers account</LoginSubtitle>
        </LoginHeader>

        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <InputWrapper>
              <InputIcon>
                <FaUser />
              </InputIcon>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <InputWrapper>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputWrapper>
          </FormGroup>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <RememberMe>
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </RememberMe>
            <ForgotPassword to="/forgot-password">Forgot Password?</ForgotPassword>
          </div>

          <LoginButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </LoginButton>
        </LoginForm>

        <Divider>
          <span>Or continue with</span>
        </Divider>

        <SocialButtons>
          <SocialButton
            type="button"
            $provider="google"
            onClick={() => handleSocialLogin('google')}
          >
            <FaGoogle />
            Google
          </SocialButton>
          <SocialButton
            type="button"
            $provider="facebook"
            onClick={() => handleSocialLogin('facebook')}
          >
            <FaFacebook />
            Facebook
          </SocialButton>
        </SocialButtons>

        <SignupPrompt>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </SignupPrompt>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;