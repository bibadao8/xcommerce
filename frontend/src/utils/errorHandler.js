// Error handler utility for DOM operations
export const safeDOMOperation = (operation, fallback = null) => {
  try {
    return operation();
  } catch (error) {
    console.warn('DOM operation failed:', error.message);
    return fallback;
  }
};

// Safe element selector with null check
export const safeGetElement = (selector, context = document) => {
  try {
    const element = context.querySelector(selector);
    return element || null;
  } catch (error) {
    console.warn(`Failed to get element with selector: ${selector}`, error.message);
    return null;
  }
};

// Safe event listener addition
export const safeAddEventListener = (element, event, handler, options) => {
  if (!element) {
    console.warn('Cannot add event listener: element is null');
    return false;
  }
  
  try {
    element.addEventListener(event, handler, options);
    return true;
  } catch (error) {
    console.warn('Failed to add event listener:', error.message);
    return false;
  }
};

// Global error handler for uncaught errors
export const setupGlobalErrorHandler = () => {
  window.addEventListener('error', (event) => {
    // Filter out errors from external scripts
    if (event.filename && (
      event.filename.includes('share-modal.js') ||
      event.filename.includes('sharebx.js') ||
      event.filename.includes('css.js') ||
      event.filename.includes('chrome-extension')
    )) {
      event.preventDefault();
      console.warn('External script error suppressed:', event.message);
      return false;
    }
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.warn('Unhandled promise rejection:', event.reason);
    event.preventDefault();
  });
}; 