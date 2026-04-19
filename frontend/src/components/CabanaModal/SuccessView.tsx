import Overlay from "./Overlay";

interface Props {
  id:        string;
  guestName: string;
  onSuccess: () => void;
  onClose:   () => void;
}

const SuccessView = ({ id, guestName, onSuccess, onClose }: Props) => (
  <Overlay onClose={onClose}>
    <div className="modal">
      <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
      <span className="modal__success-icon">🌴</span>
      <p className="modal__eyebrow">Booking confirmed</p>
      <h3 className="modal__title">Enjoy your stay!</h3>
      <div className="modal__divider" />
      <p className="modal__success-msg">
        Cabana <strong>{id}</strong> has been reserved for{" "}
        <strong>{guestName}</strong>. Head to the pool — your spot is waiting.
      </p>
      <div className="modal__actions">
        <button
          className="modal__btn modal__btn--primary modal__btn--full"
          onClick={onSuccess}
        >
          Back to map
        </button>
      </div>
    </div>
  </Overlay>
);

export default SuccessView;