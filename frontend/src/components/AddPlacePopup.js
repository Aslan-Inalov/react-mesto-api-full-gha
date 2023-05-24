/* eslint-disable react-hooks/exhaustive-deps */
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
    const { values, handleChange, errors, isValid, resetForm } =
        useFormAndValidation();

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            onAddPlace({
                name: values.cardName,
                link: values.cardLink,
            });
        }
    };

    return (
        <PopupWithForm
            title="Новое место"
            name="card"
            buttonText={'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isValid={isValid}
        >
            <input type="text" name="cardName" placeholder="Название" className="popup__input popup__input_card_name"
                id="card-name-input" minLength="2" maxLength="30" required onChange={handleChange} value={values.cardName || ""} />
            <span className={`popup__input-error card-name-input-error ${isValid ? "" : "popup__input-error_active"}`}>{errors.cardName}</span>
            <input type="url" name="cardLink" placeholder="Ссылка на картинку" className="popup__input popup__input_card_link"
                id="card-link-input" required onChange={handleChange} value={values.cardLink || ""} />
            <span className={`popup__input-error card-link-input-error ${isValid ? "" : "popup__input-error_active"}`}>{errors.cardLink}</span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;