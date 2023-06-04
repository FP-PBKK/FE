import { Layout } from '@/components/Layout'
import withAuth from '@/components/hoc/withAuth'
import useBookStore from '@/store/useBookStore'
import * as react from 'react'
export default withAuth(next,'all')
function next () {
  const loadData = useBookStore.useGetData()
  react.useEffect(()=>{
    loadData()
  },[])
  const data = useBookStore.useData()
  console.log(data);
    
  return (
    <Layout>
      <div>{data?.tanggal}</div>
    </Layout>
    
  )
}
