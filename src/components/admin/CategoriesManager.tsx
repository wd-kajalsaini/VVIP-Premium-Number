import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { supabase } from '../../lib/supabase'
import { categoryService, Category } from '../../services/categoryService'
import { theme } from '../../styles/theme'
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSave, 
  FaTimes,
  FaSearch
} from '../../utils/iconComponents'

const Container = styled.div`
  background: ${theme.colors.neutral.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.lg};
  overflow: hidden;
`

const Header = styled.div`
  padding: ${theme.spacing.xl};
  background: linear-gradient(135deg,
    ${theme.colors.primary.orange}10,
    ${theme.colors.primary.skyBlue}10
  );
  border-bottom: 2px solid ${theme.colors.neutral.gray200};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};

  @media (max-width: 768px) {
    padding: ${theme.spacing.lg};
    flex-direction: column;
    align-items: stretch;
  }
`

const Title = styled.h1`
  background: linear-gradient(135deg, 
    ${theme.colors.primary.orange}, 
    ${theme.colors.primary.skyBlue}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  font-size: ${theme.typography.fontSize.xl};
`

const Controls = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
`

const SearchContainer = styled.div`
  position: relative;
  min-width: 250px;

  @media (max-width: 768px) {
    min-width: 100%;
    order: 1; /* Put search below title on mobile */
  }
`

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.sm} 40px;
  border: 2px solid ${theme.colors.neutral.gray300};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.sm};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.orange};
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.neutral.gray400};
`

const AddButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: linear-gradient(135deg,
    ${theme.colors.primary.orange},
    ${theme.colors.primary.skyBlue}
  );
  color: ${theme.colors.neutral.white};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }
`

const Content = styled.div`
  padding: ${theme.spacing.lg};
`

const AddForm = styled.div<{ $show: boolean }>`
  display: ${props => props.$show ? 'flex' : 'none'};
  gap: ${theme.spacing.md};
  align-items: center;
  padding: ${theme.spacing.md};
  background: ${theme.colors.neutral.gray50};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.lg};
  border: 2px solid ${theme.colors.primary.orange}30;
`

const Input = styled.input`
  flex: 1;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.neutral.gray300};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.orange};
  }
`

const InlineSelect = styled.select`
  padding: 4px 8px;
  border: 1px solid ${theme.colors.neutral.gray300};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.xs};
  background: white;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.orange};
  }
`

const ActionButton = styled.button<{ $variant?: 'save' | 'cancel' | 'edit' | 'delete' }>`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  transition: all 0.2s ease;
  min-height: 36px;

  @media (max-width: 768px) {
    min-height: 44px;
    padding: ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.xs};

    /* Hide text on very small screens, show only icons */
    @media (max-width: 480px) {
      span {
        display: none;
      }

      svg {
        margin: 0;
      }
    }
  }

  ${props => {
    switch (props.$variant) {
      case 'save':
        return `
          background: ${theme.colors.primary.green};
          color: ${theme.colors.neutral.white};
          &:hover { background: #059669; }
        `
      case 'cancel':
        return `
          background: ${theme.colors.neutral.gray300};
          color: ${theme.colors.neutral.gray700};
          &:hover { background: ${theme.colors.neutral.gray400}; }
        `
      case 'edit':
        return `
          background: ${theme.colors.primary.skyBlue};
          color: ${theme.colors.neutral.white};
          &:hover { background: #0284c7; }
        `
      case 'delete':
        return `
          background: #ef4444;
          color: ${theme.colors.neutral.white};
          &:hover { background: #dc2626; }
        `
      default:
        return `
          background: ${theme.colors.primary.orange};
          color: ${theme.colors.neutral.white};
          &:hover { background: #ea580c; }
        `
    }
  }}
`

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};

  @media (max-width: 768px) {
    border-radius: ${theme.borderRadius.md};
    margin: 0 -${theme.spacing.sm};
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${theme.spacing.md};
  min-width: 600px;

  @media (max-width: 768px) {
    margin-top: ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.sm};
  }
`

const TableHeader = styled.thead`
  background: ${theme.colors.neutral.gray100};
`

const TableRow = styled.tr<{ $isEditing?: boolean }>`
  border-bottom: 1px solid ${theme.colors.neutral.gray200};
  background: ${props => props.$isEditing ? `${theme.colors.primary.orange}05` : 'transparent'};

  &:hover {
    background: ${theme.colors.neutral.gray50};
  }
`

const TableCell = styled.td`
  padding: ${theme.spacing.md};
  text-align: left;
  vertical-align: middle;

  @media (max-width: 768px) {
    padding: ${theme.spacing.sm};

    &:first-child {
      padding-left: ${theme.spacing.md};
    }

    &:last-child {
      padding-right: ${theme.spacing.md};
    }
  }
`

const TableHeaderCell = styled.th`
  padding: ${theme.spacing.md};
  text-align: left;
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.neutral.gray700};
  border-bottom: 2px solid ${theme.colors.neutral.gray300};
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.xs};

    &:first-child {
      padding-left: ${theme.spacing.md};
    }

    &:last-child {
      padding-right: ${theme.spacing.md};
    }
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing['2xl']};
  color: ${theme.colors.neutral.gray600};
`

