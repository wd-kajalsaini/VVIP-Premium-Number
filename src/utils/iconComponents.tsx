import React from 'react';
import * as FaIcons from 'react-icons/fa';

// Type assertion helper for Font Awesome icons
const createIcon = (IconComponent: any) => (props: any) => {
  return React.createElement(IconComponent, props);
};

// Export properly typed icon components
export const FaSearch = createIcon(FaIcons.FaSearch);
export const FaFilter = createIcon(FaIcons.FaFilter);
export const FaWhatsapp = createIcon(FaIcons.FaWhatsapp);
export const FaStar = createIcon(FaIcons.FaStar);
export const FaShieldAlt = createIcon(FaIcons.FaShieldAlt);
export const FaRocket = createIcon(FaIcons.FaRocket);
export const FaPhoneAlt = createIcon(FaIcons.FaPhoneAlt);
export const FaCrown = createIcon(FaIcons.FaCrown);
export const FaMagic = createIcon(FaIcons.FaMagic);
export const FaCalculator = createIcon(FaIcons.FaCalculator);
export const FaGem = createIcon(FaIcons.FaGem);
export const FaBars = createIcon(FaIcons.FaBars);
export const FaTimes = createIcon(FaIcons.FaTimes);
export const FaPhone = createIcon(FaIcons.FaPhone);
export const FaEnvelope = createIcon(FaIcons.FaEnvelope);
export const FaMapMarkerAlt = createIcon(FaIcons.FaMapMarkerAlt);
export const FaClock = createIcon(FaIcons.FaClock);
export const FaStore = createIcon(FaIcons.FaStore);
export const FaHandshake = createIcon(FaIcons.FaHandshake);
export const FaCheckCircle = createIcon(FaIcons.FaCheckCircle);
export const FaUserCheck = createIcon(FaIcons.FaUserCheck);
export const FaCreditCard = createIcon(FaIcons.FaCreditCard);
export const FaUser = createIcon(FaIcons.FaUser);
export const FaLock = createIcon(FaIcons.FaLock);
export const FaEye = createIcon(FaIcons.FaEye);
export const FaEyeSlash = createIcon(FaIcons.FaEyeSlash);
export const FaGoogle = createIcon(FaIcons.FaGoogle);
export const FaFacebook = createIcon(FaIcons.FaFacebook);
export const FaChevronDown = createIcon(FaIcons.FaChevronDown);
export const FaChevronUp = createIcon(FaIcons.FaChevronUp);
export const FaPlay = createIcon(FaIcons.FaPlay);
export const FaGlobe = createIcon(FaIcons.FaGlobe);
export const FaUndo = createIcon(FaIcons.FaUndo);
export const FaPlus = createIcon(FaIcons.FaPlus);
export const FaEdit = createIcon(FaIcons.FaEdit);
export const FaTrash = createIcon(FaIcons.FaTrash);
export const FaSave = createIcon(FaIcons.FaSave);
