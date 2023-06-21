import { AdminLayout } from '@/components/AdminLayout'
import apiMock from '@/lib/axios-mock'
import { Schedule } from '@/types/book'
import { Dialog, Transition } from '@headlessui/react'
import * as react from 'react'
import { toast } from 'react-hot-toast'
import { FaPlus } from 'react-icons/fa'

const index = () => {
    const [schedules, setSchedules] = react.useState<Discount[]>([])
    const [isOpen, setIsOpen] = react.useState(false)
    const [isOpen2, setIsOpen2] = react.useState(false)
    const [id, setId] = react.useState('')
    const [name, setName] = react.useState('')
    const [percentage, setPercentage] = react.useState('')
    const [start, setStart] = react.useState('')
    const [end, setEnd] = react.useState('')
    const [des, setDes] = react.useState('')
    const [idDel, setIddel] = react.useState('')

    type Discount= {
      id:string,
      name:string,
      percentage:number,
      start_date:string,
      end_date:string,
      description:string

    }
    const getSchedule = async () => {
        try {
            const response = await apiMock.get('/transaction/discount')
            setSchedules(response.data.data)
        } catch (error) {
            toast.error("Terjadi Kesalahan")
        }

    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    function closeModal2() {
        setIsOpen2(false)
    }

    function openModal2() {
        setIsOpen2(true)
    }

    const confirmDelete = async (id: string) => {
        await apiMock.delete(`/booking/schedule/${id}`)
        closeModal()
        toast.success("Berhasil Dihapus")
        getSchedule()
    }
    const addTime = async () => {
        await apiMock.post(`/transaction/discount`, {
            id: id,
            name: name,
            percentage: percentage,
            start_date: start,
            end_date: end,
            description: des,
        })
        closeModal2()
        getSchedule()
    }
    const deleteJadwal = (id: string) => {
        setIddel(id)
        openModal()
    }

    react.useEffect(() => {
        getSchedule()
    }, [])

    return (
        <AdminLayout>
            <div className="mt-20 min-h-screen">
                <Transition appear show={isOpen} as={react.Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Apakah anda yakin?
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Anda tidak dapat memulihkan data ini
                                            </p>
                                        </div>

                                        <div className="mt-4 flex space-x-4">
                                            <button onClick={e => confirmDelete(idDel)}
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"

                                            >
                                                Iya
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Tidak
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <Transition appear show={isOpen2} as={react.Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal2}>
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
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Tambahkan Jam
                                        </Dialog.Title>
                                        <div className="mt-2 flex flex-col">
                                            <p className=" text-black text-lg">
                                                
                                            </p>
                                            <input type="text" className='text-black outline-none border-b-2' placeholder='' value={id} onChange={(e) => setId(e.target.value)}></input>
                                            <input type="text" className='text-black outline-none border-b-2' placeholder='' value={name} onChange={(e) => setName(e.target.value)}></input>
                                            <input type="number" max={1} min={0.1} className='text-black outline-none border-b-2' placeholder='' value={percentage} onChange={(e) => setPercentage(e.target.value)}></input>
                                            <input type="date" className='text-black outline-none border-b-2' placeholder='2023-05-01T00:00:00.000Z' value={start} onChange={(e) => setStart(e.target.value)}></input>
                                            <input type="date" className='text-black outline-none border-b-2' placeholder='2023-05-31T00:00:00.000Z' value={end} onChange={(e) => setEnd(e.target.value)}></input>
                                            <input type="text" className='text-black outline-none border-b-2' placeholder='diskon untuk keren' value={des} onChange={(e) => setDes(e.target.value)}></input>
                                        </div>

                                        <div className="mt-4 flex space-x-4">
                                            <button onClick={addTime}
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"

                                            >
                                                Tambahkan
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal2}
                                            >
                                                Tidak jadi
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
                <div className="flex flex-col">
                    <div className="overflow-x-auto w-full">
                        <div className="py-3 pl-2">

                            <div className="relative max-w-xs">
                                <button className='border rounded-md flex justify-center items-center hover:bg-slate-500' onClick={openModal2}><FaPlus color='black' /><p className='p text-black'>Tambah data</p></button>
                            </div>

                        </div>

                        <div className="p-1.5 inline-block align-middle">
                            <div className="overflow-hidden border rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                            >
                                                ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                            >
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {
                                            schedules.map((data, index) => (
                                                <tr key={data.id}>
                                                    <td className="px-4 py-2 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-800 whitespace-nowrap">
                                                        {data.name}
                                                    </td>
                                                    <td className="px-4 py-2 text-sm font-medium text-right whitespace-nowrap">
                                                        <button onClick={() => deleteJadwal(data.id)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AdminLayout>
    )
}

export default index