import { AdminLayout } from '@/components/AdminLayout'
import { Transaction } from '@/types/transaction'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import * as react from 'react'
import { toast } from 'react-hot-toast'

const order: NextPage<{ transaction: Transaction }> = ({ transaction }) => {
  const [lunas, setLunas] = react.useState("")
  const updateTrans = async (e: any, id: string) => {
    e.preventDefault();
    console.log(lunas);
    
    try {
      const res = await axios.put(`http://localhost:5000/api/transaction/${id}`, {
        paid: lunas
      });
      console.log(res.data);
      
      toast.success("sukses")

      // navigate("/listorder");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AdminLayout>

      <div className='text-black m-auto mt-20 w-1/2'>
        <h1 className="">Update Order</h1>

        <form onSubmit={(e) => updateTrans(e, transaction.id)}>
          <div className="mt-10">
            <label className="h2 text-black">Status</label>
            <div className="">
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select className='class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"'
                  defaultValue={transaction?.id ? "1" : "0"}
                  onChange={(e) => setLunas(e.target.value)}
                >
                  <option value="0">Belum Lunas</option>
                  <option value="1">lunas</option>
                </select>
              </div>

            </div>
          </div>
          <div className="mt-10">
            <button type="submit" className="border rounded-md p-2 hover:bg-slate-200">
              Update
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}


export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get('http://localhost:5000/api/transaction?page=0&size=10')
  const paths = response.data.data.data.map((data: any) => ({
    params: { order: data?.id.toString() }
  }))
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { order }: any = context.params;
  // console.log(context?.params);

  const res = await axios.get(`http://localhost:5000/api/transaction/id/${order}`)
  // console.log(res.data.data.total == 0);
  if (res.data.data.total == 0) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      transaction: res.data.data
    }
  };
}

export default order