import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMagic, FaStar, FaCalculator, FaWhatsapp } from '../utils/iconComponents';
import { theme } from '../styles/theme';

const NumerologyContainer = styled.div`
  margin-top: 70px;
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, 
    ${theme.colors.primary.yellow}15, 
    ${theme.colors.primary.orange}15,
    ${theme.colors.primary.skyBlue}10
  );
  padding: ${theme.spacing.xl} 0;
  text-align: center;
`;

const HeroTitle = styled.h1`
  background: linear-gradient(135deg, 
    ${theme.colors.primary.orange}, 
    ${theme.colors.primary.yellow},
    ${theme.colors.primary.skyBlue}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${theme.spacing.xs};
  }
`;

const MagicIcon = styled(FaMagic)`
  color: ${theme.colors.primary.orange};
  filter: drop-shadow(0 2px 4px rgba(249, 115, 22, 0.3));
`;

const FormSection = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: ${theme.colors.neutral.white};
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const FormCard = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.xl};
  padding: ${theme.spacing['2xl']};
  border: 2px solid ${theme.colors.neutral.gray200};
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
      ${theme.colors.primary.orange}, 
      ${theme.colors.primary.yellow}, 
      ${theme.colors.primary.skyBlue}
    );
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.orange}, 
    ${theme.colors.primary.yellow}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
`;

const Form = styled.form`
  display: grid;
  gap: ${theme.spacing.lg};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.md};

  @media (max-width: 768px) {
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

const Input = styled.input`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.neutral.gray300};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.md};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${theme.colors.primary.orange};
    box-shadow: 0 0 0 3px ${theme.colors.primary.orange}20;
  }

  &::placeholder {
    color: ${theme.colors.neutral.gray400};
  }
`;

const Select = styled.select`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.neutral.gray300};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.md};
  background: ${theme.colors.neutral.white};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${theme.colors.primary.orange};
    box-shadow: 0 0 0 3px ${theme.colors.primary.orange}20;
  }
`;

const TextArea = styled.textarea`
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.neutral.gray300};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.md};
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${theme.colors.primary.orange};
    box-shadow: 0 0 0 3px ${theme.colors.primary.orange}20;
  }

  &::placeholder {
    color: ${theme.colors.neutral.gray400};
  }
`;

const SubmitButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.orange}, 
    ${theme.colors.primary.yellow}
  );
  color: ${theme.colors.neutral.white};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  margin: ${theme.spacing.lg} auto 0;
  min-width: 200px;

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

const ContentSection = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: linear-gradient(135deg, 
    ${theme.colors.primary.yellow}05, 
    ${theme.colors.primary.orange}05
  );
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const ContentCard = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.lg};
  padding: ${theme.spacing['2xl']};
  border-left: 5px solid ${theme.colors.primary.orange};
  margin-bottom: ${theme.spacing.xl};
`;

const ContentTitle = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.neutral.gray800};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
`;

const ContentSubtitle = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.primary.orange};
  margin: ${theme.spacing.lg} 0 ${theme.spacing.md};
  border-bottom: 2px solid ${theme.colors.primary.orange}30;
  padding-bottom: ${theme.spacing.xs};
`;

const ContentText = styled.p`
  font-size: ${theme.typography.fontSize.md};
  line-height: 1.8;
  color: ${theme.colors.neutral.gray700};
  margin-bottom: ${theme.spacing.md};
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${theme.spacing.md} 0;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  background: ${theme.colors.primary.yellow}10;
  border-radius: ${theme.borderRadius.md};
  border-left: 3px solid ${theme.colors.primary.yellow};
`;

const BenefitNumber = styled.span`
  background: ${theme.colors.primary.orange};
  color: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.full};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
  flex-shrink: 0;
  margin-top: 2px;
`;

const BenefitText = styled.span`
  color: ${theme.colors.neutral.gray700};
  font-size: ${theme.typography.fontSize.md};
`;

const HighlightBox = styled.div`
  background: linear-gradient(135deg, 
    ${theme.colors.primary.orange}15, 
    ${theme.colors.primary.yellow}15
  );
  border: 2px solid ${theme.colors.primary.orange}30;
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  margin: ${theme.spacing.lg} 0;
  text-align: center;
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
      ${theme.colors.primary.orange}, 
      ${theme.colors.primary.yellow}
    );
  }
