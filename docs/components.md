# Components Documentation

## Core Components

### UploadSection Component

The main component handling photo upload and camera functionality.

```typescript
// Location: src/components/UploadSection.tsx

interface Props {
  // No props required
}

export function UploadSection() {
  // State management for photo upload and analysis
}
```

#### Key Features
1. **Photo Upload**
   - Direct file upload
   - Camera integration
   - Image preview
   - Analysis trigger

2. **Camera Handling**
   - Mobile-optimized
   - Front camera preference
   - Error handling
   - Stream management

3. **State Management**
   ```typescript
   const [analyzing, setAnalyzing] = useState(false);
   const [faceShape, setFaceShape] = useState<FaceShape | null>(null);
   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
   const [isCameraActive, setIsCameraActive] = useState(false);
   ```

4. **Camera Implementation Details**
   ```typescript
   const handleTakePhoto = async () => {
     // Camera initialization
     // Stream handling
     // Error management
   };
   ```

### FaceShapeCard Component

Displays face shape information and recommendations.

```typescript
// Location: src/components/FaceShapeCard.tsx

interface Props {
  shape: string;
  description: string;
  imageUrl: string;
  characteristics: string[];
}

export function FaceShapeCard(props: Props) {
  // Render face shape information
}
```

## Helper Components

### Loading States
- Analysis progress indicator
- Model loading state
- Camera initialization state

### Error Displays
- Camera access errors
- Face detection errors
- Upload errors

## Shared Utilities

### Face Detection

```typescript
// Location: src/lib/faceDetection.ts

export async function initializeDetector() {
  // Initialize TensorFlow.js detector
}

export function drawFaceLandmarks(ctx: CanvasRenderingContext2D, landmarks: any[]) {
  // Draw facial landmarks on canvas
}
```

### Face Shape Measurements

```typescript
// Location: src/lib/faceShapeMeasurements.ts

export function calculateFaceShape(landmarks: any[]): FaceShape {
  // Calculate face measurements
  // Determine face shape
}
```

## State Management

### Component State
- Local state for UI components
- React hooks for state management
- Proper cleanup and effect handling

### Application State
- Face detection model state
- Analysis results
- Error states

## Styling

### Tailwind Classes
- Responsive design classes
- Component-specific styles
- Utility classes

### Custom Styles
- Camera preview styling
- Animation effects
- Mobile-specific adjustments

## Event Handling

### User Interactions
- Button clicks
- File uploads
- Camera permissions

### System Events
- Window resize
- Device orientation
- Focus/blur events

## Error Boundaries

### Implementation
```typescript
class ErrorBoundary extends React.Component {
  // Error catching and handling
}
```

### Error Types
1. Runtime Errors
   - Component crashes
   - Rendering failures
   - State updates

2. Network Errors
   - Image loading
   - Model loading
   - API calls

## Performance Considerations

### Component Optimization
- Memoization
- Lazy loading
- Code splitting

### Resource Management
- Image optimization
- Stream cleanup
- Memory management

## Testing

### Component Tests
- Render testing
- User interaction
- State management

### Integration Tests
- Camera functionality
- Face detection
- Error handling

## Accessibility

### ARIA Labels
- Button labels
- Error messages
- Status updates

### Keyboard Navigation
- Focus management
- Tab order
- Keyboard shortcuts

## Mobile Considerations

### Responsive Design
- Viewport handling
- Touch interactions
- Device orientation

### Camera Handling
- Permission management
- Stream optimization
- Error recovery

## Integration Points

### External Services
- TensorFlow.js
- Shopify API
- Analytics

### Event Communication
- Parent window messaging
- iframe communication
- State synchronization
