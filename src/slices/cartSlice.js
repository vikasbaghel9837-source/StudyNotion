import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast"

const initialState = {
    totalItems:localStorage.getItem("totalItems")?
            JSON.parse(localStorage.getItem("totalItems")):0,
    cart : localStorage.getItem("cart")?
            JSON.parse(localStorage.getItem("cart")):[],
    total: localStorage.getItem("total")?
            JSON.parse(localStorage.getItem("total")):0,
}

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addToCart: (state,action)=>{
            const course = action.payload
            const index = state.cart.findIndex((item)=> item._id === course._id)

            if(index >= 0){
                // Course is already in the cart
                toast.error("Course already in the cart")
                return ;
            }

            // Course is not in the cart
            state.cart.push(course);

            // Update the total Items and total cart value
            state.totalItems++;
            state.total += course.price

            // Update the local storage
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

            // Show toast
            toast.success("course added to cart");
        },

        // Remove from cart
        removeFromCart : (state,action)=>{
            const courseId = action.payload
            const index = state.cart.findIndex((item)=> item._id === courseId)

            if(index >= 0){
                // Course found in the cart
                state.totalItems--;

                state.total -= state.cart[index].price
                state.cart.splice(index,1)

                // Update to localStorage
                localStorage.setItem("cart" , JSON.stringify(state.cart))
                localStorage.setItem("total" , JSON.stringify(state.total))
                localStorage.setItem("totalItems" , JSON.stringify(state.totalItems))

                // show toast
                toast.success("Course removed from cart")
            }
        },

        resetCart : (state)=>{
            state.cart = []
            state.total = 0
            state.totalItems = 0

            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        }
    }
});

export const {addToCart , removeFromCart , resetCart } = cartSlice.actions;
export default cartSlice.reducer;