import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaUpload } from '../utils/iconComponents';
import { currencyNumberService, CurrencyNumber, CurrencyNumberInput } from '../services/currencyNumberService';
import { categoryService, Category } from '../services/categoryService';

// Reuse styled components
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

const FilterGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Button = styled.button<{ $primary?: boolean; $danger?: boolean }>`
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

  ${props => !props.$primary && !props.$danger && `
    background: white;
    color: #333;
    border: 1px solid #ddd;

    &:hover {
      background: #f8f9fa;
    }
  `}
`;

const Table = styled.table`
  width: 100%;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
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

const CurrencyImage = styled.img`
  width: 50px;
  height: 30px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Badge = styled.span<{ $type?: 'rare' | 'active' | 'sold' | 'offer' }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-right: 5px;
  display: inline-block;

  ${props => props.$type === 'rare' && `
    background: #f39c12;
    color: white;
  `}

  ${props => props.$type === 'active' && `
    background: #27ae60;
    color: white;
  `}

  ${props => props.$type === 'sold' && `
    background: #95a5a6;
    color: white;
  `}

  ${props => props.$type === 'offer' && `
    background: #e74c3c;
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
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
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

const FormGroup = styled.div`
  margin-bottom: 20px;
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
`;

const FormSelect = styled.select`
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

const ImageUpload = styled.div`
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #3498db;
  }

  input[type="file"] {
    display: none;
  }
`;

const ImagePreview = styled.div`
  margin-top: 15px;
  text-align: center;

  img {
    max-width: 100%;
    max-height: 200px;
    border-radius: 8px;
    border: 1px solid #ddd;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;

const PaginationInfo = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: ${props => props.$active ? '#3498db' : 'white'};
  color: ${props => props.$active ? 'white' : '#333'};
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  min-width: 40px;

  &:hover:not(:disabled) {
    background: ${props => props.$active ? '#2980b9' : '#f8f9fa'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ItemsPerPageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: #666;
`;

const ItemsPerPageSelect = styled.select`
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const AdminCurrencyNumbers: React.FC = () => {
  const [currencyNumbers, setCurrencyNumbers] = useState<CurrencyNumber[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<CurrencyNumber | null>(null);
  const [formData, setFormData] = useState<CurrencyNumberInput>({
    serial_number: '',
    category_id: 0,
    price: 0,
    is_active: true,
    is_sold: false
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    fetchCurrencyNumbers();
    fetchCategories();
  }, []);

  const fetchCurrencyNumbers = async () => {
    setLoading(true);
    try {
      const data = await currencyNumberService.getAllCurrencyNumbers();
      setCurrencyNumbers(data || []);
    } catch (error) {
      console.error('Error fetching currency numbers:', error);
      setCurrencyNumbers([]);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenModal = (entry?: CurrencyNumber) => {
    if (entry) {
      setEditingEntry(entry);
      setFormData({
        serial_number: entry.serial_number,
        category_id: entry.category_id || 0,
        price: entry.price,
        is_active: entry.is_active,
        is_sold: entry.is_sold
      });
      setImagePreview(entry.primary_image || '');
    } else {
      setEditingEntry(null);
      setFormData({
        serial_number: '',
        category_id: 0,
        price: 0,
        is_active: true,
        is_sold: false
      });
      setImagePreview('');
    }
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
    setSelectedImage(null);
    setImagePreview('');
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      // Try proxy first, fallback to direct WAMP URL
      let response;
      try {
        response = await fetch('/api/upload-currency-image.php', {
          method: 'POST',
          body: formData,
        });
      } catch (proxyError) {
        response = await fetch('http://localhost/premium-numbers/public/api/upload-currency-image.php', {
          method: 'POST',
          body: formData,
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Upload failed');
      }

      return result.imagePath;
    } catch (error) {
      console.error('Error uploading image:', error);
      // Fallback to data URL if upload fails
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          resolve(dataUrl);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = formData.primary_image;

    // Upload new image if selected
    if (selectedImage) {
      const uploadedPath = await uploadImage(selectedImage);
      if (uploadedPath) {
        imageUrl = uploadedPath;
      } else {
        // If upload failed and it's a required field, stop submission
        return;
      }
    }

    const dataToSubmit = {
      ...formData,
      primary_image: imageUrl
    };

    try {
      if (editingEntry) {
        const updated = await currencyNumberService.updateCurrencyNumber(editingEntry.id, dataToSubmit);
        if (updated) {
          fetchCurrencyNumbers();
          handleCloseModal();
        } else {
          alert('Failed to update currency number. Please check the console for errors.');
        }
      } else {
        const created = await currencyNumberService.createCurrencyNumber(dataToSubmit);
        if (created) {
          fetchCurrencyNumbers();
          handleCloseModal();
        } else {
          alert('Failed to create currency number. This serial number may already exist. Please use a different serial number.');
        }
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      if (error?.code === '23505' || error?.message?.includes('duplicate key')) {
        alert('This serial number already exists. Please use a different serial number.');
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this currency number?')) {
      const deleted = await currencyNumberService.deleteCurrencyNumber(id);
      if (deleted) {
        fetchCurrencyNumbers();
      }
    }
  };

  const filteredEntries = (currencyNumbers || []).filter(entry => {
    if (!entry) return false;

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' ||
      (entry.serial_number && entry.serial_number.toLowerCase().includes(searchLower));

    const matchesCategory = selectedCategory === 0 || entry.category_id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination calculations
  const totalItems = filteredEntries.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEntries = filteredEntries.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxPagesToShow; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - (maxPagesToShow - 1); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <AdminContainer>
      <Header>
        <Title>Currency Numbers Management</Title>
        <Button $primary onClick={() => handleOpenModal()}>
          <FaPlus /> Add Currency Number
        </Button>
      </Header>

      <ActionBar>
        <SearchContainer>
          <FaSearch color="#999" />
          <SearchInput
            placeholder="Search serial numbers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <FilterGroup>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
          >
            <option value={0}>All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </Select>

        </FilterGroup>

        <Button onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </ActionBar>

      {loading ? (
        <EmptyState>Loading currency numbers...</EmptyState>
      ) : filteredEntries.length === 0 ? (
        <EmptyState>
          <p>No currency numbers found</p>
          <Button $primary onClick={() => handleOpenModal()} style={{ marginTop: '20px' }}>
            <FaPlus /> Add First Currency Number
          </Button>
        </EmptyState>
      ) : (
        <>
        <Table>
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Serial Number</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedEntries.map(entry => (
              <Tr key={entry.id}>
                <Td>
                  {entry.primary_image ? (
                    <CurrencyImage src={entry.primary_image} alt={entry.serial_number} />
                  ) : (
                    <div style={{ width: '50px', height: '30px', background: '#f0f0f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#999' }}>
                      No Image
                    </div>
                  )}
                </Td>
                <Td>
                  <strong>{entry.serial_number}</strong>
                </Td>
                <Td>
                  {categories.find(c => c.id === entry.category_id)?.name || '-'}
                </Td>
                <Td>
                  ₹{entry.price % 1 === 0 ? entry.price.toLocaleString('en-IN') : entry.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Td>
                <Td>
                  {entry.is_active && <Badge $type="active">Active</Badge>}
                  {entry.is_sold && <Badge $type="sold">Sold</Badge>}
                </Td>
                <Td>
                  <Actions>
                    <ActionButton onClick={() => handleOpenModal(entry)}>
                      <FaEdit /> Edit
                    </ActionButton>
                    <ActionButton $danger onClick={() => handleDelete(entry.id)}>
                      <FaTrash /> Delete
                    </ActionButton>
                  </Actions>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Pagination Controls */}
        <PaginationContainer>
          <PaginationInfo>
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
          </PaginationInfo>

          <PaginationControls>
            <PageButton
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </PageButton>

            {getPageNumbers().map((page, index) => (
              typeof page === 'number' ? (
                <PageButton
                  key={index}
                  $active={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PageButton>
              ) : (
                <span key={index} style={{ padding: '0 8px', color: '#999' }}>
                  {page}
                </span>
              )
            ))}

            <PageButton
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </PageButton>
          </PaginationControls>

          <ItemsPerPageContainer>
            <span>Items per page:</span>
            <ItemsPerPageSelect
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </ItemsPerPageSelect>
          </ItemsPerPageContainer>
        </PaginationContainer>
      </>
      )}

      {/* Add/Edit Modal */}
      <Modal $isOpen={isModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{editingEntry ? 'Edit Currency Number' : 'Add Currency Number'}</ModalTitle>
            <Button onClick={handleCloseModal}>×</Button>
          </ModalHeader>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Serial Number *</Label>
              <Input
                type="text"
                value={formData.serial_number}
                onChange={(e) => setFormData({...formData, serial_number: e.target.value})}
                placeholder="e.g., A12B345678"
                required
              />
            </FormGroup>


            <FormGroup>
              <Label>Category</Label>
              <FormSelect
                value={formData.category_id}
                onChange={(e) => setFormData({...formData, category_id: parseInt(e.target.value)})}
              >
                <option value="0">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </FormSelect>
            </FormGroup>

            <FormGroup>
              <Label>Price *</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                required
              />
            </FormGroup>


            <FormGroup>
              <Label>Currency Image</Label>
              <ImageUpload onClick={() => document.getElementById('imageInput')?.click()}>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <FaUpload style={{ marginBottom: '10px' }} />
                <p>Click to upload currency image</p>
              </ImageUpload>
              {imagePreview && (
                <ImagePreview>
                  <img src={imagePreview} alt="Preview" />
                </ImagePreview>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Status</Label>
              <CheckboxGroup>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  />
                  Active
                </CheckboxLabel>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    checked={formData.is_sold}
                    onChange={(e) => setFormData({...formData, is_sold: e.target.checked})}
                  />
                  Sold
                </CheckboxLabel>
              </CheckboxGroup>
            </FormGroup>

            <ModalFooter>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button $primary type="submit">
                {editingEntry ? 'Update' : 'Create'} Currency Number
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </AdminContainer>
  );
};

export default AdminCurrencyNumbers;