'use client';

import { Layout } from '@/components/Layout'
import Checkbox from '@/components/buttons/Checkbox';
import withAuth from '@/components/hoc/withAuth';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import apiMock from '@/lib/axios-mock';
import useAuthStore from '@/store/useAuthStore';
import useBookStore from '@/store/useBookStore';
import { ApiReturn } from '@/types/api';
import { useRouter } from 'next/router';
import * as react from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Toaster, toast } from 'react-hot-toast';
export default withAuth(index, 'optional');
function index() {
  const isAuthenticated = useAuthStore.useIsAuthenticated()
  const [value, setValue] = react.useState('');
  const router = useRouter();

  const [paket, setPaket] = react.useState<Paket[]>([])
  const [time, setTime] = react.useState<Schedule[]>([])
  const [price, setPrice] = react.useState()

  type Schedule = {
    id: string,
    time: string,
    isBooked: boolean
  }
  type Paket = {
    id: string,
    name: string,
    price: string,
    description: string
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    let temp = {
      id: +new Date(),
      users_id: "sas",
      transaction_id: "sasa",
      schedules_id: 'sasa',
      package_id: 'sasa',
      booking_status_id: "sasa"
    }

    toast.promise(
      apiMock.post(`/user`, temp)
        .then((res) => {
          router.push('/booking/next')
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Booking Successfully Created',
      }
    );

    // login(temp)
  }


  const getJam = async () => {
    try {
      const responsePackage = await apiMock.get('/booking/packages')
      const responseSchedule = await apiMock.post('/booking/schedule/booked', {
        'date': value
      })
      console.log(responseSchedule.data.data);
      setTime(responseSchedule.data.data)
      setPaket(responsePackage.data.data
      )
    } catch (error) {
      console.log(error);
    }
  }
  const handleSetPrice = (e: any) => {
    setPrice(e.target.value)
  }

  react.useEffect(() => {
    getJam()
  }, [value])
  return (
    <Layout>
      <Toaster />
      <div className='flex items-center justify-center min-h-main'>
        <form className="flex justify-center w-full -mt-20 md:mt-0" onSubmit={handleSubmit}>
          <div className="w-full md:w-[80%] md:h-[70%]">
            <div className="flex flex-col items-center justify-center space-x-3 md:flex-row">

              <div className="w-[60%] space-y-1 text-center">
                <p className="mt-10 mb-0 h1 md:mb-2 md:mt-0" >Pilih tanggal dan waktu</p>
                <div className="flex flex-col md:flex-row">
                  <Calendar onClickDay={(date) => setValue(date.toLocaleString('en-GB').split(',')[0])} showWeekNumbers value={value} locale='en' />

                  <div className="w-full md:w-[50%] min-h-full overflow-hidden md:ml-4">
                    <div className={`mt-4 md:m-0 overflow-hidden space-y-2`}>
                      {
                        time.map((schedule, index) => {
                          return (
                            <Checkbox key={index} value={schedule.id}>{schedule.time}</Checkbox>
                          )
                        })
                      }
                    </div>
                  </div >
                </div>
              </div>

              <div className="w-full md:w-[40%] mt-0 md:-mt-12 flex flex-col justify-center">
                <p className="text-center h1">Pilih paket</p>
                <div className="flex flex-col gap-4">
                <p>{price}</p>
                  <div className="grid grid-cols-3 m-auto mt-4 gap-y-7">
                    {
                      paket.map((paket, index) => {
                        return (
                          <Checkbox key={index} onClick={(e) => handleSetPrice(e)} value={paket.price}>{paket.name}</Checkbox>
                        )
                      })
                    }
                  </div>
                  <div className="m-auto md:m-0">
                    <p className="p">Kediri {value}</p>
                    {/* <p className="text-black p">{value.toDateString()} jam {tempTime} paket {temp}  </p> */}
                  </div>
                  <button type="submit" disabled={!isAuthenticated} className={`${isAuthenticated && " hover:bg-slate-500"} w-24 m-auto overflow-hidden border-2  md:m-0`}>
                    submit
                  </button>
                  {
                    !isAuthenticated && <p className='p'>Anda harus Login untuk melanjutkan</p>
                  }
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}