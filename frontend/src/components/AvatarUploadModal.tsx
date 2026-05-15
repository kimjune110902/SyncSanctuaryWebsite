"use client";
import React, { useState, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (url: string) => void;
}

export default function AvatarUploadModal({ isOpen, onClose, onUploadSuccess }: Props) {
  const [imgSrc, setImgSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const onUpload = async () => {
    if (!completedCrop || !imgRef.current) return;
    setIsUploading(true);

    try {
      // Get Presigned URL
      const token = localStorage.getItem('access_token'); // Or get from auth store
      const res = await fetch('/api/v1/account/avatar/upload-url', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();

      if (res.ok && data.public_url) {
        // Here we would actually process the crop into a Blob and PUT to S3
        // Mocking the upload success for now

        // Update user profile
        const profileRes = await fetch('/api/v1/account/profile', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ avatar_url: data.public_url })
        });
        if(profileRes.ok) {
            onUploadSuccess(data.public_url);
            onClose();
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-surface w-full max-w-lg rounded-xl shadow-xl p-6 relative">
        <h2 className="text-xl font-bold mb-4">Upload a photo</h2>

        {!imgSrc ? (
           <div className="border-2 border-dashed border-border-default rounded-lg p-12 text-center">
              <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={onSelectFile} className="block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 cursor-pointer" />
           </div>
        ) : (
           <div className="flex flex-col items-center">
             <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
                circularCrop
             >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img ref={imgRef} src={imgSrc} alt="Upload" style={{ maxHeight: '60vh' }} />
             </ReactCrop>
           </div>
        )}

        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 border border-border-default rounded text-sm font-medium hover:bg-bg-muted">Cancel</button>
          <button onClick={onUpload} disabled={!completedCrop || isUploading} className="px-4 py-2 bg-brand-600 text-white rounded text-sm font-medium disabled:opacity-50">
             {isUploading ? 'Uploading...' : 'Apply'}
          </button>
        </div>
      </div>
    </div>
  );
}
