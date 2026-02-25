"use client";

import {

createContext,
useContext,
useState,

} from "react";

import { CartItemType } from "@/types/cart";
import { demoCart } from "@/lib/cart-data";

interface CartContextType {

cart: CartItemType[];

open: boolean;

toggleCart: () => void;

removeItem: (id:number)=>void;

}

const CartContext =
createContext<CartContextType | null>(null);

export function CartProvider({

children,

}:{
children:React.ReactNode;
}){

const [cart,setCart] =
useState<CartItemType[]>(demoCart);

const [open,setOpen]=useState(false);

function toggleCart(){

setOpen(!open);

}

function removeItem(id:number){

setCart(prev =>
prev.filter(item=>item.id!==id)
);

}

return(

<CartContext.Provider
value={{
cart,
open,
toggleCart,
removeItem,
}}
>

{children}

</CartContext.Provider>

);

}

export function useCart(){

const context = useContext(CartContext);

if(!context)
throw new Error("Cart error");

return context;

}