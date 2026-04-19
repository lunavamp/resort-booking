import { useState } from "react";
import { bookCabana } from "../../api";
import Overlay from "./Overlay";
import BookedView from "./BookedView";
import SuccessView from "./SuccessView";

type ModalState = "form" | "success";

interface Props {
  id:        string;
  isBooked:  boolean;
  onClose:   () => void;
  onSuccess: () => void;
}

const CabanaModal = ({ id, isBooked, onClose, onSuccess }: Props) => {
  const [roomNumber, setRoom]    = useState("");
  const [guestName,  setName]    = useState("");
  const [error,      setError]   = useState("");
  const [loading,    setLoading] = useState(false);
  const [state,      setState]   = useState<ModalState>("form");

  if (isBooked)            return <BookedView  id={id} onClose={onClose} />;
  if (state === "success") return <SuccessView id={id} guestName={guestName} onSuccess={onSuccess} onClose={onClose} />;

  const submit = async () => {
    setError("");

    if (!roomNumber.trim() || !guestName.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true);
    const res = await bookCabana({ roomNumber, guestName, cabanaId: id });
    setLoading(false);

    if (res.error) {
      setError(res.error);
      return;
    }

    setState("success");
  };

  return (
    <Overlay onClose={onClose}>
      <div className="modal">
        <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
        <p className="modal__eyebrow">Cabana {id}</p>
        <h3 className="modal__title">Reserve your spot</h3>
        <div className="modal__divider" />

        <div className="modal__fields">
          <input
            className="modal__input"
            value={roomNumber}
            placeholder="Room number"
            autoFocus
            onChange={(e) => setRoom(e.target.value)}
          />
          <input
            className="modal__input"
            value={guestName}
            placeholder="Guest name"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
        </div>

        {error && <p className="modal__error">⚠ {error}</p>}

        <div className="modal__actions">
          <button
            className="modal__btn modal__btn--primary"
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Booking…" : "Reserve"}
          </button>
          <button
            className="modal__btn modal__btn--secondary"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export default CabanaModal;