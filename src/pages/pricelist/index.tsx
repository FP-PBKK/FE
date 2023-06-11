import { Layout } from '@/components/Layout'
import React from 'react'

const index = () => {
  const garis = "w-full border-b-2 border-dashed border-black dark:border-white"
  const card = "w-[30%] md:h-72 h-60 rounded-md text-center bg-abu flex flex-col justify-center space-y-2"
  return (
    <Layout>
      <div className='min-h-screen justify-center items-center flex flex-col font-popin overflow-hidden'>
        {/* Pricelist Atas */}
        <div className='w-full p-4 md:p-0 md:w-[60%] mt-20'>
          <p className="text-center h1">Normal PriceList</p>
          <div><p className="h1">Self Photo Studio</p>
            <ul className='list-disc ml-6'>
              <li><p className="p">Unlimited Shoot</p></li>
              <li><p className="p">Max 6 orang</p></li>
              <li><p className="p">Free 10 SoftFiles</p></li>
            </ul>
            <div className='flex flex-row h-4 justify-evenly relative overflow-hidden'>
              <div className='w-[90%] -ml-8 border-b-2 border-dashed border-black dark:border-white'></div>
              <div className='absolute -bottom-2 right-0'><p className="p">20k</p></div>
            </div>

          </div>

          <div><p className="h1">Tambahan</p>
            <div className='flex flex-row'>
              <div className='w-[40%]'>
                <ul className='list-disc ml-6'>
                  <li><p className="p">Waktu Max 5 Menit/Sesi</p></li>
                  <li><p className="p">Tambahan 1 Orang</p></li>
                  <li><p className="p">Tambahan 1x Cetak</p></li>
                </ul>
              </div>
              <div className='w-[60%]'>
                <ul className='p-2 space-y-10 md:space-y-9 ml-4'>
                  <li><div className={garis}></div></li>
                  <li><div className={garis}></div></li>
                  <li><div className={garis}></div></li>
                </ul>
              </div>
              <div>
                <ul className='space-y-4 md:space-y-0'>
                  <li><p className="p">20k</p></li>
                  <li><p className="p">20k</p></li>
                  <li><p className="p">20k</p></li>
                </ul>
              </div>
            </div></div>

          <div><p className="h1">All Soft Files</p>
            <div className='flex flex-row'>
              <div className='w-[40%]'>
                <ul className='list-disc ml-6'>
                  <li><p className="p">Colored all soft file</p></li>
                </ul>
              </div>
              <div className='w-[60%]'>
                <ul className='p-2  mt-2 ml-4'>
                  <li><div className={garis}></div></li>
                </ul>
              </div>
              <div>
                <ul className=''>
                  <li><p className="p">20k</p></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Price List Bawah */}
        <div className='w-full md:w-[60%] mt-10 justify-center relative '>
          <div className='text-center'><h1>Price List Paket Kamu</h1></div>

          <div className='flex flex-row justify-evenly absolute w-full '>
            <div className={`${card} mt-10`}>
              <div><p className='h3'>berDua</p></div>
              <div>
                <ul>
                  <li>
                    <p className="p">Unlimited Shoot</p>
                  </li>
                  <li>
                    <p className="p">Durasi 10 Menit</p>
                  </li>
                  <li>
                    <p className="p">Maks 2 orang</p>
                  </li>
                  <li>
                    <p className="p">Free Cetak 2x</p>
                  </li>
                  <li>
                    <p className="p">All softfile</p>
                  </li>
                </ul>
              </div>
              <div>
                <p className="p">55k</p>
              </div>
            </div>

            <div className={card}>
              <div><p className='h3'>berEMPAT</p></div>
              <div>
                <ul>
                  <li>
                    <p className="p text-black">Unlimited Shoot</p>
                  </li>
                  <li>
                    <p className="p text-black">Durasi 10 Menit</p>
                  </li>
                  <li>
                    <p className="p text-black">Maks 4 orang</p>
                  </li>
                  <li>
                    <p className="p text-black">Free Cetak 3x</p>
                  </li>
                  <li>
                    <p className="p text-black">All softfile</p>
                  </li>
                </ul>
              </div>
              <div>
                <p className='p text-black'>65k</p>
              </div>
            </div>

            <div className={`${card} mt-10`}>
              <p className='h3'>berENAM</p>
              <div>
                <ul>
                  <li>
                    <p className="p text-black">Unlimited Shoot</p>
                  </li>
                  <li>
                    <p className="p text-black">Durasi 10 Menit</p>
                  </li>
                  <li>
                    <p className="p text-black">Maks 6 orang</p>
                  </li>
                  <li>
                    <p className="p text-black">Free Cetak 4x</p>
                  </li>
                  <li>
                    <p className="p text-black">All softfile</p>
                  </li>
                </ul>
              </div>
              <div>
                <p className='p text-black'>80k</p>
              </div>
            </div>
          </div>
          <div className='w-full h-20 '></div>
          <div className='w-full h-80 bg-abu2 rounded-tl-md rounded-tr-md mt-10 flex text-white justify-center'>
            <div className='mt-auto md:mt-40 p-2 overflow-hidden'>
              <div><p className='h1 text-center'>Tambahan:</p></div>
              <div className="overflow-hidden">
                <ul className='list-disc space-y-1'>
                  <li><p className="p">Tambah waktu : 10k(5 menit)</p></li>
                  <li><p className="p">Tambah Orang : 10k(per Orang)</p></li>
                  <li><p className="p">Tambah Cetak : 10k(per Lembar)</p></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default index
