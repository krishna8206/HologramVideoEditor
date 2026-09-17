import axios from 'axios';
import {
  CATEGORIES_DATA,
  TEMPLATES_DATA,
  MOCK_USER,
  INITIAL_USER_PURCHASES,
  INITIAL_USER_VIDEOS
} from '../utils/mockData';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach Auth Token if exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('aura_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper for simulated delay
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// ==========================================
// 1. AUTHENTICATION & PROFILE API
// ==========================================
export const authApi = {
  async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    } catch {
      await delay(600);
      const user = { ...MOCK_USER, email };
      const token = 'jwt_mock_token_' + Date.now();
      localStorage.setItem('aura_auth_token', token);
      localStorage.setItem('aura_user', JSON.stringify(user));
      return { success: true, user, token };
    }
  },

  async register(name, email, password) {
    try {
      const response = await apiClient.post('/auth/register', { name, email, password });
      return response.data;
    } catch {
      await delay(600);
      const user = { ...MOCK_USER, name, email };
      const token = 'jwt_mock_token_' + Date.now();
      localStorage.setItem('aura_auth_token', token);
      localStorage.setItem('aura_user', JSON.stringify(user));
      return { success: true, user, token, requiresOtp: false };
    }
  },

  async sendOtp(phoneOrEmail) {
    try {
      const response = await apiClient.post('/auth/send-otp', { phoneOrEmail });
      return response.data;
    } catch {
      await delay(500);
      return { success: true, message: '6-digit OTP dispatched successfully (Demo OTP: 123456)' };
    }
  },

  async verifyOtp(phoneOrEmail, otp) {
    try {
      const response = await apiClient.post('/auth/verify-otp', { phoneOrEmail, otp });
      return response.data;
    } catch {
      await delay(500);
      if (otp === '123456' || otp.length === 6) {
        return { success: true, message: 'OTP verified successfully' };
      }
      throw new Error('Invalid OTP code. Please enter 123456 for demo.');
    }
  },

  async forgotPassword(email) {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      return response.data;
    } catch {
      await delay(500);
      return { success: true, message: 'Reset instructions dispatched to ' + email };
    }
  },

  async resetPassword(token, newPassword) {
    try {
      const response = await apiClient.post('/auth/reset-password', { token, newPassword });
      return response.data;
    } catch {
      await delay(500);
      return { success: true, message: 'Password updated successfully' };
    }
  },

  async getProfile() {
    try {
      const response = await apiClient.get('/auth/profile');
      return response.data;
    } catch {
      const stored = localStorage.getItem('aura_user');
      return stored ? JSON.parse(stored) : MOCK_USER;
    }
  },

  async updateProfile(updates) {
    try {
      const response = await apiClient.put('/auth/profile', updates);
      return response.data;
    } catch {
      await delay(400);
      const current = localStorage.getItem('aura_user') ? JSON.parse(localStorage.getItem('aura_user')) : MOCK_USER;
      const updated = { ...current, ...updates };
      localStorage.setItem('aura_user', JSON.stringify(updated));
      return { success: true, user: updated };
    }
  }
};

// ==========================================
// 2. CATEGORIES & SUBCATEGORIES API
// ==========================================
export const categoryApi = {
  async getCategories() {
    try {
      const response = await apiClient.get('/categories');
      return response.data;
    } catch {
      await delay(200);
      return CATEGORIES_DATA;
    }
  }
};

// ==========================================
// 3. TEMPLATES CATALOG & SEARCH API
// ==========================================
export const templateApi = {
  async getTemplates(filters = {}) {
    try {
      const response = await apiClient.get('/templates', { params: filters });
      return response.data;
    } catch {
      await delay(300);
      let results = [...TEMPLATES_DATA];

      // Category filter
      if (filters.category && filters.category !== 'all') {
        results = results.filter((t) => t.category === filters.category);
      }

      // Subcategory filter
      if (filters.subcategory && filters.subcategory !== 'all') {
        results = results.filter((t) => t.subcategory === filters.subcategory);
      }

      // Pricing filter (free, premium)
      if (filters.pricing === 'free') {
        results = results.filter((t) => !t.isPremium);
      } else if (filters.pricing === 'premium') {
        results = results.filter((t) => t.isPremium);
      }

      // Orientation filter (9:16, 16:9, 1:1)
      if (filters.orientation && filters.orientation !== 'all') {
        results = results.filter((t) => t.orientation === filters.orientation);
      }

      // Resolution filter
      if (filters.resolution && filters.resolution !== 'all') {
        results = results.filter((t) => t.resolution.includes(filters.resolution));
      }

      // Keyword / Text query search
      if (filters.query) {
        const q = filters.query.toLowerCase().trim();
        results = results.filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.categoryName.toLowerCase().includes(q) ||
            t.subcategoryName.toLowerCase().includes(q) ||
            t.keywords.some((k) => k.toLowerCase().includes(q))
        );
      }

      // Sorting
      if (filters.sortBy === 'popular') {
        results.sort((a, b) => b.views - a.views);
      } else if (filters.sortBy === 'downloads') {
        results.sort((a, b) => b.downloads - a.downloads);
      } else if (filters.sortBy === 'price_asc') {
        results.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === 'price_desc') {
        results.sort((a, b) => b.price - a.price);
      }

      return results;
    }
  },

  async getTemplateById(id) {
    try {
      const response = await apiClient.get(`/templates/${id}`);
      return response.data;
    } catch {
      await delay(200);
      const found = TEMPLATES_DATA.find((t) => t.id === id);
      if (!found) throw new Error('Template not found');
      return found;
    }
  },

  async getRelatedTemplates(templateId, category) {
    try {
      const response = await apiClient.get(`/templates/${templateId}/related`);
      return response.data;
    } catch {
      await delay(200);
      return TEMPLATES_DATA.filter((t) => t.id !== templateId && t.category === category).slice(0, 3);
    }
  }
};

