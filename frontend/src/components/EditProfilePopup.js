import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleNameChange(event) {
        setName(event.target.value);
    }
    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="profile"
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input type="text" name="name" value={name || ""} placeholder="Имя" className="popup__input popup__input_user_name"
                id="profile-name-input" minLength="2" maxLength="40" required onChange={handleNameChange} />
            <span className="popup__input-error profile-name-input-error"></span>
            <input type="text" name="about" value={description || ""} placeholder="О себе" className="popup__input popup__input_user_about"
                id="profile-about-input" minLength="2" maxLength="200" required onChange={handleDescriptionChange} />
            <span className="popup__input-error profile-about-input-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;