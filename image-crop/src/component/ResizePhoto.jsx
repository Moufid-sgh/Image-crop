import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './Utils';



const ResizePhoto = () => {

 const img = "https://images.pexels.com/photos/17742455/pexels-photo-17742455/free-photo-of-femme-visage-portrait-cheveux-longs.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);



  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(img, croppedAreaPixels, zoom);
      const imgURL =  URL.createObjectURL(croppedImage)
      console.log('donee', { imgURL });
      setCroppedImage(imgURL);
    } catch (e) {
      console.error(e);
      console.log('no files');
    }
  }, [croppedAreaPixels, zoom]);

  const onClose = useCallback((e) => {
    e.preventDefault();
    setCroppedImage(null);
  }, [])

  return (
    <div>
        <div className='absolute top-10 w-[50%] h-[80%] border-2 border-cyan-950'>
          <div className="absolute top-0 left-0 right-0 bottom-16 border-2">
            <Cropper
              image={img}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onZoomChange={onZoomChange}
              zoomSpeed={0.1}
              crossorigin='anonymous'
            />
          </div>

          <div className='absolute bottom-2 flex items-center justify-between w-full px-4'>
            <p></p>

            <div className='text-center'>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(e.target.value)}
              className="w-40 h-2 cursor-pointer"
            />
            <p>zoom</p>
            </div>
        

          <button onClick={showCroppedImage}
            className='px-6 py-1.5 border border-blue text-slate-50 bg-indigo-600 rounded-md hover:opacity-70 transition-all duration-500'>
            Done
          </button>
          </div>
        </div>
        
       {croppedImage && <div className='absolute right-6 top-10 border-2 border-cyan-950'>
          <img src={croppedImage} alt='img' />
          <button onClick={onClose}
                  className='bg-red-500 mt-5 px-4 rounded-sm'>
            Close
          </button>
        </div>}
        </div>
  )
}

export default ResizePhoto