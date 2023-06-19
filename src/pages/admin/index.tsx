import { AdminLayout } from '@/components/AdminLayout';
import apiMock from '@/lib/axios-mock';
import { User } from '@/types/auth';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import * as react from 'react';
import ReactPaginate from 'react-paginate';
import styles from './style/Index.module.css'
import clsx from 'clsx';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const index = () => {
  const router = useRouter()
  const [users, setUsers] = react.useState<User[]>([])
  const [page, setPage] = react.useState(0);
  const limit = react.useState(10);
  const [pages, setPages] = react.useState(0);
  const [rows, setRows] = react.useState(0);
  const [keyword, setKeyword] = react.useState("");
  const [msg, setMsg] = react.useState("");
  const [query, setQuery] = react.useState('')
  const [isOpen, setIsOpen] = react.useState(false)
  const [userDel,setUserdel] = react.useState('')
  const getUser = async () => {
    try {
      const response = await apiMock.get('/user')
      setUsers(response.data.data)
      console.log(response.data.data);

    } catch (err) {

    }
  }

  react.useEffect(() => {
    getUser()
  }, [])
  function handlerOnclick() {
    setIsOpen(!isOpen)
  }
  function handlerEditUser(id: string) {
    router.push(`/admin/user/${id}`)
  }
  function deleteUser(id: string) {
    setIsOpen(true)
    setUserdel(id)
  }
  async function deleteUserbyid(e:any){
    try{
      const response = await apiMock.delete(`/user/delete/${userDel}`)
      if(response.data.data){
        toast.success("Berhasil dihapus")
        setIsOpen(false)
      }
    }catch(err){
      toast.error("Terjadi Kesalahan")
    }
  }
  const changePage = ({ selected }: any) => {
    setPage(selected);
    if (selected === 9) {
      setMsg(
        "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMsg("");
    }
  };

  return (
    <AdminLayout>
      <div className="mt-20 min-h-screen">
        <Transition appear show={isOpen} as={react.Fragment}>
          <Dialog as="div" className="relative z-10" onClose={handlerOnclick}>
            <Transition.Child
              as={react.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={react.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Apakah anda yakin?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Anda tidak dapat memulihkan data ini
                      </p>
                    </div>

                    <div className="mt-4 flex space-x-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={e=> deleteUserbyid(e)}
                      >
                        Iya
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handlerOnclick}
                      >
                        Tidak
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <div className="flex flex-col">
          <div className="overflow-x-auto w-full">
            <div className="py-3 pl-2">
              <div className="relative max-w-xs">
                <form>
                  <label htmlFor="hs-table-search" className="sr-only">
                    Search
                  </label>
                  <input
                    type="text"
                    name="hs-table-search"
                    id="hs-table-search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                    placeholder="pencarian..."
                  />
                </form>
              </div>

            </div>

            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
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
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        Edit
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {
                      users.map((data, index) => (
                        <tr key={data.id}>
                          <td className="px-4 py-2 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-800 whitespace-nowrap">
                            {data.username}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-800 whitespace-nowrap">
                            {data.email}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-800 whitespace-nowrap">
                            {data.role}
                          </td>
                          <td className="px-4 py-2 text-sm font-medium text-right whitespace-nowrap">
                            <button onClick={() => handlerEditUser(data.id)}
                              className="text-green-500 hover:text-green-700"
                            >
                              Edit
                            </button>
                          </td>
                          <td className="px-4 py-2 text-sm font-medium text-right whitespace-nowrap">
                            <button onClick={() => deleteUser(data.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    }

                  </tbody>
                </table>
              </div>
              <p className='p text-black'>
                Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
              </p>
              <p className="p text-red-600 ">{msg}</p>
            </div>
          </div>
        </div>
        <nav
          className={`rounded-md shadow-sm ${styles.page}`}
          key={rows}
          role="navigation"
          aria-label="pagination"
        >
          <ReactPaginate
            pageCount={Math.min(10, pages)}
            onPageChange={changePage}
            activeLinkClassName={clsx("is-current")}
            disabledLinkClassName={"pagination-link is-disabled"}

            previousLabel="Previous"
            nextLabel="Next"
            pageClassName=""
            pageLinkClassName={clsx('page-link')}
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            // pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
          // forcePage={pageOffset}
          />
        </nav>
      </div>
    </AdminLayout>
  )
};

export default index;
