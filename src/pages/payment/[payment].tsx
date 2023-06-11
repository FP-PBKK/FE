import { Layout } from '@/components/Layout'
import apiMock from '@/lib/axios-mock'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useQRCode } from 'next-qrcode'
import { useRouter } from 'next/router'
import * as react from 'react'

type Transaction = {
    id: string,
    total: number,
    paid: number,
    qrId: string,
    bookingId: string,
    discountId: string
}

const arr = [
    { key: 'name', value: 'bobby hadz' },
    { key: 'country', value: 'Chile' },
];
const Payment: NextPage<{ url: Transaction }> = ({ url }) => {
    const [qrString, setQrString] = react.useState()
    const router = useRouter()
    const { Image } = useQRCode();
    const getQr = async () => {
        const response = await axios.get(`http://localhost:5000/api/transaction/getqr/${url.qrId}`)
        setQrString(response.data.qr_string);
    }
    react.useEffect(() => {
        getQr()
    }, [qrString])
    return (
        <Layout>
            <div className='flex flex-col justify-center items-center min-h-main'>
                <p>{url.id}</p>
                <p>{url.qrId}</p>
                {
                    qrString ? <Image
                        text={qrString}
                        options={{
                            type: 'image/jpeg',
                            quality: 0.3,
                            level: 'M',
                            margin: 3,
                            scale: 4,
                            width: 200,
                        }}
                    /> : <p className='p'>Loading....</p>
                }

                <p className='h4'>Scan di atas Untuk Membayar</p>
            </div>
        </Layout>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    const response = await axios.get('http://localhost:5000/api/transaction')
    const paths = response.data.data.map((data: any) => ({
        params: { payment: data?.id.toString() }
    }))
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { payment }: any = context.params;
    // console.log(context?.params);

    const res = await axios.get(`http://localhost:5000/api/transaction/id/${payment}`)
    // console.log(res.data.data.total == 0);
    if (res.data.data.total == 0) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            url: res.data.data
        }
    };
}

export default Payment