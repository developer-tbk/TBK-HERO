import React, { useState, useRef, useEffect } from 'react';
import { Upload, Image as ImageIcon, FileText, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const CloudinaryUpload = ({ onUploadSuccess, currentImage, disabled = false }) => {
  const { cloudinarySettings } = useData();
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(currentImage || '');
  const fileInputRef = useRef(null);

  // Sync preview when currentImage changes from parent (e.g., reset actions)
  useEffect(() => {
    setPreview(currentImage || '');
  }, [currentImage]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (disabled) return;
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    if (disabled) return;
    fileInputRef.current.click();
  };

  const uploadFile = async (file) => {
    // Validate file type (allow both standard image types and PDF documents)
    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (!isImage && !isPdf) {
      setError('Please upload a valid image file (PNG, JPG, WEBP) or a PDF document.');
      return;
    }

    setUploading(true);
    setProgress(15);
    setError(null);

    if (isImage) {
      // Create local Base64 preview instantly for images
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // For PDFs, use a luxury visual representation preview during the upload phase
      setPreview('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1000&auto=format&fit=crop');
    }

    const cloudName = cloudinarySettings.cloudName;
    const uploadPreset = cloudinarySettings.uploadPreset;

    if (!cloudName || !uploadPreset) {
      setError('Cloudinary integration is not configured. Please log in as Admin, navigate to "API Integrations", and input your Cloud Name and Upload Preset.');
      setUploading(false);
      return;
    }

    // Direct HTTP POST to Cloudinary endpoint
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      setProgress(40);
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      setProgress(80);

      if (!response.ok) {
        throw new Error('Upload failed. Please verify that your Cloud Name and Upload Preset are correct in your Admin settings.');
      }

      const data = await response.json();
      setProgress(100);
      setUploading(false);
      onUploadSuccess(data.secure_url);
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      setError(err.message || 'Failed to upload image to Cloudinary.');
      setUploading(false);
    }
  };

  const isCurrentPdf = preview.toLowerCase().split('?')[0].endsWith('.pdf');

  return (
    <div className="space-y-4">
      {/* Drop Zone Box */}
      <div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[160px] overflow-hidden group ${
          disabled
            ? 'border-outline-variant/30 bg-surface-low/10 cursor-not-allowed'
            : dragActive 
              ? 'border-secondary bg-surface-high/30 cursor-pointer' 
              : preview 
                ? 'border-outline/40 bg-surface-low/30 hover:border-secondary/40 cursor-pointer' 
                : 'border-outline-variant/60 bg-background hover:border-secondary/40 cursor-pointer'
        }`}
      >
        <input 
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          onChange={handleChange}
          className="hidden"
        />

        {preview ? (
          // Preview Card (Automatically renders first page of PDF using Cloudinary conversion)
          <div className="absolute inset-0 z-0">
            <img 
              src={
                isCurrentPdf && preview.includes('res.cloudinary.com')
                  ? preview.replace(/\.pdf($|\?)/, '.jpg$1')
                  : preview
              } 
              alt="Culinary preview" 
              className="w-full h-full object-cover brightness-[0.4]"
            />
          </div>
        ) : null}

        {/* Content indicators overlay */}
        <div className="relative z-10 space-y-2 flex flex-col items-center">
          {disabled ? (
            <>
              <svg className="w-8 h-8 text-on-surface-variant/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-sm font-semibold text-on-surface-variant/70">Uploader Disabled</p>
              <p className="text-[10px] text-on-surface-variant/50 max-w-[250px]">
                Administrator has locked operations editing permissions.
              </p>
            </>
          ) : uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-secondary animate-spin" />
              <p className="text-sm font-semibold text-white">Uploading menu document...</p>
              <div className="w-40 bg-background/60 rounded-full h-2 mt-1 border border-outline-variant/45 overflow-hidden">
                <div 
                  className="bg-secondary h-full transition-all duration-300 rounded-full" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[10px] text-on-surface-variant font-light">{progress}% Complete</p>
            </>
          ) : (
            <>
              {preview ? (
                isCurrentPdf ? (
                  <FileText className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform duration-300" />
                )
              ) : (
                <Upload className="w-8 h-8 text-outline group-hover:scale-110 transition-transform duration-300" />
              )}
              <p className="text-sm font-semibold text-white">
                {preview ? (isCurrentPdf ? 'Change Menu PDF Document' : 'Change Menu Card Image') : 'Upload Menu Card / PDF'}
              </p>
              <p className="text-xs text-on-surface-variant font-light max-w-[250px]">
                Drag and drop your image or <strong className="text-secondary font-medium">PDF menu</strong> here, or <span className="text-secondary font-medium">browse local files</span>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-3 bg-red-950/40 border border-red-500/50 text-red-400 rounded-lg text-xs flex items-center gap-2">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {/* Settings hint */}
      {!cloudinarySettings.cloudName || !cloudinarySettings.uploadPreset ? (
        <div className="p-3 bg-amber-950/20 border border-primary/30 rounded-xl text-[10px] text-primary/95 italic text-center flex items-center justify-center gap-2">
          <AlertCircle size={12} className="text-secondary" />
          Cloudinary is not configured. Log in as Admin to connect your account.
        </div>
      ) : (
        <div className="text-[10px] text-emerald-400/80 italic text-center flex items-center justify-center gap-1">
          <CheckCircle size={10} /> Active Cloudinary Integration: <strong>{cloudinarySettings.cloudName}</strong>
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
