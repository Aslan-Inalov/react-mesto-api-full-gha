import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like opacity ${isLiked && `element__like_active`}`;

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleCardDelete() {
        onCardDelete(card);
    }

    return (
        <li className="element__item">
            <img src={card.link} alt={card.name} className="element__image" onClick={() => onCardClick(card)} />
            <div className="element__description">
                <h3 className="element__title">{card.name}</h3>
                <div className="element__like-container">
                    <button className={cardLikeButtonClassName} aria-label="Лайк" type="button" onClick={handleLikeClick}></button>
                    <span className="element__like-counter">{card.likes.length}</span>
                </div>
            </div>
            {isOwn && <button className="element__delete opacity" aria-label="Удалить" onClick={handleCardDelete}></button>}
        </li>
    )
}

export default Card;