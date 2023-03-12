import { type ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  title: string;
}

export function Modal({ children, title }: ModalProps) {
  return (
    <div className="modal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
