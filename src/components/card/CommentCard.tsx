import { Comment } from '@/types/comment'
import Image from 'next/image'
import React from 'react'
interface Card {
    data: Comment
    isUser?: boolean
    handleDelete?: (e:any) => void
    handleEdit?: (e:any) => void
}
const CommentCard: React.FC<Card> = ({
    data,
    handleDelete,
    handleEdit,
    isUser
}) => {
    const date = data.createdAt.split('T')

    return (
        <div>
            <div className="relative w-96 grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
                <div className="relative flex gap-4">
                    <Image width={100} height={100} alt="image" src="/images/default.jpg" className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" loading="lazy" />
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row justify-between">
                            <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">COMMENTOR</p>
                            <a className="text-gray-500 text-xl" href="#"><i className="fa-solid fa-trash"></i></a>
                        </div>
                        <p className="text-gray-400 text-sm">{date[0]}</p>
                    </div>
                </div>
                <p className="-mt-4 text-gray-500">{data.comment}</p>
                {
                    isUser && <div className='flex flex-row space-x-4 p'>
                        <button onClick={handleEdit} className='text-green-400'>Edit</button>
                        <button onClick={handleDelete} className='text-red-600'>Hapus</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default CommentCard