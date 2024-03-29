import { modalState } from '@/atom/modalAtom';
import { useRecoilState } from 'recoil';
import ModalCommon from './Common/ModalCommon';
import { CameraIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';

export default function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedFile(null);
  };

  const handleClickCamera = () => {
    filePickerRef.current?.click();
  };

  const addImageToPost = (event) => {
    if (!event.target.files[0]) return;
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };

  const removeImageFromPost = () => {
    if (!selectedFile) return;
    URL.revokeObjectURL(selectedFile);
    setSelectedFile(null);
  };

  return (
    <div>
      <h1>Upload Modal</h1>
      {open && (
        <ModalCommon open={open} onClose={handleCloseModal}>
          <div className='flex flex-col justify-center items-center h-full'>
            {selectedFile ? (
              <img
                onClick={removeImageFromPost}
                src={selectedFile}
                alt='uploaded-post'
                className='w-full max-h-[250px] object-cover cursor-pointer'
              />
            ) : (
              <CameraIcon
                onClick={handleClickCamera}
                className='cursor-pointer h-14 w-14 bg-red-200 p-2 rounded-full border-2 text-red-500'
              />
            )}
            <input
              type='file'
              hidden
              ref={filePickerRef}
              onChange={addImageToPost}
            />
            <input
              type='text'
              maxLength='150'
              placeholder='Please enter your caption...'
              className='my-4 px-4 border-none text-center w-full focus:outline-none'
            />
            <button
              disabled
              className='mt-2 w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100'
            >
              Upload Post
            </button>
          </div>
        </ModalCommon>
      )}
    </div>
  );
}
