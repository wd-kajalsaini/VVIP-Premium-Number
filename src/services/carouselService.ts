export interface CarouselSlide {
  id: number;
  image: string;
  isActive: boolean;
  createdAt: string;
}

// Mock API service - replace with actual API calls
export const carouselService = {
  // Fetch carousel slides from admin panel
  async getCarouselSlides(): Promise<CarouselSlide[]> {
    try {
      // This would be replaced with actual API call
      // const response = await fetch('/api/carousel-slides');
      // const data = await response.json();

      // Mock data for now - these would come from admin panel
      const mockSlides: CarouselSlide[] = [
        {
          id: 1,
          image: "/hero2.jpeg",
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          image: "/hero3.jpeg",
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ];

      return mockSlides.filter(slide => slide.isActive);
    } catch (error) {
      console.error('Error fetching carousel slides:', error);
      return [];
    }
  },

  // Add new carousel slide (admin function)
  async addCarouselSlide(slide: Omit<CarouselSlide, 'id' | 'createdAt'>): Promise<CarouselSlide> {
    try {
      // This would be replaced with actual API call
      // const response = await fetch('/api/carousel-slides', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(slide)
      // });
      // return await response.json();

      const newSlide: CarouselSlide = {
        ...slide,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };

      return newSlide;
    } catch (error) {
      console.error('Error adding carousel slide:', error);
      throw error;
    }
  },

  // Update carousel slide (admin function)
  async updateCarouselSlide(id: number, updates: Partial<CarouselSlide>): Promise<CarouselSlide> {
    try {
      // This would be replaced with actual API call
      // const response = await fetch(`/api/carousel-slides/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // });
      // return await response.json();

      const updatedSlide: CarouselSlide = {
        id,
        image: updates.image || '',
        isActive: updates.isActive !== undefined ? updates.isActive : true,
        createdAt: updates.createdAt || new Date().toISOString()
      };

      return updatedSlide;
    } catch (error) {
      console.error('Error updating carousel slide:', error);
      throw error;
    }
  },

  // Delete carousel slide (admin function)
  async deleteCarouselSlide(id: number): Promise<boolean> {
    try {
      // This would be replaced with actual API call
      // const response = await fetch(`/api/carousel-slides/${id}`, {
      //   method: 'DELETE'
      // });
      // return response.ok;

      return true;
    } catch (error) {
      console.error('Error deleting carousel slide:', error);
      return false;
    }
  }
};