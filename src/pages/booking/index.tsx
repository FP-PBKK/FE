'use client';

import { Layout } from '@/components/Layout'
import Checkbox from '@/components/buttons/Checkbox';
import ConfirmCard from '@/components/card/ConfirmCard';
import withAuth from '@/components/hoc/withAuth';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import apiMock from '@/lib/axios-mock';
import useAuthStore from '@/store/useAuthStore';
import useBookStore from '@/store/useBookStore';
import { AddAdditionalItems, AdditionalItem, Booking, Paket, Schedule } from '@/types/book';
import { useRouter } from 'next/router';
import * as react from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Toaster, toast } from 'react-hot-toast';
export default withAuth(Index, 'optional');
function Index() {
  const isAuthenticated = useAuthStore.useIsAuthenticated()
  const user = useAuthStore.useUser()
  const setBooking = useBookStore.useSetData()
  const [value, setValue] = react.useState(formatDate(new Date()));
  const Router = useRouter();

  const [paket, setPaket] = react.useState<Paket[]>([])
  const [time, setTime] = react.useState<Schedule[]>([])
  
  const [additionalitems, setAdditionalItems] = react.useState<AdditionalItem[]>([])
  const [addAdditionalItems, setAddAdditionalItems] = react.useState<AddAdditionalItems[]>([])
  const [note, setNote] = react.useState('')
  const [price, setPrice] = react.useState(0)
  const [idPackage, setIdPackage] = react.useState()
  const [scheduleId, setScheduleid] = react.useState()
  const [scheduleValue,setScheduleValue] = react.useState()
  const [isOpen, setIsOpen] = react.useState(false)
  const [tempTotal,setTempTotal] = react.useState(0)
  const [tempData,setTempData] = react.useState<Booking>()


  const hadleAdditionalUpdate = (data: AdditionalItem) => {
    const itemLength = addAdditionalItems.length >= 1 ? true : false
    if (itemLength) {
      const checkItemExist = addAdditionalItems.find(item => item.idItem === data.id)
      if (checkItemExist) {
        let currentItem = addAdditionalItems.filter(item => item.idItem === data.id);
        currentItem[0].quantity = currentItem[0].quantity + 1;
        let elseItems = addAdditionalItems.filter(item => item.idItem != data.id);
        let newData = currentItem.concat(elseItems)
        const sortAdditionalItem = newData.sort((a, b) => {
          return parseInt(a.idItem[6]) - parseInt(b.idItem[6])
        })

        setAddAdditionalItems([...sortAdditionalItem]);
      } else {
        let temp: AddAdditionalItems = {
          idItem: data.id,
          quantity: 1,
          name: data.name,
          price: data.price
        }
        setAddAdditionalItems([...addAdditionalItems, temp])
      }
    } else {
      let temp: AddAdditionalItems = {
        idItem: data.id,
        quantity: 1,
        name: data.name,
        price: data.price
      }
      setAddAdditionalItems([...addAdditionalItems, temp])
    }
  }
  const handleDecrease = (data: AdditionalItem) => {
    const itemLength = addAdditionalItems.length >= 1 ? true : false
    if (itemLength) {
      const checkItemExist = addAdditionalItems.find(item => item.idItem === data.id)
      if (checkItemExist) {
        let currentItem = addAdditionalItems.filter(item => item.idItem === data.id);
        if (currentItem[0].quantity > 0) {
          currentItem[0].quantity = currentItem[0].quantity - 1;
        } else {
          currentItem[0].quantity = currentItem[0].quantity
        }
        let elseItems = addAdditionalItems.filter(item => item.idItem != data.id);
        let newData = currentItem.concat(elseItems)
        const sortAdditionalItem = newData.sort((a, b) => {
          return parseInt(a.idItem[6]) - parseInt(b.idItem[6])
        })
        setAddAdditionalItems([...sortAdditionalItem]);
      }
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    
    const sortAdditionalItem = addAdditionalItems.sort((a, b) => {
      return parseInt(a.idItem[6]) - parseInt(b.idItem[6])
    })
    let total: number  = price
    sortAdditionalItem.forEach(a => total += (a.price * a.quantity))

    let temp: Booking = {
      id_user: user?.id,
      id_schedule: scheduleId,
      id_package: idPackage,
      date: value,
      note: note,
      booking_status: "unpaid",
      additional_items: sortAdditionalItem
    }
    setTempTotal(total)
    setTempData(temp)
    setIsOpen(true)
  }

  function onCreateBooking(){
    toast.promise(
      apiMock.post(`/booking/booking`,tempData)
        .then((res) => {
          setBooking({bookingId: res.data.data.bookingId, total: tempTotal})
          Router.push('/booking/next')
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Booking Successfully Created',
      }
    );
  }
  function formatDate(date: Date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  const getJam = async () => {
    try {
      const responsePackage = await apiMock.get('/booking/packages')
      const responseSchedule = await apiMock.get(`/booking/schedule/booked/${value}`)
      const responseAdditionalItems = await apiMock.get('/booking/additionalitems')
      setTime(responseSchedule.data.data)
      setPaket(responsePackage.data.data)
      setAdditionalItems(responseAdditionalItems.data.data)
    } catch (error) {
      toast.error("Terjadi kesalahan")
    }
  }
  const handleSetPrice = (e: any) => {
    let data = e.target.value
    setIdPackage(data.split(',')[0])
    setPrice(parseInt(data.split(',')[1]))
  }
  const handleScheduleId = (e: any) => {
    let data = e.target.value
    setScheduleid(data.split(',')[0])
    setScheduleValue(data.split(',')[1])
  }
  const dataAdd = addAdditionalItems?.map((data) => {
    return data
  })

  function handlerOnclick() {
    setIsOpen(!isOpen)
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

              <div className="w-[60%] h-auto space-y-1 text-center">
                <p className="mt-10 mb-0 h1 md:mb-2 md:mt-0" >Pilih tanggal dan waktu</p>
                <div className="flex flex-col md:flex-row">
                  <Calendar onClickDay={(date) => setValue(formatDate(date))} value={value} locale='en' />
                  <div className="w-full md:w-[50%] min-h-full overflow-hidden md:ml-4">
                    <div className={`mt-4 md:m-0 overflow-hidden space-y-2`}>
                      {
                        time.map((schedule, index) => {
                          return (
                            <Checkbox key={index} disable={schedule.isBooked} onClick={(e) => handleScheduleId(e)} value={`${schedule.id},${schedule.time}`}>{schedule.time}</Checkbox>
                          )
                        })
                      }
                    </div>
                  </div >
                </div>
              </div>

              <div className="w-full h-auto md:w-[40%] md mt-0 flex flex-col justify-center">
                <p className="text-center h1">Pilih paket</p>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-3 m-auto mt-4 gap-y-7">
                    {
                      paket.map((paket, index) => {
                        return (
                          <Checkbox key={index} onClick={(e) => handleSetPrice(e)} value={`${paket.id},${paket.price}`}>{paket.name}</Checkbox>
                        )
                      })
                    }
                  </div>
                  <div className='flex flex-col'>
                    <label>Pesan</label>
                    <textarea required value={note} onChange={(e) => setNote(e.target.value)} className='border-2 h-16 border-solid border-gray-500 focus:outline-0' name='pesan'></textarea>
                  </div>
                  <div className="m-auto md:m-0">
                    <p className='p'>Ringkasan</p>
                    <p className="p">Kediri {value} jam {scheduleValue} harga RP{price}</p>
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
            <div className='flex justify-center items-center'>
              <div className='flex'>
                <table>
                  <thead>
                    <tr>
                      <th>
                        Item
                      </th>
                      <th>
                        Kurang
                      </th>
                      <th>
                        Tambah
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      additionalitems.map((additionalitems, index) => {
                        return (
                          <tr key={index} className='text-center'>
                            <td className='text-left'>
                              {additionalitems.name}
                            </td>
                            <td>
                              <button type='button' key={index} onClick={(e) => handleDecrease(additionalitems)}>-</button>
                            </td>
                            <td>
                              <button type='button' key={index} onClick={(e) => hadleAdditionalUpdate(additionalitems)}>+</button>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>

                <table className='text-center'>
                  <thead>
                    <tr>
                      <th>
                        Total
                      </th>
                    </tr>
                  </thead>
                    {
                      <tbody>
                      <tr>
                        <td key={dataAdd[0]?.idItem}>
                          {dataAdd[0]?.quantity ? dataAdd[0].quantity : "0"}
                        </td>
                      </tr>
                      <tr>
                        <td key={dataAdd[1]?.idItem}>
                          {dataAdd[1]?.quantity ? dataAdd[1].quantity : "0"}
                        </td>
                      </tr>
                      <tr>
                        <td key={dataAdd[2]?.idItem}>
                          {dataAdd[2]?.quantity ? dataAdd[2].quantity : "0"}
                        </td>
                      </tr>
                      <tr>
                        <td key={dataAdd[3]?.idItem}>
                          {dataAdd[3]?.quantity ? dataAdd[3].quantity : "0"}
                        </td>
                      </tr>
                      </tbody>
                    }
                </table>

              </div>
            </div>
          </div>
        </form>
      </div>
      <ConfirmCard isOpen={isOpen} onCreateBooking={onCreateBooking} onclick={handlerOnclick} data={{
        date: value,
        time: scheduleValue,
        total: tempTotal,
      }
        
      }/>
    </Layout>
  )
}
