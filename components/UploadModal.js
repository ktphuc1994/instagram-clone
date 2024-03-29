import { createPortal } from 'react-dom';
import { modalState } from '@/atom/modalAtom';
import { useRecoilState } from 'recoil';
import ModalCommon from './Common/ModalCommon';

export default function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div>
      <h1>Upload Modal</h1>
      {open && (
        <ModalCommon open={open} onClose={() => setOpen(false)}>
          <div className='flex flex-col justify-center items-center h-full'>
            <h1>Modal</h1>
          </div>
        </ModalCommon>
      )}
    </div>
  );
}
