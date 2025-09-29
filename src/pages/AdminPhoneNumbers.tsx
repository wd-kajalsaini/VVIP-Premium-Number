import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaStar, FaTag, FaTimes } from '../utils/iconComponents';
import { phoneNumberService, PhoneNumber, PhoneNumberInput } from '../services/phoneNumberService';
import { categoryService, Category } from '../services/categoryService';

const AdminContainer = styled.div`
  padding: 30px;
  background: #f5f6fa;
  min-height: calc(100vh - 70px);
  margin-top: 70px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  font-weight: 700;
`;

const ActionBar = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px 15px;
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
    min-width: 250px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    min-width: 200px;
    padding: 6px 12px;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 0.95rem;
  padding: 5px;

  &::placeholder {
    color: #999;
  }
`;

const Button = styled.button<{ $primary?: boolean; $danger?: boolean; $success?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;

  ${props => props.$primary && `
    background: #3498db;
    color: white;

    &:hover {
      background: #2980b9;
    }
  `}

  ${props => props.$danger && `
    background: #e74c3c;
    color: white;

    &:hover {
      background: #c0392b;
    }
  `}

  ${props => props.$success && `
    background: #27ae60;
    color: white;

    &:hover {
      background: #229954;
    }
  `}

  ${props => !props.$primary && !props.$danger && !props.$success && `
    background: white;
    color: #333;
    border: 1px solid #ddd;

    &:hover {
      background: #f8f9fa;
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const FilterChips = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const Chip = styled.div<{ $active?: boolean }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  min-height: 36px; /* Touch-friendly height */

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9rem;
    min-height: 44px; /* Larger touch target on mobile */
  }

  ${props => props.$active ? `
    background: #3498db;
    color: white;
    border: 1px solid #3498db;
  ` : `
    background: white;
    color: #666;
    border: 1px solid #ddd;

    &:hover {
      border-color: #3498db;
      color: #3498db;
    }
  `}
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);

  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

const Table = styled.table`
  width: 100%;
  min-width: 800px; /* Ensure table doesn't get too cramped */
  border-collapse: collapse;

  @media (max-width: 768px) {
    min-width: 1000px; /* Wider on mobile to ensure readability */
  }
`;

const Thead = styled.thead`
  background: #f8f9fa;
`;

const Th = styled.th`
  padding: 15px;
  text-align: left;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
  border-bottom: 2px solid #e0e0e0;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s ease;

  &:hover {
    background: #f8f9fa;
  }
`;

const Td = styled.td`
  padding: 12px 15px;
  font-size: 0.9rem;
  color: #444;
`;

const PhoneNumberDisplay = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  letter-spacing: 1px;
`;

const PriceTag = styled.div`
  font-weight: 600;
  color: #27ae60;
  font-size: 0.95rem;
