import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  categoryApi,
  templateApi,
  favoriteApi,
  recentlyViewedApi,
  purchaseApi,
  renderApi
} from '../services/api';
import { useAuth } from './AuthContext';

const TemplateContext = createContext();

export function TemplateProvider({ children }) {
  const { isAuthenticated, openAuthModal } = useAuth();

  const [categories, setCategories] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [pricingFilter, setPricingFilter] = useState('all'); // 'all' | 'free' | 'premium'
  const [orientationFilter, setOrientationFilter] = useState('all'); // 'all' | '9:16' | '16:9' | '1:1'
  const [resolutionFilter, setResolutionFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'downloads' | 'price_asc' | 'price_desc'

  // User Vault State
  const [favorites, setFavorites] = useState([]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [userVideos, setUserVideos] = useState([]);

  // Load Initial Metadata
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [cats, tpls, favs, recents, userPurchases, userVids] = await Promise.all([
          categoryApi.getCategories(),
          templateApi.getTemplates(),
          favoriteApi.getStoredFavorites(),
          recentlyViewedApi.getStored(),
          purchaseApi.getPurchases(),
          renderApi.getStoredVideos()
        ]);
        setCategories(cats);
        setAllTemplates(tpls);
        setFavorites(favs);
        setRecentlyViewedIds(recents);
        setPurchases(userPurchases);
        setUserVideos(userVids);
      } catch (err) {
        console.error('Failed to initialize template catalog:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtered Templates
  const filteredTemplates = allTemplates.filter((tpl) => {
    // Category
    if (activeCategory !== 'all' && tpl.category !== activeCategory) return false;
    // Subcategory
    if (activeSubcategory !== 'all' && tpl.subcategory !== activeSubcategory) return false;
    // Pricing
    if (pricingFilter === 'free' && tpl.isPremium) return false;
    if (pricingFilter === 'premium' && !tpl.isPremium) return false;
    // Orientation
    if (orientationFilter !== 'all' && tpl.orientation !== orientationFilter) return false;
    // Resolution
    if (resolutionFilter !== 'all' && !tpl.resolution.includes(resolutionFilter)) return false;
    // Search Query (title, category name, subcategory name, keywords)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesTitle = tpl.title.toLowerCase().includes(q);
      const matchesCategory = tpl.categoryName.toLowerCase().includes(q);
      const matchesSubcategory = tpl.subcategoryName.toLowerCase().includes(q);
      const matchesKeywords = tpl.keywords.some((k) => k.toLowerCase().includes(q));
      if (!matchesTitle && !matchesCategory && !matchesSubcategory && !matchesKeywords) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.views - a.views;
    if (sortBy === 'downloads') return b.downloads - a.downloads;
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    return 0;
  });

  // Action: Toggle Favorite
  const toggleFavorite = async (templateId) => {
    if (!isAuthenticated) {
      openAuthModal('login', () => toggleFavorite(templateId));
      return;
    }
    const res = await favoriteApi.toggleFavorite(templateId);
    setFavorites(res.favorites);
  };

  const isFavorite = (templateId) => favorites.includes(templateId);

  // Action: Track Viewed
  const trackRecentlyViewed = (templateId) => {
    const updated = recentlyViewedApi.track(templateId);
    setRecentlyViewedIds(updated);
  };

  // Helper: Is Template Purchased
  const isPurchased = (templateId) => {
    return purchases.some((p) => p.templateId === templateId && p.accessStatus === 'ACTIVE');
  };

  // Action: Record Successful Purchase
  const recordPurchase = (purchaseRecord) => {
    setPurchases((prev) => [purchaseRecord, ...prev]);
  };

  // Action: Request Render
  const triggerRender = async ({ templateId, changes, isTestPreview }) => {
    const res = await renderApi.requestRender({ templateId, changes, isTestPreview });
    if (res.video) {
      setUserVideos((prev) => [res.video, ...prev]);
    }
    return res;
  };

  // Action: Delete Video
  const deleteVideo = async (videoId) => {
    await renderApi.deleteVideo(videoId);
    setUserVideos((prev) => prev.filter((v) => v.id !== videoId));
  };

  // Reset all filters
  const resetFilters = () => {
    setActiveCategory('all');
    setActiveSubcategory('all');
    setSearchQuery('');
    setPricingFilter('all');
    setOrientationFilter('all');
    setResolutionFilter('all');
    setSortBy('popular');
  };

  return (
    <TemplateContext.Provider
      value={{
        categories,
        templates: filteredTemplates,
        allTemplates,
        loading,
        // Filters
        activeCategory,
        setActiveCategory: (cat) => {
          setActiveCategory(cat);
          setActiveSubcategory('all'); // reset subcategory on category change
        },
        activeSubcategory,
        setActiveSubcategory,
        searchQuery,
        setSearchQuery,
        pricingFilter,
        setPricingFilter,
        orientationFilter,
        setOrientationFilter,
        resolutionFilter,
        setResolutionFilter,
        sortBy,
        setSortBy,
        resetFilters,
        // Favorites
        favorites,
        toggleFavorite,
        isFavorite,
        // Recently Viewed
        recentlyViewedIds,
        trackRecentlyViewed,
        // Purchases
        purchases,
        isPurchased,
        recordPurchase,
        // Videos Vault
        userVideos,
        triggerRender,
        deleteVideo
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplates() {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplates must be used within a TemplateProvider');
  }
  return context;
}
