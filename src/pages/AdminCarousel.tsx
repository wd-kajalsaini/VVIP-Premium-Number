import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaImage, FaEye } from '../utils/iconComponents';
import { carouselService, CarouselSlide } from '../services/carouselService';

const AdminContainer = styled.div`
  margin-top: 70px;
  min-height: calc(100vh - 70px);
  background: #f8f9fa;
  padding: 20px;
`;

const AdminHeader = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const HeaderTitle = styled.h1`
  color: #1f2937;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const HeaderSubtitle = styled.p`
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #4f46e5, #4338ca);
    transform: translateY(-1px);
  }
`;

const SearchInput = styled.input`
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  width: 300px;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const CarouselGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const CarouselCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.div<{ $image: string }>`
  height: 200px;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CardTitle = styled.h3`
  color: #1f2937;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const StatusBadge = styled.span<{ $active: boolean }>`
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${props => props.$active ? '#dcfce7' : '#fee2e2'};
  color: ${props => props.$active ? '#16a34a' : '#dc2626'};
`;

const DateText = styled.span`
  color: #9ca3af;
  font-size: 0.8rem;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ $variant?: 'edit' | 'delete' | 'view' }>`
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;

  ${props => {
    switch (props.$variant) {
      case 'edit':
        return `
          background: #f3f4f6;
          color: #374151;
          &:hover { background: #e5e7eb; }
        `;
      case 'delete':
        return `
          background: #fee2e2;
          color: #dc2626;
          &:hover { background: #fecaca; }
        `;
      case 'view':
        return `
          background: #eff6ff;
          color: #2563eb;
          &:hover { background: #dbeafe; }
        `;
      default:
        return `
          background: #f3f4f6;
          color: #374151;
          &:hover { background: #e5e7eb; }
        `;
    }
  }}
`;

const Modal = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  color: #374151;
  font-weight: 500;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const FileUploadArea = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  background: #f9fafb;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #6366f1;
    background: #f1f5f9;
  }

  &.dragover {
    border-color: #6366f1;
    background: #eff6ff;
  }
`;

const FileUploadIcon = styled.div`
  font-size: 2rem;
  color: #9ca3af;
  margin-bottom: 12px;
`;

const FileUploadText = styled.p`
  color: #6b7280;
  margin: 0 0 8px 0;
  font-weight: 500;
`;

const FileUploadSubtext = styled.p`
  color: #9ca3af;
  margin: 0;
  font-size: 0.875rem;
`;

const HiddenFileInput = styled.input.attrs({ type: 'file', accept: 'image/*' })`
  display: none;
`;

const ImagePreview = styled.div`
  margin-top: 15px;
  text-align: center;
`;

const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 120px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const FormCheckbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 8px;
  accent-color: #6366f1;
`;

const ModalFooter = styled.div`
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const ModalButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  ${props => props.$variant === 'primary' ? `
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: white;
    &:hover {
      background: linear-gradient(135deg, #4f46e5, #4338ca);
    }
  ` : `
    background: #f3f4f6;
    color: #374151;
    &:hover {
      background: #e5e7eb;
    }
  `}
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  color: #9ca3af;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h3`
  color: #374151;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const EmptyText = styled.p`
  color: #6b7280;
  margin-bottom: 20px;
`;

interface FormData {
  image: File | null;
  isActive: boolean;
}

const AdminCarousel: React.FC = () => {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<CarouselSlide | null>(null);
  const [formData, setFormData] = useState<FormData>({
    image: null,
    isActive: true
  });

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = async () => {
    try {
      setIsLoading(true);
      const data = await carouselService.getCarouselSlides();
      setSlides(data);
    } catch (error) {
      console.error('Error loading slides:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingSlide(null);
    setFormData({
      image: null,
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleEdit = (slide: CarouselSlide) => {
    setEditingSlide(slide);
    setFormData({
      image: null, // Will be handled separately for existing images
      isActive: slide.isActive
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (slideId: number) => {
    if (window.confirm('Are you sure you want to delete this carousel slide?')) {
      try {
        await carouselService.deleteCarouselSlide(slideId);
        setSlides(slides.filter(slide => slide.id !== slideId));
      } catch (error) {
        console.error('Error deleting slide:', error);
        alert('Failed to delete slide');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image && !editingSlide) {
      alert('Please select an image');
      return;
    }

    try {
      // In a real app, you would upload the file to a server here
      // For now, we'll create a mock URL
      let imageUrl = '';
      if (formData.image) {
        // Create object URL for preview (in real app, upload to server)
        imageUrl = URL.createObjectURL(formData.image);
      } else if (editingSlide) {
        imageUrl = editingSlide.image;
      }

      const slideData = {
        image: imageUrl,
        isActive: formData.isActive
      };

      if (editingSlide) {
        // Update existing slide
        const updatedSlide = await carouselService.updateCarouselSlide(editingSlide.id, slideData);
        setSlides(slides.map(slide =>
          slide.id === editingSlide.id ? updatedSlide : slide
        ));
      } else {
        // Add new slide
        const newSlide = await carouselService.addCarouselSlide(slideData);
        setSlides([...slides, newSlide]);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving slide:', error);
      alert('Failed to save slide');
    }
  };

  const handleInputChange = (field: keyof FormData, value: File | boolean | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleInputChange('image', file);
  };

  const filteredSlides = slides.filter(slide =>
    searchTerm === '' || slide.image.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <AdminContainer>
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <div style={{ fontSize: '1.2rem', color: '#6b7280' }}>Loading...</div>
        </div>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <AdminHeader>
        <HeaderTitle>Carousel Management</HeaderTitle>
        <HeaderSubtitle>Manage carousel slides displayed on the homepage</HeaderSubtitle>
      </AdminHeader>

      <ActionBar>
        <AddButton onClick={handleAdd}>
          <FaPlus />
          Add New Slide
        </AddButton>
        <SearchInput
          type="text"
          placeholder="Search slides..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </ActionBar>

      {filteredSlides.length === 0 ? (
        <EmptyState>
          <EmptyIcon>
            <FaImage />
          </EmptyIcon>
          <EmptyTitle>No carousel slides found</EmptyTitle>
          <EmptyText>
            {searchTerm ? 'No slides match your search criteria.' : 'Start by adding your first carousel slide.'}
          </EmptyText>
          {!searchTerm && (
            <AddButton onClick={handleAdd}>
              <FaPlus />
              Add First Slide
            </AddButton>
          )}
        </EmptyState>
      ) : (
        <CarouselGrid>
          {filteredSlides.map((slide) => (
            <CarouselCard key={slide.id}>
              <CardImage $image={slide.image} />
              <CardContent>
                <CardTitle>Carousel Image #{slide.id}</CardTitle>
                <CardMeta>
                  <StatusBadge $active={slide.isActive}>
                    {slide.isActive ? 'Active' : 'Inactive'}
                  </StatusBadge>
                  <DateText>{formatDate(slide.createdAt)}</DateText>
                </CardMeta>
                <CardActions>
                  <ActionButton $variant="edit" onClick={() => handleEdit(slide)}>
                    <FaEdit />
                    Edit
                  </ActionButton>
                  <ActionButton $variant="delete" onClick={() => handleDelete(slide.id)}>
                    <FaTrash />
                    Delete
                  </ActionButton>
                </CardActions>
              </CardContent>
            </CarouselCard>
          ))}
        </CarouselGrid>
      )}

      <Modal $isOpen={isModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              {editingSlide ? 'Edit Carousel Slide' : 'Add New Carousel Slide'}
            </ModalTitle>
            <ActionButton onClick={() => setIsModalOpen(false)}>
              <FaTimes />
            </ActionButton>
          </ModalHeader>

          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormGroup>
                <FormLabel>Upload Image *</FormLabel>
                <FileUploadArea onClick={() => document.getElementById('file-upload')?.click()}>
                  <HiddenFileInput
                    id="file-upload"
                    onChange={handleFileChange}
                  />
                  <FileUploadIcon>
                    <FaImage />
                  </FileUploadIcon>
                  <FileUploadText>
                    {formData.image ? formData.image.name : 'Click to upload image'}
                  </FileUploadText>
                  <FileUploadSubtext>
                    PNG, JPG, GIF up to 10MB
                  </FileUploadSubtext>
                </FileUploadArea>

                {formData.image && (
                  <ImagePreview>
                    <PreviewImage
                      src={URL.createObjectURL(formData.image)}
                      alt="Preview"
                    />
                  </ImagePreview>
                )}

                {editingSlide && !formData.image && (
                  <ImagePreview>
                    <PreviewImage
                      src={editingSlide.image}
                      alt="Current image"
                    />
                    <p style={{ marginTop: '8px', color: '#6b7280', fontSize: '0.875rem' }}>
                      Current image (upload new to replace)
                    </p>
                  </ImagePreview>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  <FormCheckbox
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  />
                  Active (Show on homepage)
                </FormLabel>
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <ModalButton type="button" onClick={() => setIsModalOpen(false)}>
                <FaTimes />
                Cancel
              </ModalButton>
              <ModalButton type="submit" $variant="primary">
                <FaSave />
                {editingSlide ? 'Update Slide' : 'Create Slide'}
              </ModalButton>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </AdminContainer>
  );
};

export default AdminCarousel;