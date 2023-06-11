import { Layout } from '@/components/Layout';
import ConfirmCard from '@/components/card/ConfirmCard';
import withAuth from '@/components/hoc/withAuth';
import apiMock from '@/lib/axios-mock';
import useAuthStore from '@/store/useAuthStore';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import * as react from 'react'
import { toast } from 'react-hot-toast';
const Userpayment: NextPage<{ data: any }> = ({ data }) => {
    const router = useRouter()
    const user = useAuthStore.useIsAuthenticated()
    const userData = useAuthStore.useUser()
    const [isOpen, setIsOpen] = react.useState(false)
    function check() {
        if (!user) return router.push('/auth')
    }
    react.useEffect(() => {
        check()
    }, [])
    const handlePay = async (data: string,id:string) => {
        try{
            const response =  await apiMock.get(`/booking/booking/${data}`)
            const date = response.data.data.date
            const time = response.data.data.schedule.time
            checkIspaid(date,time,id)
        }catch(err){
           toast.error('Terjadi Kesalahan')
            
        }
        
    }
    function handleRouteBook() {
        router.push(`/payment/booking/${userData?.id}`)
    }
    function handlerOnclick() {
        setIsOpen(!isOpen)
    }
    async function checkIspaid(date:string,time:string,id:string) {
        const response = await apiMock.get(`/transaction/check/${date}&&${time}`)
        if(response.data.data) return setIsOpen(true)
        router.push(`/payment/${id}`)
    }
    return (
        <Layout>
            <div className="mt-20 min-h-screen font-popin w-full transition-all duration-1000">
                <div className='flex justify-center items-center space-x-8'>
                    <button disabled className='underline uppercase h4 border p-2 rounded-lg bg-slate-500'>payment</button>
                    <button onClick={handleRouteBook} >booking</button>
                </div>
                <div className="flex flex-col">
                    <h1 className='text-center font-bold text-xl'>Riwayat Transaksi</h1>
                    <div className="flex justify-center flex-col items-center">
                        <div className='flex justify-start text-left'>
                            <p className='p text-left text-gray-900'><span className='p text-black font-semibold'>Note:</span>Jika ingin melakukan cancel dapat menghubungi nomor berikut : <a className='underline italic' href='https://wa.me/085758093907'>085758093907</a></p>
                        </div>
                        <table className="w-[80%] scale-50 md:scale-100 divide-y divide-gray-200 border rounded-lg">
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
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Harga
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Diskon
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                    >
                                        Status
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {
                                    data.map((data: any, index: any) => {

                                        return (
                                            <tr key={data.id}>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    {data.id}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    Rp{data.total}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    {data.discountId != 'no' ? "Diskon" : "Tidak diskon"  }
                                                </td>

                                                {
                                                    data.paid === 1 || data.lunas === 0 ? <td className="px-6 py-4 text-sm text-center bg-green-400 text-black whitespace-nowrap">
                                                        {data.paid && "Lunas"}
                                                    </td> : <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
                                                        {data.paid == 0 && "Belum"} <button onClick={() => handlePay(data.bookingId,data.id)} >|Bayar Sekarang</button>
                                                    </td>
                                                }

                                            </tr>)
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ConfirmCard onclick={handlerOnclick} isOpen={isOpen} isPaid />
        </Layout >
    )
}
export const getStaticPaths: GetStaticPaths = async () => {
    const response = await axios.get('http://localhost:5000/api/user')
    const paths = response.data.data.map((data: any) => ({
        params: { userpayment: data?.id.toString() }
    }))
    // console.log(paths);

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { userpayment }: any = context.params;

    const res = await axios.get(`http://localhost:5000/api/transaction/user/${userpayment}`)

    return {
        props: { data: res.data.data },
    };
};
export default Userpayment