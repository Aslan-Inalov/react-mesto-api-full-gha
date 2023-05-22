function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_picture ${card ? 'popup_opened' : ''}`}>
      <div className="popup__picture-container">
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <p className="popup__picture-text">{card?.name}</p>
        <button onClick={onClose} type="button" className="popup__close-button opacity" aria-label="Закрыть попап"></button>
      </div>
    </div>
  );
}

export default ImagePopup;