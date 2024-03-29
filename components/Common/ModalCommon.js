import { createPortal } from 'react-dom';

export default function ModalCommon({ children, onClose, open }) {
  const handleClickContent = (e) => {
    e.stopPropagation();
  };

  return createPortal(
    <div
      className={`w-screen h-screen fixed bg-white/50 ${
        open ? 'block' : 'hidden'
      }`}
      onClick={onClose}
    >
      <div
        onClick={handleClickContent}
        className='max-w-lg w-[90%] h-[300px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 rounded-md shadow-md'
      >
        {children}
      </div>
    </div>,
    document.getElementById('modal-portal')
  );
}
