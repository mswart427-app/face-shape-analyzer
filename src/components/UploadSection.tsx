import React, { useRef, useState } from 'react';
import { Upload, Camera, ArrowRight, X } from 'lucide-react';
import { initializeDetector, drawFaceLandmarks } from '@/lib/faceDetection';
import { calculateFaceShape } from '@/lib/faceShapeMeasurements';
import { FACE_SHAPE_DESCRIPTIONS, FaceShape } from '@/lib/faceShapeDefinitions';

export function UploadSection() {
  const [analyzing, setAnalyzing] = useState(false);
  const [faceShape, setFaceShape] = useState<FaceShape | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [readyToAnalyze, setReadyToAnalyze] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [model, setModel] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const loadModel = async () => {
      try {
        const detector = await initializeDetector();
        setModel(detector);
      } catch (error) {
        console.error('Error loading model:', error);
        setError('Failed to load face detection model');
      }
    };
    loadModel();
  }, []);

  const handleFileUpload = async (file: File) => {
    setFaceShape(null);
    setError(null);
    setReadyToAnalyze(false);
    
    try {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      
      if (imageRef.current) {
        imageRef.current.src = imageUrl;
        await new Promise((resolve) => {
          if (imageRef.current) {
            imageRef.current.onload = resolve;
          }
        });
        setReadyToAnalyze(true);
      }
    } catch (error) {
      console.error('Error loading image:', error);
      setError('Error loading image');
    }
  };

  const analyzeFaceShape = async () => {
    if (!model || !imageRef.current || !canvasRef.current) {
      setError('Analysis tools not ready');
      return;
    }

    setAnalyzing(true);
    setError(null);
    
    try {
      console.log('Starting face detection...');
      const predictions = await model.estimateFaces(imageRef.current, {
        flipHorizontal: false,
        staticImageMode: true
      });

      console.log('Predictions:', predictions);

      if (predictions && predictions.length > 0) {
        const keypoints = predictions[0].keypoints;
        if (keypoints && keypoints.length > 0) {
          const shape = calculateFaceShape(keypoints);
          setFaceShape(shape);
          
          if (canvasRef.current) {
            canvasRef.current.width = imageRef.current.width;
            canvasRef.current.height = imageRef.current.height;
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
              ctx.drawImage(imageRef.current, 0, 0);
              drawFaceLandmarks(ctx, keypoints);
            }
          }
        } else {
          setError('No facial features detected');
        }
      } else {
        setError('No face detected in the image');
      }
    } catch (error) {
      console.error('Error analyzing face:', error);
      setError('Error analyzing face');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleTakePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsCameraActive(true);
        setError(null);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setError('Failed to access camera');
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the video frame to the canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        
        // Convert the canvas to a blob
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
            handleFileUpload(file);
            
            // Stop the camera stream
            const stream = video.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            setIsCameraActive(false);
          }
        }, 'image/jpeg');
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Your Photo</h2>
            <p className="text-gray-600">
              Take or upload a front-facing photo to determine your face shape
            </p>
          </div>
          
          {!isCameraActive ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={handleUploadClick}
                className="flex items-center justify-center gap-3 p-4 border-2 border-dashed border-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                disabled={analyzing}
              >
                <Upload className="w-6 h-6 text-blue-500" />
                <span className="font-medium text-blue-500">
                  {analyzing ? 'Analyzing...' : 'Upload Photo'}
                </span>
              </button>
              
              <button 
                onClick={handleTakePhoto}
                className="flex items-center justify-center gap-3 p-4 border-2 border-dashed border-green-500 rounded-lg hover:bg-green-50 transition-colors"
                disabled={analyzing}
              >
                <Camera className="w-6 h-6 text-green-500" />
                <span className="font-medium text-green-500">Take Photo</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  onPlay={() => {
                    console.log('Video stream started');
                    if (videoRef.current) {
                      videoRef.current.play().catch(error => {
                        console.error('Error playing video:', error);
                        setError('Failed to start video stream');
                      });
                    }
                  }}
                  className="w-full rounded-lg"
                />
                <button
                  onClick={stopCamera}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={capturePhoto}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Camera className="w-5 h-5" />
                Capture Photo
              </button>
            </div>
          )}

          {error && (
            <div className="text-red-500 text-center">
              {error}
            </div>
          )}

          {analyzing && (
            <div className="text-center text-blue-500">
              Analyzing your photo...
            </div>
          )}

          {uploadedImage && (
            <div className="relative mt-6">
              <img
                src={uploadedImage}
                alt="Uploaded face"
                className="w-full rounded-lg"
                style={{ display: 'block' }}
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
                style={{ pointerEvents: 'none' }}
              />
            </div>
          )}

          {readyToAnalyze && !analyzing && !faceShape && (
            <button
              onClick={analyzeFaceShape}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Analyze Face Shape
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {faceShape && FACE_SHAPE_DESCRIPTIONS[faceShape] && (
            <div className="mt-6 space-y-6">
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Your Personalized Style Report
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">Face Shape</h4>
                    <p className="text-blue-900">{faceShape}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">Description</h4>
                    <p className="text-blue-900">{FACE_SHAPE_DESCRIPTIONS[faceShape].description}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">Characteristics</h4>
                    <ul className="list-disc list-inside text-blue-900">
                      {FACE_SHAPE_DESCRIPTIONS[faceShape].characteristics.map((char, index) => (
                        <li key={index}>{char}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">Recommended Styles</h4>
                    <ul className="list-disc list-inside text-blue-900">
                      {FACE_SHAPE_DESCRIPTIONS[faceShape].bestStyles.map((style, index) => (
                        <li key={index}>{style}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">Styles to Avoid</h4>
                    <ul className="list-disc list-inside text-blue-900">
                      {FACE_SHAPE_DESCRIPTIONS[faceShape].avoidStyles.map((style, index) => (
                        <li key={index}>{style}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">Recommended Products</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {Object.entries(FACE_SHAPE_DESCRIPTIONS[faceShape].styleImages).map(([key, image]) => (
                        <a
                          key={key}
                          href={image.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                        >
                          <img
                            src={image.imageUrl}
                            alt={image.productName}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h5 className="font-semibold text-gray-900 mb-1">{image.productName}</h5>
                            <p className="text-gray-600 text-sm mb-2">{image.description}</p>
                            {image.price && (
                              <p className="text-blue-600 font-semibold">{image.price}</p>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-sm text-gray-500 text-center">
            Your photo will not be stored - analysis happens instantly in your browser
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
          />

          <img
            ref={imageRef}
            className="hidden"
            alt="Hidden face"
            crossOrigin="anonymous"
          />
        </div>
      </div>
    </div>
  );
}
