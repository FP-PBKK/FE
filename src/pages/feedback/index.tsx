import { Layout } from '@/components/Layout'
import CommentCard from '@/components/card/CommentCard'
import apiMock from '@/lib/axios-mock'
import { Comment } from '@/types/comment'
import * as react from 'react'
import { toast } from 'react-hot-toast'

const index = () => {

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

    return (
        <Layout>
            <div className='flex justify-center items-center flex-col mt-16'>
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

export default index