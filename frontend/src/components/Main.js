import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
// import Card from './Card';

function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete,
    cards
}) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <button className="profile__avatar-button" onClick={onEditAvatar}>
                    <img src={currentUser.avatar} alt="аватарка" className="profile__avatar" />
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit-button opacity" onClick={onEditProfile} aria-label="Редактировать профиль" type="button"></button>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button className="profile__add-button opacity" onClick={onAddPlace} aria-label="Добавить" type="button"></button>
            </section>
            <section className="elements">
                <ul className="element">
                    {cards.map(card => (console.log('card')))}
                    {/* < Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete} />
                    ))} */}
                </ul>
            </section>
        </main>
    );
}

export default Main;