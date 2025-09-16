import React from 'react';
import styled from 'styled-components';
import InstagramAdmin from '../components/InstagramAdmin';

const AdminContainer = styled.div`
  margin-top: 70px;
  min-height: calc(100vh - 70px);
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 40px 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  padding: 60px 0 40px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  margin: -40px -20px 60px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-top: 30px solid #4f46e5;
  }
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  margin: 0 0 16px;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  color: white;
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 20px;
  }
`;

const AdminContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const AdminSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const SectionTitle = styled.h2`
  color: #1f2937;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QuickActions = styled.div`
  display: grid;
  gap: 16px;
`;

const ActionButton = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  text-decoration: none;
  color: #374151;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    border-color: #6366f1;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
    color: #6366f1;
  }
`;

const StatusCard = styled.div`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 20px;
`;

const StatusTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const StatusValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 4px;
`;

const StatusLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const AdminPage: React.FC = () => {
  return (
    <AdminContainer>
      <PageHeader>
        <PageTitle>🛠️ Admin Panel</PageTitle>
        <PageSubtitle>
          Manage your website content, Instagram integration, and site settings
        </PageSubtitle>
      </PageHeader>

      <AdminContent>
        <SectionGrid>
          <AdminSection>
            <SectionTitle>📸 Instagram Integration</SectionTitle>
            <InstagramAdmin />
          </AdminSection>

          <AdminSection>
            <SectionTitle>📊 Quick Stats</SectionTitle>
            <StatusCard>
              <StatusTitle>Gallery Status</StatusTitle>
              <StatusValue>✅</StatusValue>
              <StatusLabel>Active & Working</StatusLabel>
            </StatusCard>

            <SectionTitle>⚡ Quick Actions</SectionTitle>
            <QuickActions>
              <ActionButton href="/gallery">
                📸 View Gallery Page
              </ActionButton>
              <ActionButton href="/">
                🏠 View Homepage
              </ActionButton>
              <ActionButton href="/how-it-works">
                ❓ How It Works
              </ActionButton>
              <ActionButton href="/vvip-collection">
                👑 VVIP Collection
              </ActionButton>
            </QuickActions>
          </AdminSection>
        </SectionGrid>
      </AdminContent>
    </AdminContainer>
  );
};

export default AdminPage;