export function EmailInput({ onChange, value }) {
    return (
        <input
            type="email"
            name="email"
            value={value}
            placeholder="Email"
            onChange={onChange}
            required
        />
    );
}

export function PasswordInput({ onChange, value }) {
    return (
        <input
            type="password"
            name='password'
            value={value}
            placeholder={'Password'}
            onChange={onChange}
            required
        />
    );
}

export function TextInput({ onChange, value, name, placeholder, onKeyDown}) {
    return (
        <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        />
    )
}