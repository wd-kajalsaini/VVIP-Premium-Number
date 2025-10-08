import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaSearch } from '../utils/iconComponents';
import { numerologyService, NumerologyEntry, NumerologyInput } from '../services/numerologyService';
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

const NumberDisplay = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  letter-spacing: 1px;
`;

const Badge = styled.span<{ $type?: 'active' | 'sold' }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-right: 5px;
  display: inline-block;

  ${props => props.$type === 'active' && `
    background: #27ae60;
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

const AdminNumerology: React.FC = () => {
  const [numerologyEntries, setNumerologyEntries] = useState<NumerologyEntry[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<NumerologyEntry | null>(null);
  const [formData, setFormData] = useState<NumerologyInput>({
    number: '',
    price: 0,
    category_id: 0,
    is_active: true,
    is_sold: false
  });

  useEffect(() => {
    fetchNumerologyEntries();
    fetchCategories();
  }, []);

  const fetchNumerologyEntries = async () => {
    setLoading(true);
    try {
      const data = await numerologyService.getAllNumerologyEntries();
      setNumerologyEntries(data || []);
    } catch (error) {
      console.error('Error fetching numerology entries:', error);
      setNumerologyEntries([]);
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

  const handleOpenModal = (entry?: NumerologyEntry) => {
    if (entry) {
      setEditingEntry(entry);
      setFormData({
        number: entry.number,
        price: entry.price,
        category_id: entry.category_id || 0,
        is_active: entry.is_active,
        is_sold: entry.is_sold
      });
    } else {
      setEditingEntry(null);
      setFormData({
        number: '',
        price: 0,
        category_id: 0,
        is_active: true,
        is_sold: false
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEntry) {
      const updated = await numerologyService.updateNumerologyEntry(editingEntry.id, formData);
      if (updated) {
        fetchNumerologyEntries();
        handleCloseModal();
      }
    } else {
      const created = await numerologyService.createNumerologyEntry(formData);
      if (created) {
        fetchNumerologyEntries();
        handleCloseModal();
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this numerology entry?')) {
      const deleted = await numerologyService.deleteNumerologyEntry(id);
      if (deleted) {
        fetchNumerologyEntries();
      }
    }
  };

  const filteredEntries = (numerologyEntries || []).filter(entry => {
    if (!entry) return false;

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' ||
      entry.number.toString().includes(searchLower);

    return matchesSearch;
  });

  // Pagination calculations
  const totalItems = filteredEntries.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEntries = filteredEntries.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
        <Title>Numerology Special Management</Title>
        <Button $primary onClick={() => handleOpenModal()}>
          <FaPlus /> Add Numerology Entry
        </Button>
      </Header>

      <ActionBar>
        <SearchContainer>
          <FaSearch color="#999" />
          <SearchInput
            placeholder="Search numerology numbers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <Button onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </ActionBar>

      {loading ? (
        <EmptyState>Loading numerology entries...</EmptyState>
      ) : filteredEntries.length === 0 ? (
        <EmptyState>
          <p>No numerology entries found</p>
          <Button $primary onClick={() => handleOpenModal()} style={{ marginTop: '20px' }}>
            <FaPlus /> Add First Numerology Entry
          </Button>
        </EmptyState>
      ) : (
        <>
          <Table>
            <Thead>
              <Tr>
                <Th>Number</Th>
                <Th>Price</Th>
                <Th>Category</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedEntries.map(entry => (
                <Tr key={entry.id}>
                  <Td>
                    <NumberDisplay>
                      {entry.number}
                    </NumberDisplay>
                  </Td>
                  <Td>
                    ₹{entry.price % 1 === 0 ? entry.price.toLocaleString('en-IN') : entry.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Td>
                  <Td>
                    {categories.find(c => c.id === entry.category_id)?.name || '-'}
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
            <ModalTitle>{editingEntry ? 'Edit Numerology Entry' : 'Add Numerology Entry'}</ModalTitle>
            <Button onClick={handleCloseModal}>×</Button>
          </ModalHeader>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Number *</Label>
              <Input
                type="text"
                value={formData.number}
                onChange={(e) => setFormData({...formData, number: e.target.value})}
                placeholder="e.g., 9999900001"
                required
              />
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
                {editingEntry ? 'Update' : 'Create'} Entry
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </AdminContainer>
  );
};

export default AdminNumerology;