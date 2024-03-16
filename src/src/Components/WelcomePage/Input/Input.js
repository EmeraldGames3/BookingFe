import './Input.css'

const Input = ({ type, placeholder, img, value, onChange }) => {
    return (
        <div className='input'>
            <img src={img} alt=''/>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange} // Ensure this is provided to update the state
            />
        </div>
    );
};

export default Input;
