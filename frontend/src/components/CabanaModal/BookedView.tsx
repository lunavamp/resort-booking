import Overlay from "./Overlay";

interface Props {
  id:      string;
  onClose: () => void;
}

const BookedView = ({ id, onClose }: Props) => (
  <Overlay onClose={onClose}>
    <div className="modal">
      <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
      <p className="modal__eyebrow">Cabana {id}</p>
      <h3 className="modal__title">Not available</h3>
      <div className="modal__divider" />
      <p className="modal__booked-msg">
        This cabana is currently reserved by another guest.
        Please choose a different one from the map.
      </p>
      <div className="modal__actions">
        <button
          className="modal__btn modal__btn--secondary modal__btn--full"
          onClick={onClose}
        >
          Back to map
        </button>
      </div>
    </div>
  </Overlay>
);

export default BookedView;