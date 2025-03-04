interface InputType {
    type: string,
    name: string,
    input: string,
    autoComplete: string,
    required: boolean,
    handleInputUpdate: (type: string, value: string) => void
}

const InputItem = ({ type, name, input, autoComplete, required, handleInputUpdate }: InputType) => {

  return (
      <div>
          <label htmlFor={name}>{name[0].toUpperCase() + name.slice(1)}:</label>
          <input type={type} id={name}
              name={name} placeholder={`Enter ${name}...`}
              autoComplete={autoComplete} required={required}
              value={input} onInput={(e) => { handleInputUpdate(name, (e.target as HTMLInputElement).value) }}
          />
      </div>
  );
}

export default InputItem;