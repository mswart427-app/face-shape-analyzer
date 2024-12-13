# Troubleshooting Guide

## Common Issues and Solutions

### Camera Access Issues

#### 1. "Video element not ready" Error
**Symptoms:**
- Error message appears when clicking "Take Photo"
- Camera doesn't initialize

**Solutions:**
1. Check component mounting:
```typescript
useEffect(() => {
  // Ensure video element is mounted
  if (videoRef.current) {
    // Initialize camera
  }
}, []);
```

2. Verify camera permissions:
```typescript
async function checkCameraPermissions() {
  try {
    const result = await navigator.permissions.query({ name: 'camera' });
    return result.state;
  } catch (error) {
    console.error('Permission check failed:', error);
    return 'denied';
  }
}
```

#### 2. Mobile Camera Not Working
**Symptoms:**
- Camera works on desktop but not mobile
- Black screen on mobile devices

**Solutions:**
1. Check video constraints:
```typescript
const constraints = {
  video: {
    facingMode: "user",
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 720, max: 1080 }
  }
};
```

2. Verify playsinline attribute:
```html
<video
  playsinline
  autoplay
  muted
/>
```

### Face Detection Issues

#### 1. No Face Detected
**Symptoms:**
- Analysis fails to find face
- "No face detected" error

**Solutions:**
1. Check lighting conditions
2. Verify image quality
3. Adjust detection parameters:
```typescript
const detectorConfig = {
  maxFaces: 1,
  minFaceSize: 100,
  scoreThreshold: 0.5
};
```

#### 2. Incorrect Measurements
**Symptoms:**
- Wrong face shape results
- Inconsistent measurements

**Solutions:**
1. Calibrate measurement ratios
2. Adjust landmark positions
3. Update threshold values

### Performance Issues

#### 1. Slow Loading
**Symptoms:**
- Long initialization time
- Delayed camera start

**Solutions:**
1. Implement lazy loading:
```typescript
const FaceDetector = dynamic(() => import('../components/FaceDetector'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});
```

2. Optimize resource loading:
```typescript
// Preload TensorFlow.js
const preloadTensorFlow = () => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'script';
  link.href = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs';
  document.head.appendChild(link);
};
```

#### 2. Memory Leaks
**Symptoms:**
- Increasing memory usage
- Browser slowdown

**Solutions:**
1. Proper cleanup:
```typescript
useEffect(() => {
  return () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };
}, []);
```

### Integration Issues

#### 1. Iframe Communication
**Symptoms:**
- Results not showing in parent window
- Communication errors

**Solutions:**
1. Check message passing:
```typescript
// Sender
window.parent.postMessage({
  type: 'FACE_SHAPE_RESULT',
  data: result
}, '*');

// Receiver
window.addEventListener('message', (event) => {
  if (event.data.type === 'FACE_SHAPE_RESULT') {
    handleResult(event.data);
  }
});
```

#### 2. CSP Violations
**Symptoms:**
- Resources blocked
- Console security errors

**Solutions:**
1. Update CSP headers:
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
};
```

### Mobile-Specific Issues

#### 1. Orientation Problems
**Symptoms:**
- Camera preview flipped
- Incorrect orientation

**Solutions:**
1. Handle orientation changes:
```typescript
window.addEventListener('orientationchange', () => {
  // Reinitialize camera with correct orientation
  handleOrientationChange();
});
```

#### 2. Touch Interaction Issues
**Symptoms:**
- Buttons not responding
- Gestures not working

**Solutions:**
1. Implement touch handlers:
```typescript
const handleTouch = (event: TouchEvent) => {
  event.preventDefault();
  // Handle touch interaction
};
```

## Debugging Tools

### 1. Console Logging
```typescript
const DEBUG = process.env.NODE_ENV === 'development';

function debug(...args: any[]) {
  if (DEBUG) {
    console.log('[Face Analyzer]', ...args);
  }
}
```

### 2. Performance Monitoring
```typescript
function measurePerformance(label: string) {
  performance.mark(`${label}-start`);
  return () => {
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
  };
}
```

## Error Recovery

### 1. Automatic Retry
```typescript
async function retryOperation(
  operation: () => Promise<any>,
  maxRetries = 3,
  delay = 1000
) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

### 2. Graceful Degradation
```typescript
function fallbackToUpload() {
  setIsCameraActive(false);
  setError('Camera not available. Please upload a photo instead.');
}
```

## Support Information

### 1. Browser Support
- Chrome 83+
- Safari 14.5+
- Firefox 90+
- Edge 88+

### 2. Device Requirements
- Camera access
- WebGL support
- Sufficient memory
- Stable internet connection

### 3. Contact Information
- Technical Support: support@myhairmail.com
- Bug Reports: bugs@myhairmail.com
- Feature Requests: features@myhairmail.com
