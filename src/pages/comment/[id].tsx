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
        const response = await apiMock.get(`/booking/booking/user/${params}`)
        console.log(response);
        
        setIdu(response.data.data[0].idUser)
        setDatab(response.data.data[0].id)
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
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            user_id: "",
            booking_id: "",
            comment: "sasaas",
            rate: '5'
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        toast.promise(
            apiMock.post(`/booking/feedback`, data)
                .then((res) => {

                }),
            {
                ...DEFAULT_TOAST_MESSAGE,
                success: 'Account Successfully Created',
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
             
                    <input value={idu} {...register("user_id")} className='hidden'></input>
                    <input value={datab} {...register("booking_id")} className='hidden' ></input>
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
                    <textarea className='w-full border h-44'  {...register("comment", { required: true })}></textarea>
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