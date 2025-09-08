import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { supabase, PhoneNumber, Category } from '../../lib/supabase'
import { theme } from '../../styles/theme'
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSave, 
  FaTimes,
  FaSearch,
  FaCrown,
  FaPhoneAlt
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
  display: ${props => props.$show ? 'block' : 'none'};
  padding: ${theme.spacing.md};
  background: ${theme.colors.neutral.gray50};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.lg};
  border: 2px solid ${theme.colors.primary.orange}30;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.neutral.gray800};
  margin-bottom: ${theme.spacing.xs};
  font-size: ${theme.typography.fontSize.sm};
`

const Input = styled.input`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.neutral.gray300};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.orange};
  }
`

const Select = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.neutral.gray300};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  background: ${theme.colors.neutral.white};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.orange};
  }
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: ${theme.colors.primary.orange};
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

const FormActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${theme.spacing.md};
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
  font-size: ${theme.typography.fontSize.sm};
`

const TableHeaderCell = styled.th`
  padding: ${theme.spacing.md};
  text-align: left;
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.neutral.gray700};
  border-bottom: 2px solid ${theme.colors.neutral.gray300};
  font-size: ${theme.typography.fontSize.sm};
`

const PremiumBadge = styled.span<{ $isPremium: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  background: ${props => props.$isPremium 
    ? `linear-gradient(135deg, ${theme.colors.primary.orange}, ${theme.colors.primary.yellow})` 
    : theme.colors.neutral.gray300};
  color: ${props => props.$isPremium 
    ? theme.colors.neutral.white 
    : theme.colors.neutral.gray700};
`

const PhoneDisplay = styled.span`
  font-family: 'Courier New', monospace;
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.primary.orange};
`

const PriceDisplay = styled.span`
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.primary.green};
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

interface FormData {
  phone_number: string
  price: string
  category_id: string
  is_premium: boolean
}

