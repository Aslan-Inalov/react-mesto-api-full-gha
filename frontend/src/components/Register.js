import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

const Register = ({ onRegister }) => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="auth__form">
        <input className="auth__input" required id="user-email-input" placeholder="Email" name="email" type="email" value={values.email || ""} onChange={handleChange} />
        <span className={`auth__input-error user-email-input-error ${isValid ? "" : "auth__input-error_active"}`}>{errors.email}</span>
        <input className="auth__input" required id="user-password-input" placeholder="Пароль" name="password" type="password" value={values.password || ""} onChange={handleChange} />
        <span className={`auth__input-error user-password-input-error ${isValid ? "" : "auth__input-error_active"}`}>{errors.password}</span>
      </form>
      <div className="auth__register">
        <button className="auth__button"
          type="submit"
          onClick={handleSubmit}>Зарегистрироваться</button>
        <p className="auth__text">Уже зарегистрированы? <Link to="/sign-in" className="auth__text">Войти</Link></p>
      </div>
    </div>
  );
}

export default Register;