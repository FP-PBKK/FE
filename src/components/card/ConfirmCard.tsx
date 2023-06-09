import { Transition, Dialog } from '@headlessui/react'
import * as react from 'react'
interface Card {
    isOpen: boolean,
    isPaid?: boolean | false,
    isTransaction?: boolean | false,
    onclick: () => void,
    onCreateBooking?: () => void
    data?: {
        date?: string,
        time?: string,
        total?: number,
    }
}
const ConfirmCard: React.FC<Card> = ({
    isOpen,
    isPaid,
    isTransaction,
    onclick,
    onCreateBooking,
    data
}) => {
    return (
        <>
            <Transition appear show={isOpen} as={react.Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onclick}>
                    <Transition.Child
                        as={react.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={react.Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="h2 font-bold leading-6 text-center text-gray-900 h3"
                                    >

                                        {
                                            isPaid ? "Yahh :(" :
                                            isTransaction ? "Konfirmasi Pembayaran" : "Konfirmasi Pemesananan"

                                        }
                                    </Dialog.Title>
                                    <div className="mt-4 flex space-x-2">
                                        <div className='p font-bold'>
                                            {
                                                data && <>
                                                    {
                                                        data.date && <p>Tanggal </p>
                                                    }
                                                    {
                                                        data.time && <p>Jam </p>
                                                    }
                                                    {
                                                        data.total && <p>Total Pembayaran </p>
                                                    }
                                                </>
                                            }
                                            {
                                                isPaid && <p className='text-center'>Jadwal ini sudah lebih dahulu dibayar oleh orang lain</p>
                                            }
                                        </div>
                                        <div className='p'>
                                            {
                                                data && <>
                                                    {
                                                        data.date && <p>: {data?.date}</p>
                                                    }
                                                    {
                                                        data.time && <p>: {data?.time}</p>
                                                    }
                                                    {
                                                        data.total && <p>: Rp{data?.total}</p>
                                                    }
                                                </>
                                            }

                                        </div>

                                    </div>

                                    <div className="mt-4 flex justify-center">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={isPaid ? onclick : onCreateBooking}
                                        >
                                            {
                                                isPaid ? "Mengerti" : "Lanjutkan"
                                            }
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ConfirmCard