import './SubmitButton.css'

export default function renderSubmitButtons(action) {
    return (
        <div className='submit-container'>
            <div className='submit'>{action.action}</div>
        </div>
    );
}