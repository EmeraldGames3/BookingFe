import './SubmitButton.css';

const SubmitButton = ({ action }) => {
    return (
        <div className='submit-container'>
            <button type="submit" className='submit'>
                {action}
            </button>
        </div>
    );
};

export default SubmitButton;