`;

const PriceText = styled.div`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.orange}, 
    ${theme.colors.primary.yellow}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: ${theme.spacing.md} 0;
`;

const InfoSection = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  background: linear-gradient(135deg, 
    ${theme.colors.neutral.gray100}, 
    ${theme.colors.neutral.white}
  );
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const InfoCard = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  text-align: center;
  transition: all 0.3s ease;
  border-top: 4px solid ${theme.colors.primary.yellow};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const InfoIcon = styled.div<{ $color: string }>`
  width: 70px;
  height: 70px;
  margin: 0 auto ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$color}20;
  border-radius: ${theme.borderRadius.full};
  color: ${props => props.$color};
  font-size: 1.8rem;
`;

const InfoTitle = styled.h3`
  color: ${theme.colors.neutral.gray800};
  margin-bottom: ${theme.spacing.sm};
`;

const InfoDescription = styled.p`
  color: ${theme.colors.neutral.gray600};
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${theme.colors.primary.orange}, 
    ${theme.colors.primary.yellow}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Numerology: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    birthTime: '',
    birthPlace: '',
    phoneNumber: '',
    profession: '',
    goals: '',
    preferences: '',
    comments: ''
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

💼 *Professional Info:*
• Profession: ${formData.profession}

🎯 *Goals & Preferences:*
• Life Goals: ${formData.goals}
• Number Preferences: ${formData.preferences || 'No specific preferences'}

