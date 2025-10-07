import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaGoogle, FaFacebook } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const SignupContainer = styled.div`
  margin-top: 70px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    ${theme.colors.primary.green}10, 
    ${theme.colors.primary.orange}10,
    ${theme.colors.primary.skyBlue}05
  );
  padding: ${theme.spacing.lg} ${theme.spacing.md};
`;

const SignupCard = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.xl};
  padding: ${theme.spacing['2xl']};
  width: 100%;
  max-width: 500px;
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
      ${theme.colors.primary.green}, 
      ${theme.colors.primary.orange}
    );
  }
`;

const SignupHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const SignupTitle = styled.h1`
  background: linear-gradient(135deg, 
    ${theme.colors.primary.green}, 
    ${theme.colors.primary.orange}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize['2xl']};
`;

const SignupSubtitle = styled.p`
  color: ${theme.colors.neutral.gray600};
  font-size: ${theme.typography.fontSize.md};
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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
    border-color: ${theme.colors.primary.green};
    box-shadow: 0 0 0 3px ${theme.colors.primary.green}20;
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

const PasswordStrength = styled.div<{ $strength: number }>`
  margin-top: ${theme.spacing.xs};
  font-size: ${theme.typography.fontSize.sm};
  color: ${props => {
    if (props.$strength < 2) return theme.colors.primary.orange;
    if (props.$strength < 4) return theme.colors.primary.yellow;
    return theme.colors.primary.green;
  }};
`;

const TermsCheckbox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  
  input[type="checkbox"] {
    width: auto;
    margin-top: 2px;
  }
  
  label {
    margin: 0;
    font-weight: ${theme.typography.fontWeight.normal};
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.neutral.gray600};
    cursor: pointer;
    line-height: 1.5;
    
    a {
      color: ${theme.colors.primary.green};
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const SignupButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.green}, 
    ${theme.colors.primary.orange}
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

const LoginPrompt = styled.div`
  text-align: center;
  margin-top: ${theme.spacing.lg};
  color: ${theme.colors.neutral.gray600};
  
  a {
    color: ${theme.colors.primary.green};
    text-decoration: none;
    font-weight: ${theme.typography.fontWeight.semibold};
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const getPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    if (!passwordsMatch) {
      alert('Passwords do not match');
      return;
    }
    
    if (passwordStrength < 3) {
      alert('Please choose a stronger password');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Account creation functionality will be implemented with backend integration!');
    }, 1500);
  };

  const handleSocialSignup = (provider: 'google' | 'facebook') => {
    alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} signup will be implemented with OAuth integration!`);
  };

  const getPasswordStrengthText = (strength: number): string => {
    switch (strength) {
      case 0:
      case 1:
        return 'Weak password';
      case 2:
      case 3:
        return 'Medium strength';
      case 4:
      case 5:
        return 'Strong password';
      default:
        return '';
    }
  };

  return (
    <SignupContainer>
      <SignupCard>
        <SignupHeader>
          <SignupTitle>Create Account</SignupTitle>
          <SignupSubtitle>Join Premium Numbers and find your perfect number</SignupSubtitle>
        </SignupHeader>

        <SignupForm onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="firstName">First Name</Label>
              <InputWrapper>
                <InputIcon>
                  <FaUser />
                </InputIcon>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  required
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <InputWrapper>
                <InputIcon>
                  <FaUser />
                </InputIcon>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                />
              </InputWrapper>
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <InputWrapper>
              <InputIcon>
                <FaEnvelope />
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
            <Label htmlFor="phone">Phone Number</Label>
            <InputWrapper>
              <InputIcon>
                <FaPhone />
              </InputIcon>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="98765 43210"
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
                placeholder="Create a strong password"
                required
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputWrapper>
            {formData.password && (
              <PasswordStrength $strength={passwordStrength}>
                {getPasswordStrengthText(passwordStrength)}
              </PasswordStrength>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <InputWrapper>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                style={{
                  borderColor: formData.confirmPassword && !passwordsMatch 
                    ? theme.colors.primary.orange 
                    : undefined
                }}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputWrapper>
            {formData.confirmPassword && !passwordsMatch && (
              <div style={{ 
                fontSize: theme.typography.fontSize.sm, 
                color: theme.colors.primary.orange,
                marginTop: theme.spacing.xs 
              }}>
                Passwords do not match
              </div>
            )}
          </FormGroup>

          <TermsCheckbox>
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
            />
            <label htmlFor="agreeToTerms">
              I agree to the <a href="/terms" target="_blank">Terms of Service</a> and{' '}
              <a href="/privacy" target="_blank">Privacy Policy</a>
            </label>
          </TermsCheckbox>

          <SignupButton type="submit" disabled={isSubmitting || !formData.agreeToTerms}>
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </SignupButton>
        </SignupForm>

        <Divider>
          <span>Or sign up with</span>
        </Divider>

        <SocialButtons>
          <SocialButton
            type="button"
            $provider="google"
            onClick={() => handleSocialSignup('google')}
          >
            <FaGoogle />
            Google
          </SocialButton>
          <SocialButton
            type="button"
            $provider="facebook"
            onClick={() => handleSocialSignup('facebook')}
          >
            <FaFacebook />
            Facebook
          </SocialButton>
        </SocialButtons>

        <LoginPrompt>
          Already have an account? <Link to="/login">Sign in here</Link>
        </LoginPrompt>
      </SignupCard>
    </SignupContainer>
  );
};

export default Signup;