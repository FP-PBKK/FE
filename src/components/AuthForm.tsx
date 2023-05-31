'use client';

import axios from "axios";
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import useAuthStore from '@/store/useAuthStore';

import { Toaster, toast } from "react-hot-toast";
import Input from "./form/Input";
import Button from "./form/Button";
import { DEFAULT_TOAST_MESSAGE } from "@/constant/toast";
import { ApiReturn } from "@/types/api";
import { User } from "@/types/auth";
import apiMock from "@/lib/axios-mock";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore.useLogin();

 

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    let tempToken: string;
  
    if (variant === 'REGISTER') {
      
    }

    if (variant === 'LOGIN') {
      toast.promise(
        apiMock.post(`/login`, data)
          .then((res) => {
            const { token } = res.data.data;
            tempToken = token;
            localStorage.setItem('token', token);
  
            return apiMock.get<ApiReturn<User>>('/whoami');
          })
          .then((user) => {
            
            login({
              ...user.data.data,
              token: tempToken,
            });
          }),
        {
          ...DEFAULT_TOAST_MESSAGE,
          success: 'Successfully logged in',
        }
      );
      setIsLoading(false)
      router.push("./")
      
    }
  }



  return ( 
    
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <Toaster/>
      <div 
        className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10"
      >
        <form 
          className="space-y-6" 
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name" 
              label="Name"
            />
          )}
          <Input 
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email" 
            label="Email address" 
            type="email"
          />
          <Input 
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password" 
            label="Password" 
            type="password"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
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
          <div>
            {variant === 'LOGIN' ? 'New to Pose Palace?' : 'Already have an account?'} 
          </div>
          <div 
            onClick={toggleVariant} 
            className="underline cursor-pointer"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default AuthForm;