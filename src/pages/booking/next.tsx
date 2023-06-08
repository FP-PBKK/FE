import { Layout } from '@/components/Layout'
import withAuth from '@/components/hoc/withAuth'
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast'
import apiMock from '@/lib/axios-mock'
import useAuthStore from '@/store/useAuthStore'
import useBookStore from '@/store/useBookStore'
import { Transaction } from '@/types/transaction'
import { useRouter } from 'next/router'
import * as react from 'react'
import { toast } from 'react-hot-toast'
export default withAuth(Next, 'all')
function Next() {
  const bookData = useBookStore.useData()
  const getData = useBookStore.useGetData()
  const [discount, setDiscount] = react.useState("")
  const [total,setTotal] = react.useState(bookData?.total)
  const Router = useRouter()
  const handleBack = () => {
    Router.push('/booking')
  }

  react.useEffect(() => {
    getData()
  }, [])

  const handleCheckDiscount = async ()=>{
    try{
      const response = await apiMock.get('')
      return response
    }catch(err){
      toast.error("error")
    }
  }
  const handleSubmit=()=>{
    let data : Transaction ={
      id_booking : bookData?.data,
      total : total,
      discount_id :discount
    }
    toast.promise(
      apiMock.post(`/user/login`, data)
        .then((res) => {
          
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Transaksi Berhasil Dibuat',
      }
    );
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
      <div className='min-h-main flex flex-col items-center justify-center'>
        <button className='font-bold absolute left-20 top-32' onClick={handleBack}>{`< Back`}</button>
        <p>Detail Pembayaran</p>
        <div className='w-full flex flex-row justify-center p-4 space-x-4'>
          <div>
          <form onSubmit={handleSubmit} className='flex flex-col w-64 md:flex-row justify-center items-center md:space-y-0 space-y-8 md:space-x-8'>
            <div className='flex flex-col'>
            <div className='flex flex-col space-y-2'>
              <p className='p font-medium'>Kediri</p>
              <p className='p'>{bookData?.total}{bookData?.data}</p>

              <div className='flex flex-row space-x-3'>
                <p className='p'>Total Bayar:Rp sas</p>
              </div>
            </div>

            <button type="submit" className="w-24 bg-slate-500" >Bayar</button>
            </div>
          </form>
          </div>

          <div>
            <form>
              <div className='flex flex-col'>
              <label>Diskon</label>
              <input className='border' type='text'></input>
              </div>
            </form>
          </div>

        </div>
      </div>
    </Layout>

  )
}
