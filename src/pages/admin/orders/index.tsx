import { AdminLayout } from '@/components/AdminLayout'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import * as react from 'react'
import styles from '../style/Index.module.css'
import { Transaction } from '@/types/transaction'
import apiMock from '@/lib/axios-mock'
import clsx from 'clsx'
import ReactPaginate from 'react-paginate';
const index = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = react.useState(false)
  const [page, setPage] = react.useState(0);
  const limit = react.useState(10);
  const [pages, setPages] = react.useState(0);
  const [rows, setRows] = react.useState(0);
  const [keyword, setKeyword] = react.useState("");
  const [msg, setMsg] = react.useState("");
  const [query, setQuery] = react.useState('')
  const [transaction,setTransaction] = react.useState<Transaction[]>([])

  const getTransaction = async () => {
    try {
      const response = await apiMock.get('/transaction')
      setTransaction(response.data.data)
      console.log(response.data.data);

    } catch (err) {

    }
  }

  react.useEffect(() => {
    getTransaction()
  }, [])
  function handlerOnclick() {
    setIsOpen(!isOpen)
  }
  function handlerEditTransaction(id: string) {
    router.push(`/admin/orders/${id}`)
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
                        onClick={handlerOnclick}
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
                        Diskon
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {
                      transaction.map((data, index) => (
                        <tr key={data.id}>
                          <td className="px-4 py-2 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-800 whitespace-nowrap">
                            {data.bookingId}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-800 whitespace-nowrap">
                            {data.total}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-800 whitespace-nowrap">
                            {data.discountId}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-800 whitespace-nowrap">
                            {data.paid == 1 ? 'Lunas' : "Belum Lunas"  }
                          </td>
                          <td className="px-4 py-2 text-sm font-medium text-right whitespace-nowrap">
                            <button onClick={() => handlerEditTransaction(data.id)}
                              className="text-green-500 hover:text-green-700"
                            >
                              Edit
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
}

export default index