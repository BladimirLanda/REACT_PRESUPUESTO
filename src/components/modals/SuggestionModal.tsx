//COMPONENTE SUGGESTION-MODAL
import { Fragment } from 'react'
import useBudget from '../../hooks/useBudget'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid' //Iconos React: npm i @heroicons/react
import { Dialog, Transition } from '@headlessui/react' //Modal React: npm i @headlessui/react
import SuggestionDisplay from '../SuggestionDisplay';

export default function SuggestionModal() {
    //State
    const { state, dispatch } = useBudget();

    //---VIEW---//
    return (
        <>
            {/*--MODAL CONTROLLER--*/}
            <div className="fixed right-5 bottom-20 flex items-center justify-center">
                <button type="button" onClick={() => dispatch( {type: 'show-modal-two'} )}>
                    <QuestionMarkCircleIcon className='w-10 h-10 text-gray-500 rounded-full hover:text-gray-700' />
                </button>
            </div>

            {/*--MODAL--*/}
            <Transition appear as={Fragment} show={state.modalSug}>
                <Dialog as="div" className="relative z-10" onClose={() => dispatch( {type: 'close-modal-two'} )}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl 
                                bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    
                                    {/*--MODAL CONTENT--*/}
                                    <SuggestionDisplay />

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}