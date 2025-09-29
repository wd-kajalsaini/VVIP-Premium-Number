import React, { useState } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import { theme } from '../styles/theme'
import CategoriesManager from '../components/admin/CategoriesManager'
import AdminCarousel from './AdminCarousel'
import AdminPhoneNumbers from './AdminPhoneNumbers'
import AdminVehicleNumbers from './AdminVehicleNumbers'
import AdminCurrencyNumbers from './AdminCurrencyNumbers'
import AdminNumerology from './AdminNumerology'
import {
  FaBars,
  FaTimes,
  FaUser,
  FaPhoneAlt,
  FaCrown,
  FaChevronDown,
  FaImage,
  FaCar,
  FaCoins,
  FaStar
} from '../utils/iconComponents'

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${theme.colors.neutral.gray100};
`

const Sidebar = styled.aside<{ $isOpen: boolean }>`
  width: 280px;
  background: linear-gradient(180deg,
    ${theme.colors.neutral.white},
    ${theme.colors.neutral.gray50}
  );
  box-shadow: ${theme.shadows.lg};
  position: fixed;
  height: 100vh;
  z-index: 100;
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  overflow-y: auto;

  @media (max-width: 767px) {
    width: 100%;
    max-width: 320px;
  }

  @media (min-width: 768px) {
    position: static;
    transform: translateX(0);
  }
`

const SidebarHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 2px solid ${theme.colors.neutral.gray200};
  background: linear-gradient(135deg,
    ${theme.colors.primary.orange}10,
    ${theme.colors.primary.skyBlue}10
  );

  @media (max-width: 768px) {
    padding: ${theme.spacing.lg};
  }
`

const SidebarTitle = styled.h1`
  background: linear-gradient(135deg,
    ${theme.colors.primary.orange},
    ${theme.colors.primary.skyBlue}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: ${theme.typography.fontSize.xl};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${theme.typography.fontSize.lg};
  }
`

const SidebarSubtitle = styled.p`
  color: ${theme.colors.neutral.gray600};
  font-size: ${theme.typography.fontSize.sm};
  margin: ${theme.spacing.xs} 0 0;
`

const SidebarNav = styled.nav`
  padding: ${theme.spacing.lg} 0;
`

const NavItem = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  color: ${props => props.$isActive
    ? theme.colors.primary.orange
    : theme.colors.neutral.gray700};
  background: ${props => props.$isActive
    ? `${theme.colors.primary.orange}10`
    : 'transparent'};
  text-decoration: none;
  font-weight: ${props => props.$isActive
    ? theme.typography.fontWeight.semibold
    : theme.typography.fontWeight.medium};
  border-right: ${props => props.$isActive
    ? `3px solid ${theme.colors.primary.orange}`
    : '3px solid transparent'};
  transition: all 0.2s ease;
  min-height: 48px; /* Touch-friendly height */

  @media (max-width: 768px) {
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
    font-size: ${theme.typography.fontSize.md};
    min-height: 56px; /* Larger touch target on mobile */
  }

  &:hover {
    background: ${theme.colors.primary.orange}10;
    color: ${theme.colors.primary.orange};
  }
`

const NavIcon = styled.div`
  font-size: ${theme.typography.fontSize.lg};
  width: 20px;
  text-align: center;
`

const SidebarFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-top: 2px solid ${theme.colors.neutral.gray200};
  background: ${theme.colors.neutral.white};
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.sm};
  background: ${theme.colors.neutral.gray50};
  border-radius: ${theme.borderRadius.lg};
`

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg,
    ${theme.colors.primary.orange},
    ${theme.colors.primary.skyBlue}
  );
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral.white};
  font-weight: ${theme.typography.fontWeight.bold};
`

const UserDetails = styled.div`
  flex: 1;
`

const UserName = styled.div`
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.neutral.gray800};
  font-size: ${theme.typography.fontSize.sm};
`

const UserRole = styled.div`
  color: ${theme.colors.neutral.gray600};
  font-size: ${theme.typography.fontSize.xs};
`

const LogoutButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.neutral.gray200};
  color: ${theme.colors.neutral.gray700};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.neutral.gray300};
  }
`

const MainContent = styled.main<{ $sidebarOpen: boolean }>`
  flex: 1;
  margin-left: ${props => props.$sidebarOpen ? '0' : '0'};
  
  @media (min-width: 768px) {
    margin-left: 0;
  }
`

