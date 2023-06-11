import Button from '@/components/form/Button';
import Input from '@/components/form/Input';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import apiMock from '@/lib/axios-mock';
import { useRouter } from 'next/router'
import { stringify } from 'querystring';
import * as react from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';

const index = () => {
    const router = useRouter()
    const [idu, setIdu] = react.useState('')
    const [datab, setDatab] = react.useState('')

    async function getData(params:string) {
        const response = await apiMock.get(`/booking/booking/id/${params}`)
        console.log(response.data.data.idUser);
        
        setIdu(response.data.data.idUser)
        setDatab(response.data.data.id)
    }
    react.useEffect(() => {
        if(router.query.id){
            const {id} = router.query
            getData(id.toString())
        }
        
    }, [router.query])

    const [isLoading, setIsLoading] = react.useState(false);
    const {
        register,
        handleSubmit,
    } = useForm<FieldValues>({
        defaultValues: {
            comment: "",
            rate: '5'
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const formSend = {
            user_id : idu,
            booking_id:datab,
            comment : data.comment,
            rate : data.rate
        }

        toast.promise(
            apiMock.post(`/booking/feedback`, formSend)
                .then((res) => {
                    apiMock.put(`/booking/booking_status/${datab}`,{
                        status:"finish"
                    })
                }).then(()=>{
                    router.push('/feedback')
                }),
            {
                ...DEFAULT_TOAST_MESSAGE,
                success: 'Komentar Berhasil Dibuat',
            }
        );

    }
    const handleOnclick = () => {
        router.push('/')
    }
    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <Toaster />
            <div
                className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10"
            >
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <p className='h2 text-center'>Feedback</p>
                    <div>
                    <label 
                            className="
                            block 
                            text-sm 
                            font-medium 
                            leading-6 
                            text-gray-900
                            "
                        > Komentar
        
                         </label>
                    <textarea className='w-full border h-44 p-1'  {...register("comment", { required: true })} placeholder='isikan komentar.....'></textarea>
                    </div>
                    <div>
                    <label 
                            className="
                            block 
                            text-sm 
                            font-medium 
                            leading-6 
                            text-gray-900
                            "
                        > Rating
        
                         </label>
                    <input type='number' min={0} max={5} placeholder='isi 1-5' {...register("rate", { required: true })}>
                    </input>
                    </div>
                   
                    <div>
                        <Button disabled={isLoading} fullWidth type="submit">
                            Kirim
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div
                            className="absolute inset-0 flex items-center "
                        >
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">

                        </div>
                    </div>
                </div>
                <div
                    className="flex justify-center gap-2 px-2 mt-6 text-sm text-gray-500 "
                >
                    <Button fullWidth onClick={handleOnclick}>
                        Lewati
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default index