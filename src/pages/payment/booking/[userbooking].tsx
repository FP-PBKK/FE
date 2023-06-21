import { Layout } from '@/components/Layout';
import withAuth from '@/components/hoc/withAuth';
import apiMock from '@/lib/axios-mock';
import { getFromLocalStorage } from '@/lib/helper';
import useAuthStore from '@/store/useAuthStore';
import { ApiReturn } from '@/types/api';
import { User } from '@/types/auth';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import * as react from 'react'
const UserBooking: NextPage<{ data: any }> = ({ data }) => {
    const router = useRouter()
    const userData = useAuthStore.useUser()
    const isAuthenticated = useAuthStore.useIsAuthenticated();
    const isLoading = useAuthStore.useIsLoading();
    const login = useAuthStore.useLogin();
    const logout = useAuthStore.useLogout();
    const stopLoading = useAuthStore.useStopLoading();
    const user = useAuthStore.useUser();

    const checkAuth = react.useCallback(() => {
        const token = getFromLocalStorage('token');
        if (!token) {
            isAuthenticated && logout();
            stopLoading();
            return;
        }
        const loadUser = async () => {
            try {
                const res = await apiMock.get<ApiReturn<User>>('/user/whoami');

                login({
                    ...res.data.data,
                    token: token + '',
                });
            } catch (err) {
                localStorage.removeItem('token');
            } finally {
                stopLoading();
            }
        };

        if (!isAuthenticated) {
            loadUser();
        }
    }, [isAuthenticated, login, logout, stopLoading]);
    react.useEffect(() => {
        // run checkAuth every page visit
        checkAuth();

        // run checkAuth every focus changes
        window.addEventListener('focus', checkAuth);
        return () => {
            window.removeEventListener('focus', checkAuth);
        };
    }, [checkAuth]);

    react.useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                // Prevent authenticated user from accessing auth or other role pages
                router.push('/auth')
            }
        }
    }, [isAuthenticated, isLoading, router, user]);
    const handlePay = (data: string) => {
        router.push({
            pathname: '/comment/[id]',
            query: { id: data }
        })
    }

    function handleRouteBook() {
        router.push(`/payment/userpayment/${userData?.id}`)
    }
    
    return (
        <Layout>

            <div className="mt-20 min-h-screen font-popin w-full transition-all duration-1000">
                <div className='flex justify-center items-center space-x-8'>
                    <button onClick={handleRouteBook}>payment</button>
                    <button disabled className='underline uppercase h4 border p-2 rounded-lg bg-slate-500'>booking</button>
                </div>
                <div className="flex flex-col">
                    <h1 className='text-center font-bold text-xl'>Riwayat Transaksi</h1>
                    <div className="flex justify-center flex-col items-center">
                        <div className='flex justify-start text-left'>
                            <p className='p text-left text-gray-900'><span className='p font-semibold'>Note:</span>Jika ingin melakukan cancel dapat menghubungi nomor berikut : <a className='underline italic' href='https://wa.me/085758093907'>085758093907</a></p>
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
                                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                    >
                                        Status
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {
                                    data?.map((data: any, index: any) => {

                                        return (
                                            <tr key={data.id}>
                                                <td className="px-6 py-4 text-sm font-medium  whitespace-nowrap">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 text-sm  whitespace-nowrap">
                                                    {data.id}
                                                </td>
                                                <td className="px-6 py-4 text-sm  whitespace-nowrap">
                                                    Rp{data.date}
                                                </td>
                                                <td className="px-6 py-4 text-sm  whitespace-nowrap">
                                                    {data.schedule.time}
                                                </td>
                                                {
                                                    data.bookingStatus !== 'paid' ? <td className="px-6 py-4 text-sm text-center whitespace-nowrap">
                                                        {data.bookingStatus}
                                                    </td> : <td className="px-6 py-4 text-sm text-center  whitespace-nowrap">
                                                        {data.bookingStatus && "paid"} <button onClick={() => handlePay(data.id)} >|Berikan Feedback</button>
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
export const getStaticPaths: GetStaticPaths = async () => {
    const response = await axios.get('http://localhost:5000/api/user?page=0&limit=10')
    const filter = response.data.data.data.filter((data:any)=>{
        return data.role == 'user'
    })
    const paths = filter.map((data: any) => ({
            params: { userbooking: data?.id.toString() }
        }))
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { userbooking }: any = context.params;

    const res = await axios.get(`http://localhost:5000/api/booking/booking/user/${userbooking}`)

    if (res.data.status == 404) {
        return {
            notFound: true,
        }
    }
    return {
        props: { data: res.data.data },
    };
};
export default UserBooking