`;

const Badge = styled.span<{ $type?: 'vvip' | 'offer' | 'featured' | 'attractive' | 'sold' }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-right: 5px;
  display: inline-block;

  ${props => props.$type === 'vvip' && `
    background: linear-gradient(135deg, #f39c12, #e67e22);
    color: white;
  `}

  ${props => props.$type === 'offer' && `
    background: #e74c3c;
    color: white;
  `}

  ${props => props.$type === 'featured' && `
    background: #3498db;
    color: white;
  `}

  ${props => props.$type === 'attractive' && `
    background: #e91e63;
    color: white;
  `}

  ${props => props.$type === 'sold' && `
    background: #95a5a6;
    color: white;
  `}
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.85rem;

  ${props => props.$danger ? `
    background: #fee;
    color: #e74c3c;

    &:hover {
      background: #e74c3c;
      color: white;
    }
  ` : `
    background: #e8f4fd;
    color: #3498db;

    &:hover {
      background: #3498db;
      color: white;
    }
  `}
`;

const Modal = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 95%;
    padding: 20px;
    border-radius: 8px;
    max-height: 95vh;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    border-radius: 0;
    padding: 16px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f0f0;
    color: #666;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  grid-column: ${props => props.$fullWidth ? 'span 2' : 'span 1'};

  @media (max-width: 600px) {
    grid-column: span 1;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #444;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
  }

  &::placeholder {
    color: #999;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border-color 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;


const CheckboxGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #444;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const ImageUploadArea = styled.div`
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #3498db;
    background: #f8f9fa;
  }
`;

const ImagePreview = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 15px;
`;

const PreviewImage = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(0,0,0,0.7);
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: rgba(231,76,60,0.9);
    }
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 12px;
  }

  @media (max-width: 480px) {
    position: sticky;
    bottom: 0;
    background: white;
    margin: 20px -16px -16px;
    padding: 16px;
    border-top: 2px solid #f0f0f0;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`;

const StatusToggle = styled.div`
  display: flex;
  gap: 5px;
`;

const ToggleButton = styled.button<{ $active?: boolean }>`
  padding: 4px 8px;
  border: 1px solid #ddd;
  background: ${props => props.$active ? '#27ae60' : '#fff'};
  color: ${props => props.$active ? '#fff' : '#666'};
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:first-child {
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
  }

  &:hover {
    background: ${props => props.$active ? '#229954' : '#f0f0f0'};
  }
`;

const BulkActions = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px;
  background: #fff3cd;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 20px;
`;

const BulkText = styled.span`
  color: #856404;
  font-weight: 500;
  margin-right: auto;
`;

const AdminPhoneNumbers: React.FC = () => {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'vvip' | 'offer' | 'featured' | 'attractive'>('all');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNumber, setEditingNumber] = useState<PhoneNumber | null>(null);
  const [formData, setFormData] = useState<PhoneNumberInput>({
    number: '',
    display_number: '',
    price: 0,
    original_price: 0,
    category_id: 0,
    is_vvip: false,
    is_today_offer: false,
    is_featured: false,
    is_attractive: false,
    is_sold: false,
    is_active: true,
    tags: [],
    primary_image: '',
    gallery_images: []
  });

  useEffect(() => {
    fetchPhoneNumbers();
    fetchCategories();
  }, []);

  const fetchPhoneNumbers = async () => {
    setLoading(true);
    try {
      const data = await phoneNumberService.getAllPhoneNumbers();
      setPhoneNumbers(data || []);
    } catch (error) {
      console.error('Error fetching phone numbers:', error);
      setPhoneNumbers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const handleOpenModal = (number?: PhoneNumber) => {
    if (number) {
      setEditingNumber(number);
      setFormData({
        number: number.number,
        display_number: number.display_number || '',
        price: number.price,
        original_price: number.original_price || 0,
        category_id: number.category_id || 0,
        is_vvip: number.is_vvip,
        is_today_offer: number.is_today_offer,
        is_featured: number.is_featured,
        is_attractive: number.is_attractive,
        is_sold: number.is_sold,
        is_active: number.is_active,
        tags: number.tags || [],
        primary_image: number.primary_image || '',
        gallery_images: number.gallery_images || []
      });
    } else {
      setEditingNumber(null);
      setFormData({
        number: '',
        display_number: '',
        price: 0,
        original_price: 0,
        category_id: 0,
        is_vvip: false,
        is_today_offer: false,
        is_featured: false,
        is_attractive: false,
        is_sold: false,
        is_active: true,
        tags: [],
        primary_image: '',
        gallery_images: []
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNumber(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingNumber) {
      const updated = await phoneNumberService.updatePhoneNumber(editingNumber.id, formData);
      if (updated) {
        fetchPhoneNumbers();
        handleCloseModal();
      }
    } else {
      const created = await phoneNumberService.createPhoneNumber(formData);
      if (created) {
        fetchPhoneNumbers();
        handleCloseModal();
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this phone number?')) {
      const deleted = await phoneNumberService.deletePhoneNumber(id);
      if (deleted) {
        fetchPhoneNumbers();
      }
    }
  };

  const handleBulkVVIP = async () => {
    if (selectedNumbers.length === 0) return;

    const success = await phoneNumberService.updateVVIPStatus(selectedNumbers, true);
    if (success) {
      fetchPhoneNumbers();
      setSelectedNumbers([]);
    }
  };

  const handleBulkTodayOffer = async () => {
    if (selectedNumbers.length === 0) return;

    const success = await phoneNumberService.updateTodayOffers(selectedNumbers, true);
    if (success) {
      fetchPhoneNumbers();
      setSelectedNumbers([]);
    }
  };

  const toggleSelection = (id: number) => {
    setSelectedNumbers(prev =>
      prev.includes(id)
        ? prev.filter(n => n !== id)
        : [...prev, id]
    );
  };

  const filteredNumbers = (phoneNumbers || []).filter(num => {
    if (!num || !num.number) return false;

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' ||
      num.number.toLowerCase().includes(searchLower) ||
      (num.display_number && num.display_number.toLowerCase().includes(searchLower));

    const matchesFilter =
      filter === 'all' ||
      (filter === 'vvip' && num.is_vvip) ||
      (filter === 'offer' && num.is_today_offer) ||
      (filter === 'featured' && num.is_featured) ||
      (filter === 'attractive' && num.is_attractive);

    return matchesSearch && matchesFilter;
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'primary' | 'gallery') => {
    const files = e.target.files;
    if (!files) return;

    const uploadPromises = Array.from(files).map(file =>
      phoneNumberService.uploadImage(file, type)
    );

    const urls = await Promise.all(uploadPromises);
    const validUrls = urls.filter(url => url !== null) as string[];

    if (type === 'primary' && validUrls[0]) {
      setFormData(prev => ({ ...prev, primary_image: validUrls[0] }));
    } else if (type === 'gallery') {
      setFormData(prev => ({
        ...prev,
        gallery_images: [...(prev.gallery_images || []), ...validUrls]
      }));
    }
  };

  return (
    <AdminContainer>
      <Header>
        <Title>Phone Numbers Management</Title>
        <Button $primary onClick={() => handleOpenModal()}>
          <FaPlus /> Add Phone Number
        </Button>
      </Header>

      <ActionBar>
        <SearchContainer>
          <FaSearch color="#999" />
          <SearchInput
            placeholder="Search phone numbers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <Button onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </ActionBar>

      <FilterChips>
        <Chip $active={filter === 'all'} onClick={() => setFilter('all')}>
          All Numbers
        </Chip>
        <Chip $active={filter === 'vvip'} onClick={() => setFilter('vvip')}>
          <FaStar /> VVIP Only
        </Chip>
        <Chip $active={filter === 'offer'} onClick={() => setFilter('offer')}>
          <FaTag /> Today's Offers
        </Chip>
        <Chip $active={filter === 'featured'} onClick={() => setFilter('featured')}>
          Featured
        </Chip>
        <Chip $active={filter === 'attractive'} onClick={() => setFilter('attractive')}>
          ✨ Attractive
        </Chip>
      </FilterChips>

      {selectedNumbers.length > 0 && (
        <BulkActions>
          <BulkText>{selectedNumbers.length} items selected</BulkText>
          <Button $success onClick={handleBulkVVIP}>
            Mark as VVIP
          </Button>
          <Button $danger onClick={handleBulkTodayOffer}>
            Add to Today's Offer
          </Button>
          <Button onClick={() => setSelectedNumbers([])}>
            Clear Selection
          </Button>
        </BulkActions>
      )}

      {loading ? (
        <EmptyState>Loading phone numbers...</EmptyState>
      ) : filteredNumbers.length === 0 ? (
        <EmptyState>
          <p>No phone numbers found</p>
          <Button $primary onClick={() => handleOpenModal()} style={{ marginTop: '20px' }}>
            <FaPlus /> Add First Phone Number
          </Button>
        </EmptyState>
      ) : (
        <TableContainer>
          <Table>
          <Thead>
            <Tr>
              <Th style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedNumbers(filteredNumbers.map(n => n.id));
                    } else {
                      setSelectedNumbers([]);
                    }
                  }}
                  checked={selectedNumbers.length === filteredNumbers.length && filteredNumbers.length > 0}
                />
              </Th>
              <Th>Phone Number</Th>
              <Th>Price</Th>
              <Th>Sum Total</Th>
              <Th>Category</Th>
              <Th>Status</Th>
              <Th>Active</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredNumbers.map(number => (
              <Tr key={number.id}>
                <Td>
                  <input
                    type="checkbox"
                    checked={selectedNumbers.includes(number.id)}
                    onChange={() => toggleSelection(number.id)}
                  />
                </Td>
                <Td>
                  <PhoneNumberDisplay>
                    {number.display_number || number.number}
                  </PhoneNumberDisplay>
                </Td>
                <Td>
                  <PriceTag>₹{(number.price || 0).toLocaleString()}</PriceTag>
                  {number.original_price && number.original_price > (number.price || 0) && (
                    <div style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.85rem' }}>
                      ₹{number.original_price.toLocaleString()}
                    </div>
                  )}
                </Td>
                <Td>
                  {number.sum_total_1 && (
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>
                      {number.sum_total_1}-{number.sum_total_2}-{number.sum_total_3}
                    </div>
                  )}
                </Td>
                <Td>
                  {categories.find(c => c.id === number.category_id)?.name || '-'}
                </Td>
                <Td>
                  {number.is_vvip && <Badge $type="vvip">VVIP</Badge>}
                  {number.is_today_offer && <Badge $type="offer">Today's Offer</Badge>}
                  {number.is_featured && <Badge $type="featured">Featured</Badge>}
                  {number.is_attractive && <Badge $type="attractive">Attractive</Badge>}
                  {number.is_sold && <Badge $type="sold">Sold</Badge>}
                </Td>
                <Td>
                  <StatusToggle>
                    <ToggleButton
                      $active={number.is_active}
                      onClick={() => {
                        phoneNumberService.updatePhoneNumber(number.id, { is_active: !number.is_active });
                        fetchPhoneNumbers();
                      }}
                    >
                      {number.is_active ? 'Active' : 'Inactive'}
                    </ToggleButton>
                  </StatusToggle>
                </Td>
                <Td>
                  <Actions>
                    <ActionButton onClick={() => handleOpenModal(number)}>
                      <FaEdit /> Edit
                    </ActionButton>
                    <ActionButton $danger onClick={() => handleDelete(number.id)}>
                      <FaTrash /> Delete
                    </ActionButton>
                  </Actions>
                </Td>
              </Tr>
            ))}
          </Tbody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Modal */}
      <Modal $isOpen={isModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{editingNumber ? 'Edit Phone Number' : 'Add Phone Number'}</ModalTitle>
            <CloseButton onClick={handleCloseModal}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>

          <form onSubmit={handleSubmit}>
            <FormGrid>
              <FormGroup>
                <Label>Phone Number *</Label>
                <Input
                  type="text"
                  value={formData.number}
                  onChange={(e) => setFormData({...formData, number: e.target.value})}
                  placeholder="9876543210"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Display Number</Label>
                <Input
                  type="text"
                  value={formData.display_number}
                  onChange={(e) => setFormData({...formData, display_number: e.target.value})}
                  placeholder="98 765 432 10"
                />
              </FormGroup>

              <FormGroup>
                <Label>Price (₹) *</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                  placeholder="50000"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Original Price (₹)</Label>
                <Input
                  type="number"
                  value={formData.original_price}
                  onChange={(e) => setFormData({...formData, original_price: parseFloat(e.target.value)})}
                  placeholder="60000"
                />
              </FormGroup>

              <FormGroup>
                <Label>Category</Label>
                <Select
                  value={formData.category_id}
                  onChange={(e) => setFormData({...formData, category_id: parseInt(e.target.value)})}
                >
                  <option value="0">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </Select>
              </FormGroup>


              <FormGroup $fullWidth>
                <Label>Special Status</Label>
                <CheckboxGroup>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={formData.is_vvip}
                      onChange={(e) => setFormData({...formData, is_vvip: e.target.checked})}
                    />
                    VVIP Number
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={formData.is_today_offer}
                      onChange={(e) => setFormData({...formData, is_today_offer: e.target.checked})}
                    />
                    Today's Offer
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                    />
                    Featured
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={formData.is_attractive}
                      onChange={(e) => setFormData({...formData, is_attractive: e.target.checked})}
                    />
                    Attractive
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={formData.is_sold}
                      onChange={(e) => setFormData({...formData, is_sold: e.target.checked})}
                    />
                    Sold
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                    />
                    Active
                  </CheckboxLabel>
                </CheckboxGroup>
              </FormGroup>

            </FormGrid>

            <ModalFooter>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button $primary type="submit">
                {editingNumber ? 'Update' : 'Create'} Phone Number
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </AdminContainer>
  );
};

export default AdminPhoneNumbers;