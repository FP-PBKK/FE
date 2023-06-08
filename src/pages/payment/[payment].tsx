import { Layout } from '@/components/Layout'
import apiMock from '@/lib/axios-mock'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import * as react from 'react'

type Transaction = {
    id: string,
    total: number,
    paid: number,
    qrisId: string,
    discountId: string
}

const arr = [
    {key: 'name', value: 'bobby hadz'},
    {key: 'country', value: 'Chile'},
  ];

const Payment: NextPage<{ url: Transaction }> = ({ url }) => {

    const getQr = async ()=>{
        const response = await axios.get(`http://localhost:5000/api/transaction/getqr/${url.qrisId}`)
        console.log(response.data.data);
        
    }
    react.useEffect( ()=>{
        getQr()
    },[])
    return (
        <Layout>
            <p>{url.id}</p>
        </Layout>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    const response = await axios.get('http://localhost:5000/api/transaction')
    const paths = response.data.data.map((data: any) => ({
        params: {payment:data?.id.toString()}
    }))
    return {
        paths,
        fallback : true
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { payment }: any = context.params;
    console.log(context?.params);

    const res = await axios.get(`http://localhost:5000/api/transaction/${payment}`)
    console.log(res.data.data);
    if (!res) {
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