// ==========================================
// 4. FAVORITES API
// ==========================================
export const favoriteApi = {
  getStoredFavorites() {
    const saved = localStorage.getItem('aura_favorites');
    return saved ? JSON.parse(saved) : ['tpl_wed_001'];
  },

  saveFavorites(favorites) {
    localStorage.setItem('aura_favorites', JSON.stringify(favorites));
  },

  async toggleFavorite(templateId) {
    try {
      const response = await apiClient.post(`/favorites/${templateId}/toggle`);
      return response.data;
    } catch {
      const current = this.getStoredFavorites();
      const exists = current.includes(templateId);
      const updated = exists ? current.filter((id) => id !== templateId) : [...current, templateId];
      this.saveFavorites(updated);
      return { success: true, isFavorite: !exists, favorites: updated };
    }
  }
};

// ==========================================
// 5. RECENTLY VIEWED API
// ==========================================
export const recentlyViewedApi = {
  getStored() {
    const saved = localStorage.getItem('aura_recently_viewed');
    return saved ? JSON.parse(saved) : ['tpl_wed_001', 'tpl_logo_001'];
  },

  track(templateId) {
    const current = this.getStored().filter((id) => id !== templateId);
    current.unshift(templateId);
    const capped = current.slice(0, 10);
    localStorage.setItem('aura_recently_viewed', JSON.stringify(capped));
    return capped;
  }
};

// ==========================================
// 6. PURCHASES & PAYMENT API (NO SUBSCRIPTIONS)
// ==========================================
export const purchaseApi = {
  getStoredPurchases() {
    const saved = localStorage.getItem('aura_user_purchases');
    return saved ? JSON.parse(saved) : INITIAL_USER_PURCHASES;
  },

  async createPurchaseOrder(templateId) {
    try {
      const response = await apiClient.post('/purchases/order', { templateId });
      return response.data;
    } catch {
      await delay(500);
      const tpl = TEMPLATES_DATA.find((t) => t.id === templateId);
      return {
        orderId: 'ORD_' + Date.now(),
        templateId,
        amount: tpl ? tpl.price : 499,
        currency: '₹',
        keyId: 'rzp_test_simulated'
      };
    }
  },

  async verifyPayment(orderId, paymentDetails) {
    try {
      const response = await apiClient.post('/purchases/verify', { orderId, ...paymentDetails });
      return response.data;
    } catch {
      await delay(700);
      const tpl = TEMPLATES_DATA.find((t) => t.id === paymentDetails.templateId);
      const newPurchase = {
        id: 'pur_' + Date.now(),
        templateId: paymentDetails.templateId,
        templateTitle: tpl ? tpl.title : 'Animation Video Master',
        categoryName: tpl ? tpl.categoryName : 'Celebration',
        thumbnail: tpl ? tpl.thumbnail : '',
        amount: tpl ? tpl.price : 499,
        currency: '₹',
        purchaseDate: new Date().toISOString().split('T')[0],
        transactionId: 'TXN_' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        paymentMethod: paymentDetails.paymentMethod || 'UPI / Instant Pay',
        paymentStatus: 'COMPLETED',
        accessStatus: 'ACTIVE',
        invoiceUrl: '#'
      };

      const purchases = this.getStoredPurchases();
      purchases.unshift(newPurchase);
      localStorage.setItem('aura_user_purchases', JSON.stringify(purchases));

      return { success: true, purchase: newPurchase };
    }
  },

  async getPurchases() {
    try {
      const response = await apiClient.get('/purchases');
      return response.data;
    } catch {
      return this.getStoredPurchases();
    }
  }
};

// ==========================================
// 7. VIDEO GENERATION & VAULT API
// ==========================================
export const renderApi = {
  getStoredVideos() {
    const saved = localStorage.getItem('aura_user_videos');
    return saved ? JSON.parse(saved) : INITIAL_USER_VIDEOS;
  },

  saveVideos(videos) {
    localStorage.setItem('aura_user_videos', JSON.stringify(videos));
  },

  async requestRender({ templateId, changes, isTestPreview = false }) {
    try {
      const response = await apiClient.post(`/templates/${templateId}/render`, {
        templateId,
        changes,
        isTestPreview
      });
      return response.data;
    } catch {
      await delay(1200);
      const tpl = TEMPLATES_DATA.find((t) => t.id === templateId);
      const newVideo = {
        id: 'vid_' + Date.now(),
        templateId,
        templateName: tpl ? tpl.title : 'Custom Master',
        category: tpl ? tpl.categoryName : 'Celebration',
        status: 'COMPLETED',
        isWatermarked: isTestPreview,
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        duration: tpl ? tpl.duration : '0:15',
        resolution: tpl ? tpl.resolution : '1080x1920 (FHD)',
        thumbnail: tpl ? tpl.thumbnail : '',
        videoUrl: tpl ? tpl.videoUrl : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        changes
      };

      const current = this.getStoredVideos();
      current.unshift(newVideo);
      this.saveVideos(current);

      return { success: true, video: newVideo };
    }
  },

  async deleteVideo(videoId) {
    const current = this.getStoredVideos().filter((v) => v.id !== videoId);
    this.saveVideos(current);
    return { success: true, videos: current };
  }
};
