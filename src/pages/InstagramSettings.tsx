import React from 'react';
import styled from 'styled-components';
import InstagramAdmin from '../components/InstagramAdmin';

const InstagramSettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const SettingsCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const InstagramSettings: React.FC = () => {
  return (
    <InstagramSettingsContainer>
      <SettingsCard>
        <InstagramAdmin />
      </SettingsCard>
    </InstagramSettingsContainer>
  );
};

export default InstagramSettings;