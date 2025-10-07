import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMagic, FaStar, FaCalculator, FaWhatsapp } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const NumerologyContainer = styled.div`
  margin-top: 50px;
  min-height: 100vh;
  position: relative;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 40% 80%, rgba(102, 126, 234, 0.2) 0%, transparent 50%);
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 35px,
        rgba(255, 255, 255, 0.03) 35px,
        rgba(255, 255, 255, 0.03) 70px
      );
    z-index: 0;
  }

  @media (max-width: 480px) {
    margin-top: 40px;
  }
`;

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  min-height: calc(100vh - 70px);
  position: relative;
  z-index: 2;
  background: linear-gradient(135deg, #20b2aa 0%, #48cae4 100%);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
    padding: ${theme.spacing.lg};
  }

  @media (max-width: 768px) {
    padding: ${theme.spacing.sm};
    gap: ${theme.spacing.sm};
    margin: 10px;
    width: calc(100% - 20px);
    border-radius: 15px;
  }


  @media (max-width: 480px) {
    padding: 8px;
    gap: 8px;
    margin: 4px;
    width: calc(100% - 8px);
    border-radius: 12px;
    max-width: calc(100vw - 8px);
    box-sizing: border-box;
  }

  @media (max-width: 390px) {
    padding: 6px;
    gap: 6px;
    margin: 2px;
    width: calc(100% - 4px);
    max-width: calc(100vw - 4px);
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};

  @media (max-width: 768px) {
    gap: ${theme.spacing.md};
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};

  @media (max-width: 768px) {
    gap: ${theme.spacing.md};
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const CompactHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  padding: 60px 8px 0;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 20px 8px 0;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px 6px 0;
    margin-bottom: 15px;
  }
`;

const ImageCard = styled.div`
  position: relative;
  width: 100%;
  max-width: 96%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    max-width: 98%;
    border-radius: 12px;

    &:hover {
      transform: translateY(-2px);
    }
  }

  @media (max-width: 480px) {
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: none;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  background: white;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;

  @media (max-width: 768px) {
    padding: 8px;
    min-height: 350px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    min-height: 300px;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  display: block;
  object-fit: contain;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: 350px;
    max-height: 450px;
    object-fit: contain;
  }

  @media (max-width: 480px) {
    min-height: 300px;
    max-height: 400px;
  }

  /* Fallback if image fails to load */
  &:not([src]),
  &[src=""],
  &:after {
    content: '';
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  }
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
    flex-direction: column;
    gap: 10px;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 30px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const NumberSymbols = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
  font-size: 2rem;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    gap: 15px;
  }
`;

const MagicIcon = styled(FaMagic)`
  color: ${theme.colors.neutral.white};
  font-size: 1.8rem;
`;

const CompactFormCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  padding: ${theme.spacing.xl};
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg,
      ${theme.colors.primary.green},
      ${theme.colors.primary.skyBlue},
      #20b2aa
    );
    border-radius: 20px 20px 0 0;
  }

  @media (max-width: 768px) {
    padding: ${theme.spacing.lg};
    border-radius: 15px;
    margin: 0;
  }

  @media (max-width: 480px) {
    padding: 12px;
    border-radius: 12px;
    width: 100%;
    max-width: 100%;
  }

  @media (max-width: 390px) {
    padding: 10px;
    border-radius: 10px;
  }
`;

const CompactInfoCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
  border-left: 4px solid;
  border-image: linear-gradient(180deg,
    ${theme.colors.primary.green},
    ${theme.colors.primary.skyBlue},
    #20b2aa
  ) 1;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.15);
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.primary.green};
    position: relative;
  }

  p, li {
    font-size: 0.95rem;
    line-height: 1.6;
    color: ${theme.colors.neutral.gray700};
    margin-bottom: 8px;
  }

  ul {
    margin: 0;
    padding-left: ${theme.spacing.md};
  }

  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
    border-radius: 10px;
    margin-bottom: ${theme.spacing.sm};
    margin-left: 0;
    margin-right: 0;
  }

  @media (max-width: 480px) {
    padding: 15px;
    border-radius: 8px;
  }
