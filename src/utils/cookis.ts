'use server'
import { cookies } from "next/headers"


export const setCookie = async (name: string, value: string, days: number) => {
   await  cookies().set(name, value, {maxAge: 60 * 60 * 24 * days})
}

export const getCookie = async () => {
   const cookieStore = cookies()
   const token = await cookieStore.get("AUTH_TOKEN")?.value ?? '1'
   return token
}

export const deleteCookie = async () => {
   const cookieStore = cookies()
   await cookieStore.delete("AUTH_TOKEN")
}