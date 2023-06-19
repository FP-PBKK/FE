import { Layout } from '@/components/Layout'
import ConfirmCard from '@/components/card/ConfirmCard'
import withAuth from '@/components/hoc/withAuth'
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast'
import apiMock from '@/lib/axios-mock'
import useAuthStore from '@/store/useAuthStore'
import useBookStore from '@/store/useBookStore'
import { SendTransaction, Transaction } from '@/types/transaction'
import { useRouter } from 'next/router'
import * as react from 'react'
import { toast } from 'react-hot-toast'
export default withAuth(Next, 'all')
function Next() {
  const bookData = useBookStore.useData()
  
  const getData = useBookStore.useGetData()
  const removeData = useBookStore.useRemoveData()
  const [stringDiscount,setStringDiscount] = react.useState("")
  const [discount, setDiscount] = react.useState("no")
  const [checkDiscount,setCheckDiscount] = react.useState(false)
  const [valueDiscount,setValueDiscount] = react.useState(1)
  const [totalWithDiscount,setTotalWithDiscount] = react.useState(0)
  const [total,setTotal] = react.useState(0)
  const [isOpen, setIsOpen] = react.useState(false)
  const [data,setData] = react.useState<SendTransaction>()
  const Router = useRouter()
  const handleBack = () => {
    Router.push('/booking')
  }

  react.useEffect(() => {
    getData()
  },[1])

  const handleCheckDiscount = async (e:any)=>{
    e.preventDefault()
    try{
      const response = await apiMock.get(`/transaction/discount/validity/${stringDiscount}`)
      if(response.data.data){
        setCheckDiscount(true)
        const responseDiscount = await apiMock.get(`/transaction/discount/id/${stringDiscount}`)
        setDiscount(responseDiscount.data.data.id)
        setValueDiscount(responseDiscount.data.data.percentage)
        toast.success("Diskon Berhasil Digunakan")
      }else{
        setCheckDiscount(false)
        toast.error("Diskon tidak Berlaku")
      }
      // return response
    }catch(err){
      toast.error("Terjadi Kesalahan")
    }
  }
  const handleSubmit= async (e:any)=>{
    let final: number = 0
    if(!checkDiscount){
      if(bookData){
        final = bookData.total
      }
    }else{
      if(bookData){
      final = bookData.total - (bookData.total * valueDiscount)
      }
    }
    e.preventDefault()
    let data : SendTransaction ={
      id_booking : bookData?.bookingId,
      total : final,
      discount_id :discount
    }
    setData(data)
    setIsOpen(true)
    
    // toast.promise(
    //   apiMock.post(`/transaction`, data)
    //     .then((res) => {
    //       createQr(res.data.data.qrId,res.data.data.transactionId)
    //     }).then(()=>{
    //       removeData()
    //     }),
    //   {
    //     ...DEFAULT_TOAST_MESSAGE,
    //     success: 'Transaksi Berhasil Dibuat',
    //   }
    // );
    
  }
  function onCreateTransaction(){
      toast.promise(
      apiMock.post(`/transaction`, data)
        .then((res) => {
          createQr(res.data.data.qrId,res.data.data.transactionId)
        }).then(()=>{
          removeData()
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Transaksi Berhasil Dibuatt',
      }
    );
  }
  function handlerOnclick() {
    setIsOpen(!isOpen)
}

  async function createQr (id:string,transId:string){
    try{
      const response = await apiMock.get(`/transaction/getqr/${id}&&${bookData?.total}`)
      if(response.statusText == "OK") Router.push(`/payment/${transId}`)
    }catch (err){
      toast.error("Terjadi Kesalahan")
    }
   
  }
  const styleinput = 'border-2 border-solid border-gray-500 focus:outline-0'
  return (
    <Layout>
      <div className='min-h-main flex flex-col items-center justify-center'>
        <button className='font-bold absolute left-20 top-32' onClick={handleBack}>{`< Back`}</button>
        <p className='h2 font-bold'>Detail Pembayaran</p>
        <div className='w-full flex flex-row justify-center p-4 space-x-4'>
          <div>
          <form onSubmit={handleSubmit} className='flex flex-col w-64 md:flex-row justify-center items-center md:space-y-0 space-y-8 md:space-x-8'>
            <div className='flex flex-col'>
            <div className='flex flex-col space-y-2'>
              <p className='p font-medium'>Kediri</p>
              <p className='p'>Total Rp {bookData?.total}</p>

              <div className='flex flex-row space-x-3'>
                <p className='p'>Total Bayar:Rp {bookData?.total}</p>
                {
                  totalWithDiscount != 0 && <p>{totalWithDiscount}</p>
                }
              </div>
            </div>

            <button type="submit" className="w-24 bg-slate-500" >Bayar</button>
            </div>
          </form>
          </div>

          <div>
            <form onSubmit={handleCheckDiscount}>
              <div className='flex flex-col space-y-4'>
              <label>Diskon</label>
              <input onChange={e=>setStringDiscount(e.target.value)} className='border-2 rounded-md border-solid border-gray-500 focus:outline-0er' type='text'></input>
              <button className='border w-24' type='submit'>Cek</button>
              </div>
            </form>
          </div>

        </div>
      </div>
      <ConfirmCard isOpen={isOpen} onCreateBooking={onCreateTransaction} onclick={handlerOnclick} isTransaction data={{
        total: data?.total,
      }
        
      }/>

    </Layout>

  )
}