`;

const CompactFormTitle = styled.h3`
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  background: linear-gradient(135deg,
    ${theme.colors.primary.green},
    ${theme.colors.primary.skyBlue}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  font-size: 1.5rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 18px;
    flex-direction: column;
    gap: 8px;
  }
`;

const CompactForm = styled.form`
  display: grid;
  gap: ${theme.spacing.lg};

  @media (max-width: 768px) {
    gap: ${theme.spacing.md};
  }

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const CompactFormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
  }

  @media (max-width: 480px) {
    gap: 12px;
  }

  @media (max-width: 390px) {
    gap: 10px;
  }
`;

const CompactFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    min-width: 0;
  }
`;

const CompactLabel = styled.label`
  font-weight: 500;
  color: ${theme.colors.neutral.gray400};
  margin-bottom: 8px;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CompactInput = styled.input`
  padding: ${theme.spacing.md};
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 8px;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.2s ease;
  width: 100%;
  height: 48px;
  box-sizing: border-box;

  &:focus {
    border-color: ${theme.colors.primary.green};
    box-shadow: 0 0 0 2px ${theme.colors.primary.green}15;
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.neutral.gray400};
    font-size: 0.9rem;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    height: 50px;
    padding: 15px;
    font-size: 1rem;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    height: 48px;
    padding: 12px;
    font-size: 16px;
    border-radius: 8px;
    max-width: 100%;
  }

  @media (max-width: 390px) {
    height: 46px;
    padding: 10px;
    font-size: 16px;
  }
`;


const CompactSelect = styled.select`
  padding: ${theme.spacing.md};
  border: 1px solid rgba(14, 165, 233, 0.3);
  border-radius: 8px;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  height: 48px;
  box-sizing: border-box;

  &:focus {
    border-color: ${theme.colors.primary.skyBlue};
    box-shadow: 0 0 0 2px ${theme.colors.primary.skyBlue}15;
    outline: none;
  }

  @media (max-width: 768px) {
    height: 50px;
    padding: 15px;
    font-size: 1rem;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    height: 48px;
    padding: 12px;
    font-size: 16px;
    border-radius: 8px;
    max-width: 100%;
  }

  @media (max-width: 390px) {
    height: 46px;
    padding: 10px;
    font-size: 16px;
  }
`;

const CompactSubmitButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: linear-gradient(135deg,
    ${theme.colors.primary.green},
    ${theme.colors.primary.skyBlue},
    #20b2aa
  );
  color: ${theme.colors.neutral.white};
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.lg};
  width: 100%;
  min-height: 54px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 16px 24px;
    font-size: 1.1rem;
    border-radius: 14px;
    min-height: 56px;
    margin-top: 20px;

    &:hover {
      transform: translateY(-1px);
    }
  }

  @media (max-width: 480px) {
    padding: 18px 20px;
    font-size: 1.1rem;
    border-radius: 12px;
    min-height: 58px;
    margin-top: 18px;

    &:hover {
      transform: none;
    }
  }
`;