const LoadingState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.neutral.gray600};
`

const ErrorMessage = styled.div`
  background: #fee;
  border: 1px solid #fcc;
  color: #c33;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.md};
`

const CategoriesManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState('')
  const [editingStatus, setEditingStatus] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCategories(filtered)
  }, [categories, searchTerm])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const data = await categoryService.getAllCategories()
      setCategories(data || [])
    } catch (error: any) {
      setError(error.message || 'Failed to fetch categories')
    } finally {
      setLoading(false)
    }
  }

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return

    try {
      setSaving(true)
      const categoryInput = {
        name: newCategoryName.trim()
      }

      const newCategory = await categoryService.createCategory(categoryInput)

      if (newCategory) {
        setCategories([...categories, newCategory])
        setNewCategoryName('')
        setShowAddForm(false)
        setError('')
      } else {
        setError('Failed to create category')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleEditStart = (category: Category) => {
    setEditingId(category.id)
    setEditingName(category.name)
    setEditingStatus(category.is_active ?? true)
  }

  const handleEditSave = async (id: number) => {
    if (!editingName.trim()) return

    try {
      setSaving(true)
      const categoryInput = {
        name: editingName.trim(),
        is_active: editingStatus
      }

      const updatedCategory = await categoryService.updateCategory(id, categoryInput)

      if (updatedCategory) {
        setCategories(categories.map(cat =>
          cat.id === id ? updatedCategory : cat
        ))
        setEditingId(null)
        setEditingName('')
        setError('')
      } else {
        setError('Failed to update category')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditingName('')
    setEditingStatus(true)
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return

    try {
      setSaving(true)
      const success = await categoryService.deleteCategory(id)

      if (success) {
        setCategories(categories.filter(cat => cat.id !== id))
        setError('')
      } else {
        setError('Failed to delete category')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <Container>
        <LoadingState>Loading categories...</LoadingState>
      </Container>
    )
  }

  return (
    <Container>
      <Header>
        <Title>Categories Management</Title>
        <Controls>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          <AddButton onClick={() => setShowAddForm(true)}>
            <FaPlus />
            Add Category
          </AddButton>
        </Controls>
      </Header>

      <Content>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <AddForm $show={showAddForm}>
          <Input
            type="text"
            placeholder="Category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
          />
          <ActionButton 
            $variant="save" 
            onClick={handleAddCategory}
            disabled={saving}
          >
            <FaSave />
            {saving ? 'Saving...' : 'Save'}
          </ActionButton>
          <ActionButton 
            $variant="cancel" 
            onClick={() => {
              setShowAddForm(false)
              setNewCategoryName('')
            }}
          >
            <FaTimes />
            Cancel
          </ActionButton>
        </AddForm>

        {filteredCategories.length === 0 ? (
          <EmptyState>
            {searchTerm ? 'No categories found matching your search.' : 'No categories found. Add your first category!'}
          </EmptyState>
        ) : (
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>ID</TableHeaderCell>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Created</TableHeaderCell>
                  <TableHeaderCell>Updated</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHeader>
            <tbody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id} $isEditing={editingId === category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>
                    {editingId === category.id ? (
                      <Input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleEditSave(category.id)}
                      />
                    ) : (
                      category.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === category.id ? (
                      <InlineSelect
                        value={editingStatus ? 'active' : 'inactive'}
                        onChange={(e) => setEditingStatus(e.target.value === 'active')}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </InlineSelect>
                    ) : (
                      <span style={{
                        background: category.is_active ? '#e8f5e8' : '#ffebee',
                        color: category.is_active ? '#2e7d32' : '#c62828',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem'
                      }}>
                        {category.is_active ? 'Active' : 'Inactive'}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(category.created_at)}</TableCell>
                  <TableCell>{formatDate(category.updated_at)}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {editingId === category.id ? (
                        <>
                          <ActionButton
                            $variant="save"
                            onClick={() => handleEditSave(category.id)}
                            disabled={saving}
                          >
                            <FaSave />
                            <span>Save</span>
                          </ActionButton>
                          <ActionButton
                            $variant="cancel"
                            onClick={handleEditCancel}
                          >
                            <FaTimes />
                            <span>Cancel</span>
                          </ActionButton>
                        </>
                      ) : (
                        <>
                          <ActionButton
                            $variant="edit"
                            onClick={() => handleEditStart(category)}
                            disabled={saving}
                          >
                            <FaEdit />
                            <span>Edit</span>
                          </ActionButton>
                          <ActionButton
                            $variant="delete"
                            onClick={() => handleDelete(category.id)}
                            disabled={saving}
                          >
                            <FaTrash />
                            <span>Delete</span>
                          </ActionButton>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
            </Table>
          </TableContainer>
        )}
      </Content>
    </Container>
  )
}

export default CategoriesManager