import { Layout } from '@/components/Layout'
import CommentCard from '@/components/card/CommentCard'
import apiMock from '@/lib/axios-mock'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import * as react from 'react'
import { toast } from 'react-hot-toast'

const user: NextPage<{ data: any }> = ({ data }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = react.useState(false)
    const [idDelete,setIdDelete] = react.useState('')
    function handleEdit(id: string) {
        router.push({
            pathname: '/feedback/edit/[id]',
            query: { id: id }
        })
    }

    function handlerOnclick() {
        setIsOpen(!isOpen)
    }
    function handleDelete(id: string) {
        setIsOpen(true)
        setIdDelete(id)
    }
    async function deleteById(e: any) {
        try {
            const response = await apiMock.delete(`/booking/feedback/id/${idDelete}`)
            if (response.data.data) {
                toast.success("Berhasil dihapus")
                setIsOpen(false)
                router.reload()
            }
        } catch (err) {
            toast.error("Terjadi Kesalahan")
        }
    }
    return (
        <Layout>
            <Transition appear show={isOpen} as={react.Fragment}>
                <Dialog as="div" className="relative z-10" onClose={handlerOnclick}>
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
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={e => deleteById(e)}
                                        >
                                            Iya
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={handlerOnclick}
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
            <div className='flex justify-center items-center flex-col min-h-main'>
                {
                    data.length ? data.map((data: any, index: any) => {
                        return (
                            <CommentCard key={index} data={data} isUser handleDelete={(e) => handleDelete(data.id)} handleEdit={(e) => handleEdit(data.id)} />
                        )
                    }) : <p className='h1'>Kamu belum memiliki komentar</p>
                }
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const userid: string = String(context.query.user)
    const res = await axios.get(`http://localhost:5000/api/booking/feedback/user/${userid}`)
    const data = res.data.data
    return {
        props: {
            data
        }
    }
}

export default user