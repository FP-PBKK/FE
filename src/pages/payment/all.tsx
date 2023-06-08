import { Layout } from '@/components/Layout';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react'

const All = ({ data }: { data: any }) => {
    const router = useRouter()
    const handlePay = (data:string)=>{
        router.push(`/payment/${data}`)
    }
    return (
        <Layout>
            <div className="mt-20 min-h-screen font-popin w-full transition-all duration-1000">
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
                                    Tanggal
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                >
                                    Jam
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
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
                                                {data.discountId}
                                            </td>

                                            {
                                                data.paid === 1 || data.lunas === 0 ? <td className="px-6 py-4 text-sm bg-green-400 text-black whitespace-nowrap">
                                                    {data.paid}
                                                </td> : <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    {data.padi} <button onClick={()=>handlePay(data.id)} >|Bayar Sekarang</button>
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
        </Layout >
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await axios.get(`http://localhost:5000/api/transaction/`)

    return {
        props: { data: res.data.data },
    };
};
export default All