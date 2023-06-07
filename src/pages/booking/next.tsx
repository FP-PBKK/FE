import { Layout } from '@/components/Layout'
import withAuth from '@/components/hoc/withAuth'
import useAuthStore from '@/store/useAuthStore'
import useBookStore from '@/store/useBookStore'
import { useRouter } from 'next/router'
import * as react from 'react'
export default withAuth(next,'all')
function next () {
  const user = useAuthStore.useUser()
  const router = useRouter()
  const handleBack = () =>{
    router.push('/booking')
  }
  // const loadData = useBookStore.useGetData()
  // react.useEffect(()=>{
  //   loadData()
  // },[])
  // const data = useBookStore.useData()
  // console.log(data);
  const styleinput = 'border-2 border-solid border-gray-500 focus:outline-0'
  return (
    <Layout>
           <div className='min-h-main flex flex-row items-center justify-center'>
                    <button className='font-bold absolute left-20 top-32' onClick={handleBack}>{`< Back`}</button>
                    <div className='w-full flex justify-center p-4'>
                        <form className='flex flex-col md:flex-row justify-center items-center md:space-y-0 space-y-8 md:space-x-8'>
                            <div className='flex flex-col w-72'>
                                {
                                    user ? <><label>Nama</label>
                                        <input className={styleinput} type="text" name='name' defaultValue={user.username} disabled></input>
                                        <label>Email</label>
                                        <input className={styleinput} type="email" name='email' defaultValue={user.email} disabled></input>
                                        <label>Nomor Hp</label>
                                        <input className={styleinput} type="text" name='no' defaultValue={user.email} disabled></input>
                                        <label>Pesan</label>
                                        <input className={styleinput} type="text" name='pesan' value={"sasa"}></input></> : ""
                                }
                            </div>

                            <div className=''>
                                <div className='flex flex-col space-y-2'>
                                    <h1 className='font-bold'>Detail Pembayaran</h1>
                                    <p className='p font-medium'>Kediri</p>
                                    <p className='p'>sasa</p>

                                    <div className='flex flex-row space-x-3'>
                                        <p className='p'>Total Bayar:Rp sas</p>
                                    </div>
                                </div>
                                <button type="submit" className="w-24 bg-slate-500" >Bayar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
    </Layout>
    
  )
}
