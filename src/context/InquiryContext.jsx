import React, { createContext, useContext, useState, useEffect } from 'react';

const InquiryContext = createContext();

export const InquiryProvider = ({ children }) => {
  const [basket, setBasket] = useState(() => {
    try {
      const saved = localStorage.getItem('kadalidhaara_rfq_basket');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load RFQ basket from localStorage', e);
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [lineSheetData, setLineSheetData] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('kadalidhaara_rfq_basket', JSON.stringify(basket));
    } catch (e) {
      console.error('Failed to save RFQ basket to localStorage', e);
    }
  }, [basket]);

  const addToBasket = (product, quantity = 50, customizationNote = '') => {
    setBasket(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity, customizationNote: customizationNote || item.customizationNote }
            : item
        );
      }
      return [...prev, { ...product, quantity, customizationNote }];
    });
    setIsDrawerOpen(true);
  };

  const removeFromBasket = (productId) => {
    setBasket(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromBasket(productId);
      return;
    }
    setBasket(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const updateNote = (productId, customizationNote) => {
    setBasket(prev =>
      prev.map(item => (item.id === productId ? { ...item, customizationNote } : item))
    );
  };

  const clearBasket = () => {
    setBasket([]);
  };

  const totalItemsCount = basket.reduce((acc, item) => acc + (item.quantity > 0 ? 1 : 0), 0);

  return (
    <InquiryContext.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        updateQuantity,
        updateNote,
        clearBasket,
        totalItemsCount,
        isDrawerOpen,
        setIsDrawerOpen,
        quickViewProduct,
        setQuickViewProduct,
        lineSheetData,
        setLineSheetData
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
};
