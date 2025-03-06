interface InputType {
    type: string,
    name: string,
    autoComplete: string,
    required: boolean,
    handleInputUpdate: (type: string, value: string) => void
}

const InputItem = ({ type, name, autoComplete, required, handleInputUpdate }: InputType) => {

  return (
      <div className="input-container">
          <label htmlFor={name}>{name[0].toUpperCase() + name.slice(1)}:</label>
          <input type={type} id={name}
              name={name} placeholder={`Enter ${name}...`}
              autoComplete={autoComplete} required={required}
              onInput={(e) => { handleInputUpdate(name, (e.target as HTMLInputElement).value) }}
          />
      </div>
  );
}

export default InputItem;