💬 *Additional Comments:*
${formData.comments || 'None'}

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

  const numerologyInfo = [
    {
      icon: <FaCalculator />,
      title: "Birth Number Analysis",
      description: "We calculate your life path number, destiny number, and soul urge number based on your birth date and name to find the most compatible mobile number.",
      color: theme.colors.primary.orange
    },
    {
      icon: <FaStar />,
      title: "Lucky Number Patterns",
      description: "Discover number patterns and combinations that resonate with your personal vibration and can attract success, prosperity, and positive energy.",
      color: theme.colors.primary.yellow
    },
    {
      icon: <FaStar />,
      title: "Personalized Recommendations",
      description: "Get customized premium number recommendations that align with your personality, profession, and life goals for maximum benefit and harmony.",
      color: theme.colors.primary.skyBlue
    }
  ];

  return (
    <NumerologyContainer>
      <HeroSection>
        <div className="container">
          <HeroTitle>
            <MagicIcon />
            Numerology Consultation
            <MagicIcon />
          </HeroTitle>
          <p style={{ 
            color: theme.colors.neutral.gray600, 
            fontSize: theme.typography.fontSize.lg,
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            मोबाइल न्यूमरोलॉजी - अब आपका नंबर बोलेगा आपकी किस्मत! ✨📱
          </p>
        </div>
      </HeroSection>

      <ContentSection>
        <ContentContainer>
          <ContentCard>
            <ContentText style={{ textAlign: 'center', fontSize: theme.typography.fontSize.lg, color: theme.colors.neutral.gray600 }}>
              क्या आप जानते हैं?<br />
              इस ब्रह्मांड में जो कुछ भी होता है, वह किसी न किसी नंबर से जुड़ा होता है। हर मोबाइल नंबर एक विशेष ऊर्जा को धारण करता है — जो आपके जीवन में सफलता, असफलता, स्वास्थ्य, रिश्ते, व्यवसाय और भाग्य को प्रभावित कर सकता है।
            </ContentText>
          </ContentCard>

          <ContentCard>
            <ContentSubtitle>🔍 मोबाइल न्यूमरोलॉजी क्या है?</ContentSubtitle>
            <ContentText>
              मोबाइल न्यूमरोलॉजी (Mobile Numerology) एक ऐसी अद्भुत विद्या है जिसमें आपके मोबाइल नंबर को आपके जन्मांक और मूलांक के अनुसार विश्लेषण किया जाता है। इससे यह जाना जा सकता है कि आपका नंबर आपके लिए लकी है या ब्लॉकेज पैदा कर रहा है।
            </ContentText>
          </ContentCard>

          <ContentCard>
            <ContentSubtitle>📈 क्यों ज़रूरी है आज के समय में मोबाइल न्यूमरोलॉजी?</ContentSubtitle>
            <BenefitsList>
              <BenefitItem>
                <BenefitText>
                  मोबाइल आज सिर्फ बात करने का साधन नहीं रहा, ये आपकी वाइब, कनेक्शन और ऊर्जा को ट्रांसफर करता है।
                </BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitText>
                  हर दिन आप इसी नंबर से दुनिया से जुड़ते हैं – अगर ये नंबर आपके ग्रहों के साथ मेल नहीं खाता, तो रुकावटें, तनाव और असफलता आ सकती है।
                </BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitText>
                  एक सही नंबर आपको बना सकता है attractive, successful & powerful communicator.
                </BenefitText>
              </BenefitItem>
            </BenefitsList>
          </ContentCard>

          <ContentCard>
            <ContentSubtitle>✅ मोबाइल न्यूमरोलॉजी के फायदे:</ContentSubtitle>
            <BenefitsList>
              <BenefitItem>
                <BenefitNumber>1</BenefitNumber>
                <BenefitText>आपकी financial growth में तेजी</BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitNumber>2</BenefitNumber>
                <BenefitText>व्यापार में positive response</BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitNumber>3</BenefitNumber>
                <BenefitText>मानसिक तनाव को कम करता है</BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitNumber>4</BenefitNumber>
                <BenefitText>रिश्तों में संतुलन लाता है</BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitNumber>5</BenefitNumber>
                <BenefitText>भाग्य को activate करता है</BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitNumber>6</BenefitNumber>
                <BenefitText>छुपे हुए talents को उजागर करता है</BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitNumber>7</BenefitNumber>
                <BenefitText>नए opportunities के लिए मार्ग खोलता है</BenefitText>
              </BenefitItem>
            </BenefitsList>
          </ContentCard>

          <ContentCard>
            <ContentSubtitle>🚫 बुरे मोबाइल नंबर क्या होते हैं?</ContentSubtitle>
            <BenefitsList>
              <BenefitItem>
                <BenefitText>जो आपके मूलांक से टकराते हैं</BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitText>जिनका कुल योग 13, 14, 16, 19 जैसे कर्मिक नंबरों में आता है</BenefitText>
              </BenefitItem>
              <BenefitItem>
                <BenefitText>जिनमें अलग-अलग दिशाओं की ऊर्जा का टकराव हो</BenefitText>
              </BenefitItem>
            </BenefitsList>
          </ContentCard>

          <ContentCard>
            <ContentText style={{ textAlign: 'center', fontStyle: 'italic', color: theme.colors.primary.orange }}>
              हर नाम, हर तारीख, हर रिश्ता और हर अवसर – नंबर के माध्यम से ही ब्रह्मांड का खेल चलता है। जब आप सही नंबर के साथ होते हैं, तो पूरी सृष्टि आपके लिए मार्ग खोलने लगती है।
            </ContentText>
          </ContentCard>

          <HighlightBox>
            <ContentTitle style={{ marginBottom: theme.spacing.md }}>
              📞 अब जानिए क्या आपका मोबाइल नंबर आपके लिए शुभ है या नहीं!
            </ContentTitle>
            <PriceText>👉 सिर्फ ₹999/- में पाएँ:</PriceText>
            <BenefitsList>
              <BenefitItem style={{ background: 'transparent', borderLeft: 'none', justifyContent: 'center' }}>
                <BenefitText>• मोबाइल नंबर का पूर्ण न्यूमरोलॉजिकल विश्लेषण</BenefitText>
              </BenefitItem>
              <BenefitItem style={{ background: 'transparent', borderLeft: 'none', justifyContent: 'center' }}>
                <BenefitText>• कौन सा नंबर आपके लिए शुभ रहेगा</BenefitText>
              </BenefitItem>
              <BenefitItem style={{ background: 'transparent', borderLeft: 'none', justifyContent: 'center' }}>
                <BenefitText>• ब्लॉकेज दूर करने के उपाय</BenefitText>
              </BenefitItem>
              <BenefitItem style={{ background: 'transparent', borderLeft: 'none', justifyContent: 'center' }}>
                <BenefitText>• सही नंबर लेने की सटीक गाइडेंस</BenefitText>
              </BenefitItem>
            </BenefitsList>
            <ContentText style={{ 
              textAlign: 'center', 
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.primary.orange,
              marginTop: theme.spacing.md 
            }}>
              🧠 Limited Slots | 1-on-1 Consultation | 100% Personalized
            </ContentText>
          </HighlightBox>

          <ContentCard>
            <ContentText style={{ 
              textAlign: 'center', 
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.primary.orange 
            }}>
              आपका नंबर सिर्फ डिजिट नहीं, आपकी दिशा है।<br />
              🌠 सही नंबर आपको बनाता है magnet for success!
            </ContentText>
          </ContentCard>
        </ContentContainer>
      </ContentSection>

      <FormSection>
        <FormContainer>
          <FormCard>
            <FormTitle>
              <FaCalculator />
              Get Your Numerology Analysis
            </FormTitle>
            
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your complete name"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="birthTime">Birth Time (Optional)</Label>
                  <Input
                    type="time"
                    id="birthTime"
                    name="birthTime"
                    value={formData.birthTime}
                    onChange={handleChange}
                    placeholder="HH:MM"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="birthPlace">Birth Place *</Label>
                  <Input
                    type="text"
                    id="birthPlace"
                    name="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleChange}
                    placeholder="City, State, Country"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="phoneNumber">Current Phone Number *</Label>
                  <Input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="profession">Profession/Business *</Label>
                  <Select
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    required
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
                  </Select>
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label htmlFor="goals">Life Goals & Aspirations *</Label>
                <TextArea
                  id="goals"
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  placeholder="What are your main life goals? (e.g., business success, wealth, health, relationships, spiritual growth)"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="preferences">Number Preferences (Optional)</Label>
                <TextArea
                  id="preferences"
                  name="preferences"
                  value={formData.preferences}
                  onChange={handleChange}
                  placeholder="Any specific numbers you prefer or want to avoid? (e.g., lucky numbers, favorite digits, cultural preferences)"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="comments">Additional Comments (Optional)</Label>
                <TextArea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Any other information you'd like our numerologist to know?"
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting}>
                <FaWhatsapp />
                {isSubmitting ? 'Sending...' : 'Get My Numerology Analysis'}
              </SubmitButton>
            </Form>
          </FormCard>
        </FormContainer>
      </FormSection>

      <InfoSection>
        <div className="container">
          <SectionTitle>How Our Numerology Works</SectionTitle>
          <InfoGrid>
            {numerologyInfo.map((info, index) => (
              <InfoCard key={index}>
                <InfoIcon $color={info.color}>
                  {info.icon}
                </InfoIcon>
                <InfoTitle>{info.title}</InfoTitle>
                <InfoDescription>{info.description}</InfoDescription>
              </InfoCard>
            ))}
          </InfoGrid>

          <div style={{ 
            textAlign: 'center', 
            marginTop: theme.spacing['2xl'],
            padding: theme.spacing.xl,
            background: `linear-gradient(135deg, ${theme.colors.primary.orange}10, ${theme.colors.primary.yellow}10)`,
            borderRadius: theme.borderRadius.xl,
            maxWidth: '800px',
            margin: `${theme.spacing['2xl']} auto 0`
          }}>
            <h3 style={{ 
              color: theme.colors.neutral.gray800,
              marginBottom: theme.spacing.md,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: theme.spacing.sm
            }}>
              <FaMagic style={{ color: theme.colors.primary.orange }} />
              What You'll Receive
              <FaMagic style={{ color: theme.colors.primary.orange }} />
            </h3>
            <p style={{ 
              color: theme.colors.neutral.gray600,
              lineHeight: '1.7',
              fontSize: theme.typography.fontSize.md
            }}>
              After submitting your details, our expert numerologist will analyze your information 
              and contact you via WhatsApp with a detailed report including your life path number, 
              destiny number, compatible number patterns, and personalized premium number recommendations 
              that align with your goals and aspirations. The consultation is <strong>completely free</strong>!
            </p>
          </div>
        </div>
      </InfoSection>
    </NumerologyContainer>
  );
};

export default Numerology;