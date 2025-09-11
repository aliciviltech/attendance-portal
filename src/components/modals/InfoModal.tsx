import React from 'react'
import FitButton from '../buttons/FitButton'

const InfoModal = ({ children, setIsInfoModal }: { children: React.ReactNode, setIsInfoModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <div className='w-full h-screen flex items-center justify-center fixed inset-0 bg-black/50'>
            <div className='w-[95%] sm:w-md h-fit p-10 rounded-lg flex flex-col items-center gap-4 bg-white shadow-md'>
                {children}
                <FitButton text='Ok' onClick={() => setIsInfoModal(false)} />
            </div>
        </div>
    )
}

export default InfoModal