const Numerology: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    birthTime: '',
    birthPlace: '',
    phoneNumber: '',
    profession: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = `
🔮 *Numerology Consultation Request* 🔮

👤 *Personal Details:*
• Name: ${formData.fullName}
• Date of Birth: ${formData.dateOfBirth}
• Birth Time: ${formData.birthTime || 'Not provided'}
• Birth Place: ${formData.birthPlace}
• Current Phone: ${formData.phoneNumber}
• Profession: ${formData.profession || 'Not specified'}

---
Please provide me with a detailed numerology analysis and recommend the perfect premium number that aligns with my birth chart and life path! 🌟
    `;

    const whatsappUrl = `https://wa.me/917700071600?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        fullName: '',
        dateOfBirth: '',
        birthTime: '',
        birthPlace: '',
        phoneNumber: '',
        profession: ''
      });
      alert('Your numerology consultation request has been sent! Our expert will contact you soon with personalized recommendations.');
    }, 1000);
  };

  return (
    <NumerologyContainer>
      <CompactHeader>
        <ImageCard>
          <ImageWrapper>
            <HeroImage src="numerology1.jpg" alt="मोबाइल न्यूमरोलॉजी - अब आपका नंबर बोलेगा आपकी किस्मत!" />
          </ImageWrapper>
        </ImageCard>
      </CompactHeader>

      <MainLayout>
        <LeftPanel>
          <CompactFormCard>
            <CompactFormTitle>
              <FaCalculator />
              Get Your Numerology Analysis
            </CompactFormTitle>

            <CompactForm onSubmit={handleSubmit}>
              <CompactFormRow>
                <CompactFormGroup>
                  <CompactLabel htmlFor="fullName">Full Name *</CompactLabel>
                  <CompactInput
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your complete name"
                    required
                  />
                </CompactFormGroup>

                <CompactFormGroup>
                  <CompactLabel htmlFor="dateOfBirth">Date of Birth *</CompactLabel>
                  <CompactInput
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </CompactFormGroup>
              </CompactFormRow>

              <CompactFormRow>
                <CompactFormGroup>
                  <CompactLabel htmlFor="birthTime">Birth Time (Optional)</CompactLabel>
                  <CompactInput
                    type="time"
                    id="birthTime"
                    name="birthTime"
                    value={formData.birthTime}
                    onChange={handleChange}
                  />
                </CompactFormGroup>

                <CompactFormGroup>
                  <CompactLabel htmlFor="birthPlace">Birth Place *</CompactLabel>
                  <CompactInput
                    type="text"
                    id="birthPlace"
                    name="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleChange}
                    placeholder="City, State, Country"
                    required
                  />
                </CompactFormGroup>
              </CompactFormRow>

              <CompactFormRow>
                <CompactFormGroup>
                  <CompactLabel htmlFor="phoneNumber">Current Phone Number *</CompactLabel>
                  <CompactInput
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="98765 43210"
                    required
                  />
                </CompactFormGroup>

                <CompactFormGroup>
                  <CompactLabel htmlFor="profession">Profession/Business (Optional)</CompactLabel>
                  <CompactSelect
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                  >
                    <option value="">Select your profession</option>
                    <option value="business-owner">Business Owner</option>
                    <option value="entrepreneur">Entrepreneur</option>
                    <option value="doctor">Doctor</option>
                    <option value="lawyer">Lawyer</option>
                    <option value="engineer">Engineer</option>
                    <option value="teacher">Teacher</option>
                    <option value="artist">Artist/Creative</option>
                    <option value="finance">Finance Professional</option>
                    <option value="sales">Sales & Marketing</option>
                    <option value="consultant">Consultant</option>
                    <option value="other">Other</option>
                  </CompactSelect>
                </CompactFormGroup>
              </CompactFormRow>

              <CompactSubmitButton type="submit" disabled={isSubmitting}>
                <FaWhatsapp />
                {isSubmitting ? 'Sending...' : 'Get My Numerology Analysis'}
              </CompactSubmitButton>
            </CompactForm>
          </CompactFormCard>
        </LeftPanel>

        <RightPanel>
          <CompactInfoCard>
            <div style={{ lineHeight: '1.8', fontSize: '0.95rem' }}>
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ color: theme.colors.primary.green, marginBottom: '10px' }}>1. क्या आप जानते हैं ⁉️</h3>
                <p>इस ब्रह्मांड 🌞🪐 में जो कुछ भी होता है, वह किसी न किसी नंबर से जुड़ा होता है। हर मोबाइल नंबर एक विशेष ऊर्जा 💫 को धारण करता है — जो आपके जीवन में 🤗सफलता, असफलता, स्वास्थ्य, रिश्ते, व्यवसाय और भाग्य को प्रभावित कर सकता है।</p>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ color: theme.colors.primary.green, marginBottom: '10px' }}>2. 🔍 मोबाइल न्यूमरोलॉजी क्या है ⁉️</h3>
                <p>मोबाइल न्यूमरोलॉजी (Mobile Numerology) एक ऐसी अद्भुत 📚विद्या है जिसमें आपके मोबाइल नंबर को आपके जन्मांक और मूलांक 📖🔖 के अनुसार विश्लेषण किया जाता है। इससे यह जाना जा सकता है कि आपका नंबर आपके लिए लकी है या ब्लॉकेज पैदा कर रहा है।</p>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ color: theme.colors.primary.green, marginBottom: '10px' }}>3. क्यों ज़रूरी है ⁉️ आज के समय में मोबाइल न्यूमरोलॉजी?</h3>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  <li>मोबाइल 📱 आज सिर्फ बात करने का साधन नहीं रहा, ये आपकी वाइब, कनेक्शन और ऊर्जा को ट्रांसफर करता है।</li>
                  <li>हर दिन आप इसी नंबर से 🌎 दुनिया से जुड़ते हैं – अगर ये नंबर आपके ग्रहों से मेल नहीं खाता, तो रुकावटें, तनाव और असफलता आ सकती है।</li>
                  <li>एक सही नंबर 🎯 आपको बना सकता है attractive, successful & powerful communicator.</li>
                </ul>
                <h4 style={{ color: theme.colors.primary.skyBlue, margin: '15px 0 8px 0' }}>🚫 बुरे मोबाइल नंबर क्या होते हैं?</h4>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  <li>जो आपके मूलांक से टकराते हैं</li>
                  <li>जिनमें अलग-अलग दिशाओं की ऊर्जा का टकराव हो</li>
                </ul>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ color: theme.colors.primary.green, marginBottom: '10px' }}>4. 🌠 भविष्य भी नंबर से जुड़ा होता है</h3>
                <p>हर नाम, हर तारीख, हर रिश्ता और हर अवसर – नंबर के माध्यम से ही ब्रह्मांड 📿 का खेल चलता है। जब आप सही नंबर के साथ होते हैं, तो पूरी 🛕 सृष्टि आपके लिए मार्ग खोलने लगती है।</p>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ color: theme.colors.primary.green, marginBottom: '10px' }}>5. ✅ मोबाइल न्यूमरोलॉजी के फायदे:</h3>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  <li>आपकी financial growth 📈 में सहायक</li>
                  <li>व्यापार में positive response ⚡️ लाता है</li>
                  <li>मानसिक तनाव 😰 को कम करता है</li>
                  <li>रिश्तों 🤝 में संतुलन लाता है</li>
                  <li>भाग्य 🔮 को activate करता है</li>
                  <li>छुपे हुए talents 🪄 को उजागर करता है</li>
                  <li>सही नंबर आपको बनाता है 🧲 magnet for opportunities</li>
                </ul>
              </div>

              <div style={{ marginBottom: '0' }}>
                <h3 style={{ color: theme.colors.primary.green, marginBottom: '10px' }}>6. 📞 अब जानिए क्या आपका मोबाइल नंबर आपके लिए शुभ है या नहीं ⁉️</h3>
                <p style={{ fontWeight: '600', color: theme.colors.primary.green, marginBottom: '15px' }}>
                  👉 सिर्फ ₹999/- में पाएँ:
                </p>
                <ul style={{ paddingLeft: '20px', margin: '0 0 15px 0' }}>
                  <li>मोबाइल नंबर का पूर्ण न्यूमरोलॉजिकल 📑 विश्लेषण</li>
                  <li>कौन सा नंबर आपके लिए भाग्यशाली 😇 रहेगा</li>
                  <li>सही नंबर लेने की सटीक 👨🏻‍🎓 गाइडेंस</li>
                  <li>ब्लॉकेज दूर करने के ✨ उपाय</li>
                </ul>
                <p style={{ textAlign: 'center', fontWeight: '700', color: theme.colors.primary.green, margin: '15px 0', fontSize: '1.1rem' }}>
                  💯% Personalized | 1-on-1 Consultation
                </p>
                <p style={{ textAlign: 'center', fontWeight: '600', fontStyle: 'italic', color: theme.colors.primary.skyBlue, margin: 0 }}>
                  आपका नंबर सिर्फ डिजिट नहीं, आपकी 🧭 दिशा है।
                </p>
              </div>
            </div>
          </CompactInfoCard>
        </RightPanel>
      </MainLayout>
    </NumerologyContainer>
  );
};

export default Numerology;