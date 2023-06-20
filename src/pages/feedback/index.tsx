import { Layout } from '@/components/Layout'
import CommentCard from '@/components/card/CommentCard'
import withAuth from '@/components/hoc/withAuth'
import apiMock from '@/lib/axios-mock'
import useAuthStore from '@/store/useAuthStore'
import { Comment } from '@/types/comment'
import { useRouter } from 'next/router'
import * as react from 'react'
import { toast } from 'react-hot-toast'
export default withAuth(index,"optional")
function index () {
    const user = useAuthStore.useUser()
    const isAuth = useAuthStore.useIsAuthenticated()
    const router = useRouter()
    
    const [data, setData] = react.useState<Comment[]>([])
    const getComment = async () => {
        try {
            const response = await apiMock.get('/booking/feedbacks')
            setData(response.data.data)
        } catch (err) {
            toast.error("Terjadi Kesalahan")
        }

    }
    react.useEffect(() => {
        getComment()
    }, [])

    function handleOnclick (id : string | undefined){
        if(id){
            router.push(`feedback/${id}`)
        }  
    }
    return (
        <Layout>
            <div className='flex justify-center items-center flex-col min-h-main mt-12'>
                {
                    isAuth && <div className='p mb-4'><button onClick={(e)=>handleOnclick(user?.id)} className='underline'>Lihat komentar saya</button></div>
                }
             
                {
                    data && data.map((comment, index) => {
                        return (
                            <CommentCard key={index} data={comment} />
                        )
                    })
                }
            </div>
        </Layout>
    )
}