const TopBar = styled.header`
  background: ${theme.colors.neutral.white};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;

  @media (max-width: 768px) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`

const MenuButton = styled.button`
  display: flex;
  background: none;
  border: none;
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.neutral.gray600};
  cursor: pointer;
  padding: ${theme.spacing.sm};

  @media (min-width: 768px) {
    display: none;
  }
`

const PageTitle = styled.h2`
  color: ${theme.colors.neutral.gray800};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${theme.typography.fontSize.lg};
  }

  @media (max-width: 480px) {
    font-size: ${theme.typography.fontSize.md};
    display: none; /* Hide on very small screens to save space */
  }
`

const ContentArea = styled.div`
  padding: ${theme.spacing.lg};

  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
  }

  @media (max-width: 480px) {
    padding: ${theme.spacing.sm};
  }
`

const Overlay = styled.div<{ $show: boolean }>`
  display: ${props => props.$show ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;

  @media (min-width: 768px) {
    display: none;
  }
`

const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getPageTitle = () => {
    const path = location.pathname
    if (path.includes('/categories')) return 'Categories Management'
    if (path.includes('/phone-numbers')) return 'Phone Numbers Management'
    if (path.includes('/vehicle-numbers')) return 'Vehicle Numbers Management'
    if (path.includes('/currency-numbers')) return 'Currency Numbers Management'
    if (path.includes('/numerology')) return 'Numerology Management'
    if (path.includes('/carousel')) return 'Carousel Management'
    return 'Dashboard Overview'
  }

  const handleLogout = async () => {
    await signOut()
  }

  const navItems = [
    {
      path: '/admin/carousel',
      label: 'Carousel',
      icon: <FaImage />
    },
    {
      path: '/admin/categories',
      label: 'Categories',
      icon: <FaCrown />
    },
    {
      path: '/admin/phone-numbers',
      label: 'Phone Numbers',
      icon: <FaPhoneAlt />
    },
    {
      path: '/admin/vehicle-numbers',
      label: 'Vehicle Numbers',
      icon: <FaCar />
    },
    {
      path: '/admin/currency-numbers',
      label: 'Currency Numbers',
      icon: <FaCoins />
    },
    {
      path: '/admin/numerology',
      label: 'Numerology Special',
      icon: <FaStar />
    }
  ]

  return (
    <DashboardContainer>
      <Overlay $show={sidebarOpen} onClick={() => setSidebarOpen(false)} />
      
      <Sidebar $isOpen={sidebarOpen}>
        <SidebarHeader>
          <SidebarTitle>Admin Portal</SidebarTitle>
          <SidebarSubtitle>Premium Numbers</SidebarSubtitle>
        </SidebarHeader>

        <SidebarNav>
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              to={item.path}
              $isActive={location.pathname === item.path}
              onClick={() => setSidebarOpen(false)}
            >
              <NavIcon>{item.icon}</NavIcon>
              {item.label}
            </NavItem>
          ))}
        </SidebarNav>

        <SidebarFooter>
          <UserInfo>
            <UserAvatar>
              <FaUser />
            </UserAvatar>
            <UserDetails>
              <UserName>{user?.email?.split('@')[0] || 'Admin'}</UserName>
              <UserRole>Administrator</UserRole>
            </UserDetails>
          </UserInfo>
          <LogoutButton onClick={handleLogout}>
            Sign Out
          </LogoutButton>
        </SidebarFooter>
      </Sidebar>

      <MainContent $sidebarOpen={sidebarOpen}>
        <TopBar>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <MenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </MenuButton>
            <PageTitle>{getPageTitle()}</PageTitle>
          </div>
        </TopBar>

        <ContentArea>
          <Routes>
            <Route path="/" element={<Navigate to="/admin/carousel" replace />} />
            <Route path="/carousel" element={<AdminCarousel />} />
            <Route path="/categories" element={<CategoriesManager />} />
            <Route path="/phone-numbers" element={<AdminPhoneNumbers />} />
            <Route path="/vehicle-numbers" element={<AdminVehicleNumbers />} />
            <Route path="/currency-numbers" element={<AdminCurrencyNumbers />} />
            <Route path="/numerology" element={<AdminNumerology />} />
          </Routes>
        </ContentArea>
      </MainContent>
    </DashboardContainer>
  )
}

export default AdminDashboard