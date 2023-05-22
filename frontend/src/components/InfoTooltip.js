import React from "react";
import successIcon from "../images/success.svg";
import errorIcon from "../images/error.svg";
import { useLocation, useNavigate } from "react-router-dom";

const InfoToolTip = ({ onClose, isOpen, isOk, successText, errorText }) => {
    const navigate = useNavigate()
    const location = useLocation();

    const closePopup = () => {
        if (isOk) {
            onClose();
            if (location.pathname === '/sign-up') {
                navigate('/sign-in')
            }
        } else {
            onClose();
        }
    }

    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={closePopup} />
                <div className="tooltip">
                    <img src={isOk ? successIcon : errorIcon} alt={isOk ? 'Регистрация прошла успешно' : 'Что-то пошло не так'} className="tooltip__icon" />
                    <p className="tooltip__text">{isOk ? successText : errorText}</p>
                </div>
            </div>
        </div>
    )
}


export default InfoToolTip;
