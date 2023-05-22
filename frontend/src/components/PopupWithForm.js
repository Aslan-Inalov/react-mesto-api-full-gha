function PopupWithForm({ title, name, buttonText, children, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__form_${name}`} name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__button" type="submit">
            {buttonText}
          </button>
        </form>
        <button
          className="popup__close-button opacity"
          type="button"
          aria-label="Закрыть попап"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
export default PopupWithForm;