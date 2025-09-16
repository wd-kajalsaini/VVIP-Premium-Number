import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InstagramService } from '../services/instagramService';

const AdminContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin: 20px auto;
  max-width: 600px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 2px solid #e5e7eb;
`;

const AdminTitle = styled.h3`
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
`;

const AdminSubtitle = styled.p`
  color: #6b7280;
  text-align: center;
  margin-bottom: 25px;
  line-height: 1.5;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: #374151;
  font-weight: 600;
  margin-bottom: 8px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.$hasError ? '#ef4444' : '#d1d5db'};
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ef4444' : '#6366f1'};
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 14px;
  margin-top: 5px;
`;

const SuccessMessage = styled.div`
  color: #10b981;
  font-size: 14px;
  margin-top: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 25px;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  ${props => props.$variant === 'primary' ? `
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
    }
  ` : `
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;

    &:hover {
      background: #e5e7eb;
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const CurrentUrlDisplay = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
`;

const CurrentUrlLabel = styled.div`
  font-weight: 600;
  color: #495057;
  margin-bottom: 5px;
  font-size: 14px;
`;

const CurrentUrlValue = styled.div`
  color: #6366f1;
  word-break: break-all;
  font-family: monospace;
  font-size: 14px;
`;

interface InstagramAdminProps {
  onUrlUpdate?: (url: string) => void;
}

const InstagramAdmin: React.FC<InstagramAdminProps> = ({ onUrlUpdate }) => {
  const [url, setUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCurrentUrl = async () => {
      try {
        const savedUrl = await InstagramService.getInstagramUrl();
        setCurrentUrl(savedUrl || '');
      } catch (error) {
        console.error('Error loading Instagram URL:', error);
      }
    };

    loadCurrentUrl();

    // Subscribe to real-time updates
    const unsubscribe = InstagramService.subscribeToInstagramUrl((newUrl) => {
      setCurrentUrl(newUrl || '');
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSave = async () => {
    setError('');
    setSuccess('');

    if (!url.trim()) {
      setError('Please enter an Instagram URL');
      return;
    }

    if (!InstagramService.isValidInstagramUrl(url)) {
      setError('Please enter a valid Instagram profile URL (e.g., https://www.instagram.com/username/)');
      return;
    }

    setIsLoading(true);

    try {
      const result = await InstagramService.updateInstagramUrl(url);

      if (result.success) {
        setCurrentUrl(url);
        setSuccess('Instagram URL saved successfully! Gallery will update automatically.');
        setUrl('');

        // Dispatch custom event for same-tab updates
        window.dispatchEvent(new CustomEvent('instagram-url-updated', { detail: url }));

        if (onUrlUpdate) {
          onUrlUpdate(url);
        }
      } else {
        setError(result.error || 'Failed to save Instagram URL. Please try again.');
      }
    } catch (err) {
      setError('Failed to save Instagram URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = async () => {
    setIsLoading(true);
    try {
      const result = await InstagramService.clearInstagramUrl();

      if (result.success) {
        setCurrentUrl('');
        setUrl('');
        setSuccess('Instagram URL cleared successfully!');
        setError('');

        // Dispatch custom event for same-tab updates
        window.dispatchEvent(new CustomEvent('instagram-url-updated', { detail: '' }));

        if (onUrlUpdate) {
          onUrlUpdate('');
        }
      } else {
        setError(result.error || 'Failed to clear Instagram URL.');
      }
    } catch (err) {
      setError('Failed to clear Instagram URL.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError('');
    setSuccess('');
  };

  return (
    <AdminContainer>
      <AdminTitle>📸 Instagram Gallery Settings</AdminTitle>
      <AdminSubtitle>
        Add your Instagram profile URL to automatically fetch and display your posts in the gallery.
        No API keys or tokens required!
      </AdminSubtitle>

      <FormGroup>
        <Label htmlFor="instagram-url">Instagram Profile URL</Label>
        <InputWrapper>
          <Input
            id="instagram-url"
            type="url"
            value={url}
            onChange={handleInputChange}
            placeholder="https://www.instagram.com/your_username/"
            $hasError={!!error}
          />
        </InputWrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </FormGroup>

      <ButtonGroup>
        <Button
          $variant="primary"
          onClick={handleSave}
          disabled={isLoading || !url.trim()}
        >
          {isLoading ? 'Saving...' : 'Save & Update Gallery'}
        </Button>
        <Button
          $variant="secondary"
          onClick={handleClear}
          disabled={isLoading || !currentUrl}
        >
          Clear URL
        </Button>
      </ButtonGroup>

      {currentUrl && (
        <CurrentUrlDisplay>
          <CurrentUrlLabel>Currently Active Instagram URL:</CurrentUrlLabel>
          <CurrentUrlValue>{currentUrl}</CurrentUrlValue>
        </CurrentUrlDisplay>
      )}
    </AdminContainer>
  );
};

export default InstagramAdmin;