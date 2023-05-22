import { useFormAndValidation } from '../hooks/useFormAndValidation';

const Login = ({ onLogin }) => {
    const { values, handleChange, errors, isValid } = useFormAndValidation();

    const handleSubmit = (e) => {
            e.preventDefault();
            onLogin(values);
        }

    return (
        <div className="auth">
            <h1 className="auth__title">Вход</h1>
            <form onSubmit={handleSubmit} className="auth__form">
                <input className="auth__input" required id="email" placeholder="Email" name="email" type="email" value={values.email || ""} onChange={handleChange} />
                <span className={`auth__input-error user-email-input-error ${isValid ? "" : "auth__input-error_active"}`}>{errors.email}</span>
                <input className="auth__input" required id="password" placeholder="Пароль" name="password" type="password" value={values.password || ""} onChange={handleChange} />
                <span className={`auth__input-error user-password-input-error ${isValid ? "" : "auth__input-error_active"}`}>{errors.password}</span>
            </form>
            <button type="submit" className="auth__button" disabled={!isValid} onClick={handleSubmit}>Войти</button>
        </div>
    )
}

export default Login;