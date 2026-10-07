import React, { useState, useRef, useEffect } from 'react';
import { Camera, Image as ImageIcon, X, AlertCircle, RefreshCw, Check, Upload } from 'lucide-react';

/**
 * ProfilePhotoUploadModal Component
 * 
 * Provides two options to update profile photo:
 * 1. 📷 Take Photo (device/webcam camera with live capture, Retake & Use Photo)
 * 2. 🖼️ Choose From Device (JPG/JPEG selection with validation, Cancel & Save Photo)
 */
export function ProfilePhotoUploadModal({
  isOpen,
  onClose,
  onSavePhoto,
  currentPhotoUrl = ''
}) {
  // Views: 'options' | 'camera' | 'camera_preview' | 'device_preview'
  const [view, setView] = useState('options');
  const [errorMessage, setErrorMessage] = useState('');
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [devicePhoto, setDevicePhoto] = useState(null);
  const [isCameraStarting, setIsCameraStarting] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Stop camera stream safely
  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        try {
          track.stop();
        } catch (e) {
          console.warn('Error stopping camera track:', e);
        }
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Reset modal state on open/close
  useEffect(() => {
    if (isOpen) {
      setView('options');
      setErrorMessage('');
      setCapturedPhoto(null);
      setDevicePhoto(null);
    } else {
      stopCameraStream();
    }

    return () => {
      stopCameraStream();
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    stopCameraStream();
    setErrorMessage('');
    setView('options');
    onClose();
  };

  // Start Camera
  const startCamera = async () => {
    setErrorMessage('');
    setIsCameraStarting(true);
    setView('camera');

    // Check if mediaDevices is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsCameraStarting(false);
      setErrorMessage('Camera access is unavailable. You can choose a photo from your device instead.');
      setView('options');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 720 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = stream;
      setIsCameraStarting(false);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(err => {
          console.warn('Video play error:', err);
        });
      }
    } catch (err) {
      console.warn('Camera access denied or failed:', err);
      setIsCameraStarting(false);
      stopCameraStream();
      setErrorMessage('Camera access is unavailable. You can choose a photo from your device instead.');
      setView('options');
    }
  };

  // Take photo from active camera stream
  const handleCapturePhoto = () => {
    if (!videoRef.current) return;

    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      const videoWidth = video.videoWidth || 640;
      const videoHeight = video.videoHeight || 480;

      // Crop center square
      const size = Math.min(videoWidth, videoHeight);
      const startX = (videoWidth - size) / 2;
      const startY = (videoHeight - size) / 2;

      canvas.width = 600;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');

      // Mirror horizontally if user facing camera for natural preview
      ctx.translate(600, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, startX, startY, size, size, 0, 0, 600, 600);

      const jpegUrl = canvas.toDataURL('image/jpeg', 0.92);

      stopCameraStream();
      setCapturedPhoto(jpegUrl);
      setView('camera_preview');
    } catch (err) {
      console.error('Capture error:', err);
      setErrorMessage('Failed to capture photo. Please try again.');
    }
  };

  // Retake photo
  const handleRetake = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  // Use camera photo
  const handleUsePhoto = () => {
    if (!capturedPhoto) return;
    onSavePhoto(capturedPhoto);
    handleClose();
  };

  // Handle device file selection
  const handleDeviceFileSelect = (e) => {
    setErrorMessage('');
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = (file.name || '').toLowerCase();
    const isJpgExt = fileName.endsWith('.jpg') || fileName.endsWith('.jpeg');
    const isJpgMime = file.type === 'image/jpeg' || file.type === 'image/jpg';

    if (!isJpgExt && !isJpgMime) {
      setErrorMessage('Please select a JPG or JPEG image.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (cameraInputRef.current) cameraInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Crop & optimize to high-res square JPG
        const canvas = document.createElement('canvas');
        const size = Math.min(img.width, img.height);
        const startX = (img.width - size) / 2;
        const startY = (img.height - size) / 2;

        canvas.width = 600;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, startX, startY, size, size, 0, 0, 600, 600);

        const jpegData = canvas.toDataURL('image/jpeg', 0.92);
        setDevicePhoto(jpegData);
        setView('device_preview');
      };
      img.onerror = () => {
        // Fallback directly to file reader result
        setDevicePhoto(event.target.result);
        setView('device_preview');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Save device photo
  const handleSaveDevicePhoto = () => {
    if (!devicePhoto) return;
    onSavePhoto(devicePhoto);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-md bg-[#0d1322] border border-purple-500/30 rounded-3xl shadow-2xl p-6 text-slate-100 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-white">Profile Photo</h3>
              <p className="text-xs text-slate-400">Update your profile picture</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert Message */}
        {errorMessage && (
          <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium leading-relaxed">
              {errorMessage}
            </div>
          </div>
        )}

        {/* Hidden File Inputs */}
        <input
          type="file"
          ref={fileInputRef}
          accept=".jpg,.jpeg,image/jpeg"
          onChange={handleDeviceFileSelect}
          className="hidden"
        />
        {/* Mobile Camera fallback input */}
        <input
          type="file"
          ref={cameraInputRef}
          accept=".jpg,.jpeg,image/jpeg"
          capture="user"
          onChange={handleDeviceFileSelect}
          className="hidden"
        />

        {/* VIEW 1: INITIAL TWO OPTIONS */}
        {view === 'options' && (
          <div className="py-6 space-y-4">
            <p className="text-xs text-slate-300 text-center">
              Choose how you want to upload your profile photo:
            </p>

            <div className="grid grid-cols-1 gap-3.5">
              {/* Option 1: Take Photo */}
              <button
                type="button"
                onClick={startCamera}
                className="w-full p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-purple-500/40 flex items-center gap-4 transition-all group text-left shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform shrink-0">
                  <Camera className="w-6 h-6 text-purple-300" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                    <span>📷 Take Photo</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Use your device camera to take a photo
                  </div>
                </div>
              </button>

              {/* Option 2: Choose From Device */}
              <button
                type="button"
                onClick={() => {
                  setErrorMessage('');
                  if (fileInputRef.current) fileInputRef.current.click();
                }}
                className="w-full p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-cyan-500/40 flex items-center gap-4 transition-all group text-left shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-600/20 to-emerald-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                  <ImageIcon className="w-6 h-6 text-cyan-300" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    <span>🖼️ Choose From Device</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Select a JPG or JPEG image from your device
                  </div>
                </div>
              </button>
            </div>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-slate-400">
                Supported formats: <strong className="text-slate-300">JPG / JPEG</strong>
              </span>
            </div>
          </div>
        )}

        {/* VIEW 2: CAMERA CAPTURE */}
        {view === 'camera' && (
          <div className="py-4 space-y-4">
            <div className="relative w-full aspect-square max-w-[280px] mx-auto rounded-3xl overflow-hidden bg-black border-2 border-purple-500/40 shadow-inner flex items-center justify-center">
              {isCameraStarting ? (
                <div className="flex flex-col items-center gap-2 text-slate-400 text-xs">
                  <RefreshCw className="w-6 h-6 animate-spin text-purple-400" />
                  <span>Starting camera...</span>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover -scale-x-100"
                />
              )}

              {/* Viewfinder Circle Overlay */}
              <div className="absolute inset-4 rounded-full border-2 border-dashed border-white/40 pointer-events-none" />
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  stopCameraStream();
                  setView('options');
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCapturePhoto}
                disabled={isCameraStarting}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all hover:scale-102 disabled:opacity-50"
              >
                <Camera className="w-4 h-4" />
                <span>Capture Photo</span>
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: CAMERA CAPTURE PREVIEW */}
        {view === 'camera_preview' && (
          <div className="py-4 space-y-4">
            <p className="text-xs text-slate-300 text-center font-medium">Photo Preview</p>

            <div className="w-48 h-48 mx-auto rounded-3xl overflow-hidden ring-4 ring-purple-500/40 shadow-2xl bg-black">
              {capturedPhoto && (
                <img
                  src={capturedPhoto}
                  alt="Captured Preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Exactly: Retake / Use Photo */}
            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={handleRetake}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 border border-white/15 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>

              <button
                type="button"
                onClick={handleUsePhoto}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-102"
              >
                <Check className="w-4 h-4" />
                <span>Use Photo</span>
              </button>
            </div>
          </div>
        )}

        {/* VIEW 4: DEVICE PHOTO PREVIEW */}
        {view === 'device_preview' && (
          <div className="py-4 space-y-4">
            <p className="text-xs text-slate-300 text-center font-medium">Photo Preview</p>

            <div className="w-48 h-48 mx-auto rounded-3xl overflow-hidden ring-4 ring-cyan-500/40 shadow-2xl bg-black">
              {devicePhoto && (
                <img
                  src={devicePhoto}
                  alt="Device Selected Preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Exactly: Cancel / Save Photo */}
            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  setDevicePhoto(null);
                  setView('options');
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 border border-white/15 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveDevicePhoto}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white flex items-center gap-2 shadow-lg shadow-cyan-600/30 transition-all hover:scale-102"
              >
                <Check className="w-4 h-4" />
                <span>Save Photo</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePhotoUploadModal;
