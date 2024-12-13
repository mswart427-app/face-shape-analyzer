# Integration Guide

## Overview

This guide details how to integrate the Face Shape Analyzer into a Shopify store or other web platforms. The application is designed to be embedded as an iframe while maintaining seamless communication with the parent window.

## Shopify Integration

### 1. Embedding the Application

```html
<iframe
  src="https://face-shape-analyzer.vercel.app"
  width="100%"
  height="600px"
  frameborder="0"
  allow="camera"
></iframe>
```

### 2. Required Permissions
- Camera access
- Local storage
- Cross-origin isolation (if needed)

### 3. Content Security Policy (CSP)
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' data: https://myhairmail.com https://cdn.shopify.com blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
          }
        ],
      },
    ]
  }
}
```

## Communication Protocol

### 1. Parent-Child Communication

```typescript
// Sending messages to parent
window.parent.postMessage({
  type: 'FACE_SHAPE_RESULT',
  data: {
    shape: 'Oval',
    recommendations: []
  }
}, '*');

// Receiving messages from parent
window.addEventListener('message', (event) => {
  if (event.data.type === 'INITIALIZE') {
    // Handle initialization
  }
});
```

### 2. Event Types

#### Outgoing Events
- `FACE_SHAPE_RESULT`: Analysis results
- `ERROR`: Error information
- `READY`: Application loaded
- `ANALYSIS_START`: Analysis begun
- `ANALYSIS_COMPLETE`: Analysis finished

#### Incoming Events
- `INITIALIZE`: Setup parameters
- `RESET`: Reset application
- `UPDATE_PRODUCTS`: Update product data

## Product Integration

### 1. Product Data Format

```typescript
interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  handle: string;
  faceShapes: string[];
}

interface ProductRecommendation {
  products: Product[];
  faceShape: string;
  confidence: number;
}
```

### 2. Product Mapping

```typescript
const FACE_SHAPE_PRODUCTS = {
  'Oval': ['product-1', 'product-2'],
  'Round': ['product-3', 'product-4'],
  // ... other shapes
};
```

## Styling Integration

### 1. Theme Customization

```typescript
interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: string;
}

// Apply theme
function applyTheme(config: ThemeConfig) {
  // Update CSS variables
}
```

### 2. Responsive Design

```css
/* Breakpoint considerations */
@media (max-width: 768px) {
  .analyzer-container {
    /* Mobile styles */
  }
}
```

## Error Handling

### 1. Error Types

```typescript
enum IntegrationError {
  CAMERA_ACCESS_DENIED = 'CAMERA_ACCESS_DENIED',
  INITIALIZATION_FAILED = 'INITIALIZATION_FAILED',
  ANALYSIS_FAILED = 'ANALYSIS_FAILED',
  COMMUNICATION_ERROR = 'COMMUNICATION_ERROR'
}
```

### 2. Error Reporting

```typescript
function reportError(error: IntegrationError, details: any) {
  window.parent.postMessage({
    type: 'ERROR',
    error,
    details
  }, '*');
}
```

## Performance Considerations

### 1. Loading Strategy
- Lazy loading of heavy components
- Progressive enhancement
- Resource prioritization

### 2. Memory Management
- Proper cleanup of resources
- Stream termination
- Event listener cleanup

### 3. Network Optimization
- Asset caching
- CDN usage
- Compression

## Security Considerations

### 1. Data Handling
- Secure communication
- Data sanitization
- Input validation

### 2. Permission Management
- Camera access
- Storage access
- Cross-origin policies

### 3. Content Security
- CSP configuration
- Frame ancestors
- Resource policies

## Testing Integration

### 1. Test Cases
- Iframe loading
- Communication flow
- Error scenarios
- Mobile compatibility

### 2. Testing Tools
```bash
# Integration test command
npm run test:integration

# E2E test command
npm run test:e2e
```

## Deployment

### 1. Production Deployment
```bash
# Build command
npm run build

# Deploy command
npm run deploy
```

### 2. Environment Variables
```env
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Troubleshooting

### Common Issues

1. Camera Access
   - Check iframe permissions
   - Verify HTTPS
   - Check CSP headers

2. Communication
   - Verify origin settings
   - Check message format
   - Monitor console errors

3. Performance
   - Monitor loading times
   - Check resource usage
   - Verify cleanup
