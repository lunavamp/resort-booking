interface OverlayProps {
  onClose:  () => void;
  children: React.ReactNode;
}

const Overlay = ({ onClose, children }: OverlayProps) => (
  <div
    className="modal-overlay"
    onMouseDown={(e) => e.target === e.currentTarget && onClose()}
  >
    {children}
  </div>
);

export default Overlay;