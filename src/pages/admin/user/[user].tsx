import { AdminLayout } from '@/components/AdminLayout'
import { User } from '@/types/auth'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import * as react from 'react'
import { toast } from 'react-hot-toast'

const user : NextPage<{user:User}> = ({user}) => {
  const router = useRouter()
  const [name, setName] = react.useState("");
  const [email, setEmail] = react.useState("");
  const [role, setRole] = react.useState("");

  const updateUser = async (e : any ,id : string) => {
    e.preventDefault();
    try {
        await axios.put(`http://localhost:5000/api/user/update/${id}`, {
            name: name,
            email: email,
            role: role,
        });
    router.push('/admin')
    } catch (error) {
        toast.error('Terjadi Kesalahan')
    }
    
};

  return (
    <AdminLayout>
      <div className='text-black w-1/2 border rounded-md shadow-md m-auto mt-20 p-2'>
                <h1 className="">Users</h1>

                <form className='p-2 space-y-2' onSubmit={(e)=>updateUser(e,user.id)}>
                    <div className="">
                        <label className="block text-sm font-medium text-gray-700">Name</label>

                        <input
                            type="text"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            defaultValue={user?.name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />

                    </div>

                    <div className="">
                        <label className="block text-sm font-medium text-gray-700">Email</label>

                        <input
                            type="text"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            defaultValue={user?.email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />

                    </div>

                    <div className="">
                        <label className="block text-sm font-medium text-gray-700">Role</label>

                        <select
                            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            defaultValue={user?.role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>

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
  const response = await axios.get('http://localhost:5000/api/user')
  const paths = response.data.data.data.map((data: any) => ({
      params: { user: data?.id.toString() }
  }))
  return {
      paths,
      fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { user }: any = context.params;
  // console.log(context?.params);

  const res = await axios.get(`http://localhost:5000/api/user/id/${user}`)
  
  // console.log(res.data.data.total == 0);
  if (res.data.data.total == 0) {
      return {
          notFound: true,
      }
  }
  return {
      props: {
          user: res.data.data
      }
  };
}
export default user