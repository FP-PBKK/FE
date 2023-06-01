'use client';

import { Layout } from '@/components/Layout'
import apiMock from '@/lib/axios-mock';
import * as react from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
const index = () => {
  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [value, onChange] = react.useState<Value>(new Date());
  const today = new Date()

  const [paket, setPaket] = react.useState("")


  const getJam = async () => {
    try {
      const response = await apiMock.get('/booking/schedules')
      console.log(response.data.data);
      
    } catch (error) {
      console.log(error);
    }
  }

  react.useEffect(()=>{
    getJam()
  })
  return (
    <Layout>
    <div className='flex items-center justify-center min-h-screen'>
      <form className="flex justify-center w-full -mt-20 md:mt-0">
        <div className="w-full md:w-[80%] md:h-[70%]">
          <div className="flex flex-col items-center justify-center space-x-3 md:flex-row">
            <div className="w-[60%] space-y-1 text-center">
              <p className="mt-10 mb-0 h1 md:mb-2 md:mt-0" >Pilih tanggal dan waktu</p>
              <div className="flex flex-col md:flex-row">
                <Calendar onChange={onChange} showWeekNumbers value={value} locale='en' />

                <div className="w-full md:w-[50%] min-h-full overflow-hidden md:ml-4">
                  <div className={` mt-4 md:m-0 overflow-hidden`}>

                  </div>
                </div >
              </div>
            </div>

            <div className="w-full md:w-[40%] mt-0 md:-mt-12 flex flex-col justify-center">
              <p className="text-center h1">Pilih paket</p>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 m-auto mt-4 gap-y-7">
                  {/* <Checkbox value={55000} id="2" onClick={(e) => { checked(e); setTemp(e.target.innerHTML) }}>berDua</Checkbox>
                      <Checkbox value={65000} id="4" onClick={(e) => { checked(e); setTemp(e.target.innerHTML) }}>berEMPAT</Checkbox>
                      <Checkbox value={80000} id="6" onClick={(e) => { checked(e); setTemp(e.target.innerHTML) }}>berENAM</Checkbox> */}
                </div>
                <div className="m-auto md:m-0">
                  <p className="p">Kediri</p>
                  {/* <p className="text-black p">{value.toDateString()} jam {tempTime} paket {temp}  </p> */}
                </div>
                <button type="submit" className="w-24 m-auto overflow-hidden border-2 hover:bg-slate-500 md:m-0">
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    </Layout>
  )
}
export default index