const PhoneNumbersManager: React.FC = () => {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([])
  const [filteredPhoneNumbers, setFilteredPhoneNumbers] = useState<PhoneNumber[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    phone_number: '',
    price: '',
    category_id: '',
    is_premium: false
  })

  const [editData, setEditData] = useState<FormData>({
    phone_number: '',
    price: '',
    category_id: '',
    is_premium: false
  })

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const filtered = phoneNumbers.filter(phone =>
      phone.phone_number.includes(searchTerm) ||
      phone.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredPhoneNumbers(filtered)
  }, [phoneNumbers, searchTerm])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (categoriesError) throw categoriesError
      setCategories(categoriesData || [])

      // Fetch phone numbers with categories
      const { data: phoneData, error: phoneError } = await supabase
        .from('phone_numbers')
        .select(`
          *,
          category:categories(*)
        `)
        .order('created_at', { ascending: false })

      if (phoneError) throw phoneError
      setPhoneNumbers(phoneData || [])
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPhoneNumber = async () => {
    if (!formData.phone_number.trim() || !formData.price || !formData.category_id) {
      setError('Please fill in all required fields')
      return
    }

    try {
      setSaving(true)
      const { data, error } = await supabase
        .from('phone_numbers')
        .insert([{
          phone_number: formData.phone_number.trim(),
          price: parseFloat(formData.price),
          category_id: parseInt(formData.category_id),
          is_premium: formData.is_premium
        }])
        .select(`
          *,
          category:categories(*)
        `)

      if (error) throw error

      setPhoneNumbers([...data, ...phoneNumbers])
      setFormData({
        phone_number: '',
        price: '',
        category_id: '',
        is_premium: false
      })
      setShowAddForm(false)
      setError('')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleEditStart = (phoneNumber: PhoneNumber) => {
    setEditingId(phoneNumber.id)
    setEditData({
      phone_number: phoneNumber.phone_number,
      price: phoneNumber.price.toString(),
      category_id: phoneNumber.category_id?.toString() || '',
      is_premium: phoneNumber.is_premium
    })
  }

  const handleEditSave = async (id: number) => {
    if (!editData.phone_number.trim() || !editData.price || !editData.category_id) {
      setError('Please fill in all required fields')
      return
    }

    try {
      setSaving(true)
      const { data, error } = await supabase
        .from('phone_numbers')
        .update({
          phone_number: editData.phone_number.trim(),
          price: parseFloat(editData.price),
          category_id: parseInt(editData.category_id),
          is_premium: editData.is_premium
        })
        .eq('id', id)
        .select(`
          *,
          category:categories(*)
        `)

      if (error) throw error

      setPhoneNumbers(phoneNumbers.map(phone => 
        phone.id === id ? data[0] : phone
      ))
      setEditingId(null)
      setError('')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditData({
      phone_number: '',
      price: '',
      category_id: '',
      is_premium: false
    })
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this phone number?')) return

    try {
      setSaving(true)
      const { error } = await supabase
        .from('phone_numbers')
        .delete()
        .eq('id', id)

      if (error) throw error

      setPhoneNumbers(phoneNumbers.filter(phone => phone.id !== id))
      setError('')
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  if (loading) {
    return (
      <Container>
        <LoadingState>Loading phone numbers...</LoadingState>
      </Container>
    )
  }

  return (
    <Container>
      <Header>
        <Title>Phone Numbers Management</Title>
        <Controls>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search phone numbers or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          <AddButton onClick={() => setShowAddForm(true)}>
            <FaPlus />
            Add Phone Number
          </AddButton>
        </Controls>
      </Header>

      <Content>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <AddForm $show={showAddForm}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="phone_number">Phone Number *</Label>
              <Input
                type="text"
                id="phone_number"
                placeholder="e.g., 9999999999"
                value={formData.phone_number}
                onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                type="number"
                id="price"
                placeholder="e.g., 50000"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="category">Category *</Label>
              <Select
                id="category"
                value={formData.category_id}
                onChange={(e) => setFormData({...formData, category_id: e.target.value})}
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>&nbsp;</Label>
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  id="is_premium"
                  checked={formData.is_premium}
                  onChange={(e) => setFormData({...formData, is_premium: e.target.checked})}
                />
                <Label htmlFor="is_premium">Premium Number</Label>
              </CheckboxContainer>
            </FormGroup>
          </FormRow>

          <FormActions>
            <ActionButton 
              $variant="save" 
              onClick={handleAddPhoneNumber}
              disabled={saving}
            >
              <FaSave />
              {saving ? 'Saving...' : 'Save'}
            </ActionButton>
            <ActionButton 
              $variant="cancel" 
              onClick={() => {
                setShowAddForm(false)
                setFormData({
                  phone_number: '',
                  price: '',
                  category_id: '',
                  is_premium: false
                })
                setError('')
              }}
            >
              <FaTimes />
              Cancel
            </ActionButton>
          </FormActions>
        </AddForm>

        {filteredPhoneNumbers.length === 0 ? (
          <EmptyState>
            {searchTerm ? 'No phone numbers found matching your search.' : 'No phone numbers found. Add your first phone number!'}
          </EmptyState>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Phone Number</TableHeaderCell>
                <TableHeaderCell>Price</TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Created</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <tbody>
              {filteredPhoneNumbers.map((phoneNumber) => (
                <TableRow key={phoneNumber.id} $isEditing={editingId === phoneNumber.id}>
                  <TableCell>{phoneNumber.id}</TableCell>
                  <TableCell>
                    {editingId === phoneNumber.id ? (
                      <Input
                        type="text"
                        value={editData.phone_number}
                        onChange={(e) => setEditData({...editData, phone_number: e.target.value})}
                      />
                    ) : (
                      <PhoneDisplay>
                        <FaPhoneAlt style={{ marginRight: '8px' }} />
                        {phoneNumber.phone_number}
                      </PhoneDisplay>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === phoneNumber.id ? (
                      <Input
                        type="number"
                        value={editData.price}
                        onChange={(e) => setEditData({...editData, price: e.target.value})}
                      />
                    ) : (
                      <PriceDisplay>{formatPrice(phoneNumber.price)}</PriceDisplay>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === phoneNumber.id ? (
                      <Select
                        value={editData.category_id}
                        onChange={(e) => setEditData({...editData, category_id: e.target.value})}
                      >
                        <option value="">Select category</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </Select>
                    ) : (
                      phoneNumber.category?.name || 'No Category'
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === phoneNumber.id ? (
                      <CheckboxContainer>
                        <Checkbox
                          type="checkbox"
                          checked={editData.is_premium}
                          onChange={(e) => setEditData({...editData, is_premium: e.target.checked})}
                        />
                        <span>Premium</span>
                      </CheckboxContainer>
                    ) : (
                      <PremiumBadge $isPremium={phoneNumber.is_premium}>
                        {phoneNumber.is_premium && <FaCrown />}
                        {phoneNumber.is_premium ? 'Premium' : 'Regular'}
                      </PremiumBadge>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(phoneNumber.created_at)}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {editingId === phoneNumber.id ? (
                        <>
                          <ActionButton 
                            $variant="save" 
                            onClick={() => handleEditSave(phoneNumber.id)}
                            disabled={saving}
                          >
                            <FaSave />
                          </ActionButton>
                          <ActionButton 
                            $variant="cancel" 
                            onClick={handleEditCancel}
                          >
                            <FaTimes />
                          </ActionButton>
                        </>
                      ) : (
                        <>
                          <ActionButton 
                            $variant="edit" 
                            onClick={() => handleEditStart(phoneNumber)}
                            disabled={saving}
                          >
                            <FaEdit />
                          </ActionButton>
                          <ActionButton 
                            $variant="delete" 
                            onClick={() => handleDelete(phoneNumber.id)}
                            disabled={saving}
                          >
                            <FaTrash />
                          </ActionButton>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
      </Content>
    </Container>
  )
}

export default PhoneNumbersManager