import './Modal.css'

export const Modal = (props: {isOpen?: boolean, onClose: Function, children: React.ReactElement | React.ReactElement[]}) => {
    return (
        <div className={`Modal${props.isOpen ? '' : ' Modal-hidden'}`} onClick={() => props.onClose()}>
            <div className='Modal-content'>
                {props.isOpen && props.children}
            </div>
        </div>
    )
}