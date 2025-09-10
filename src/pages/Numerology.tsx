import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMagic, FaStar, FaCalculator, FaWhatsapp } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const NumerologyContainer = styled.div`
  margin-top: 70px;
  min-height: 100vh;
  background: linear-gradient(135deg, 
    ${theme.colors.primary.skyBlue}08, 
    ${theme.colors.primary.green}05, 
    ${theme.colors.neutral.white}
  );
`;

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  min-height: calc(100vh - 70px);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const CompactHeader = styled.div`
  background: linear-gradient(135deg,
    ${theme.colors.primary.green},
    ${theme.colors.primary.skyBlue},
    ${theme.colors.primary.yellow}
  );
  padding: ${theme.spacing.xl};
  border-radius: 20px;
  text-align: center;
  color: white;
  margin-bottom: ${theme.spacing.lg};

  h1 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: ${theme.spacing.sm};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.sm};
  }

  p {
    font-size: 1.3rem;
    opacity: 0.9;
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
      ${theme.colors.primary.yellow}
    );
    border-radius: 20px 20px 0 0;
  }
`;

const CompactInfoCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};
  border-left: 4px solid;
  border-image: linear-gradient(180deg,
    ${theme.colors.primary.green},
    ${theme.colors.primary.skyBlue},
    ${theme.colors.primary.yellow}
  ) 1;

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: ${theme.spacing.xs};
    color: ${theme.colors.neutral.gray800};
  }

  p, li {
    font-size: 1rem;
    line-height: 1.5;
    color: ${theme.colors.neutral.gray600};
    margin-bottom: 2px;
  }

  ul {
    margin: 0;
    padding-left: ${theme.spacing.sm};
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
`;

const CompactForm = styled.form`
  display: grid;
  gap: ${theme.spacing.lg};
`;

const CompactFormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CompactFormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompactLabel = styled.label`
  font-weight: 600;
  color: ${theme.colors.neutral.gray700};
  margin-bottom: ${theme.spacing.xs};
  font-size: 0.9rem;
`;

const CompactInput = styled.input`
  padding: ${theme.spacing.md};
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 8px;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.2s ease;

  &:focus {
    border-color: ${theme.colors.primary.green};
    box-shadow: 0 0 0 2px ${theme.colors.primary.green}15;
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.neutral.gray400};
    font-size: 0.85rem;
  }
`;

const CompactSelect = styled.select`
  padding: ${theme.spacing.md};
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 8px;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${theme.colors.primary.skyBlue};
    box-shadow: 0 0 0 2px ${theme.colors.primary.skyBlue}15;
    outline: none;
  }
`;

const CompactSubmitButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: linear-gradient(135deg,
    ${theme.colors.primary.green},
    ${theme.colors.primary.skyBlue},
    ${theme.colors.primary.yellow}
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
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

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setIsSubmitting(false);
      alert('Your numerology consultation request has been sent! Our expert will contact you soon with personalized recommendations.');
    }, 1000);
  };

  return (
    <NumerologyContainer>
      <CompactHeader>
        <h1>
          <MagicIcon />
          Numerology Consultation
        </h1>
        <p>मोबाइल न्यूमरोलॉजी - अब आपका नंबर बोलेगा आपकी किस्मत! ✨📱</p>
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
                    placeholder="HH:MM"
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
                    placeholder="+91 98765 43210"
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
            <h3>क्या आप जानते हैं?</h3>
            <p>
              इस ब्रह्मांड में जो कुछ भी होता है, वह किसी न किसी नंबर से जुड़ा होता है। हर मोबाइल नंबर एक विशेष ऊर्जा को धारण करता है — जो आपके जीवन में सफलता, असफलता, स्वास्थ्य, रिश्ते, व्यवसाय और भाग्य को प्रभावित कर सकता है।
            </p>
          </CompactInfoCard>

          <CompactInfoCard>
            <h3>🔍 मोबाइल न्यूमरोलॉजी क्या है?</h3>
            <p>
              मोबाइल न्यूमरोलॉजी (Mobile Numerology) एक ऐसी अद्भुत विद्या है जिसमें आपके मोबाइल नंबर को आपके जन्मांक और मूलांक के अनुसार विश्लेषण किया जाता है। इससे यह जाना जा सकता है कि आपका नंबर आपके लिए लकी है या ब्लॉकेज पैदा कर रहा है।
            </p>
          </CompactInfoCard>

          <CompactInfoCard>
            <h3>📈 क्यों ज़रूरी है आज के समय में मोबाइल न्यूमरोलॉजी?</h3>
            <ul>
              <li>मोबाइल आज सिर्फ बात करने का साधन नहीं रहा, ये आपकी वाइब, कनेक्शन और ऊर्जा को ट्रांसफर करता है।</li>
              <li>हर दिन आप इसी नंबर से दुनिया से जुड़ते हैं – अगर ये नंबर आपके ग्रहों के साथ मेल नहीं खाता, तो रुकावटें, तनाव और असफलता आ सकती है।</li>
            </ul>
            <h3>🚫 बुरे मोबाइल नंबर क्या होते हैं?</h3>
            <ul>
              <li>जो आपके मूलांक से टकराते हैं</li>
              <li>जिनमें अलग-अलग दिशाओं की ऊर्जा का टकराव हो</li>
            </ul>
          </CompactInfoCard>

          <CompactInfoCard>
            <h3>🌠 भविष्य भी नंबर से जुड़ा होता है</h3>
            <p>
              हर नाम, हर तारीख, हर रिश्ता और हर अवसर – नंबर के माध्यम से ही ब्रह्मांड का खेल चलता है। जब आप सही नंबर के साथ होते हैं, तो पूरी सृष्टि आपके लिए मार्ग खोलने लगती है।
            </p>
          </CompactInfoCard>

          <CompactInfoCard>
            <h3>📞 अब जानिए क्या आपका मोबाइल नंबर आपके लिए शुभ है या नहीं!</h3>
            <p style={{ textAlign: 'center', fontWeight: '600', color: theme.colors.primary.orange }}>
              सिर्फ ₹999/- में पाएँ complete numerological analysis और personalized recommendations!
            </p>
          </CompactInfoCard>
        </RightPanel>
      </MainLayout>
    </NumerologyContainer>
  );
};

export default Numerology;