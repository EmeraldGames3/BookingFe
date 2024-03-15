import './Input.css'

export default function Input({type, placeholder, img}) {
    return (
        <div className='input'>
            <img src={img} alt=''/>
            <input type={type} placeholder={placeholder}/>
        </div>
    )
}