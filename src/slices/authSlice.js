import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData : null,
    loading:false,
    token: localStorage.getItem("token") ?(localStorage.getItem("token")) : null,
}
// console.log("Token from auth Slice:" , initialState.token)
const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state,value){
            state.token = value.payload;
        },
        setSignupData(state,value){
            state.signupData = value.payload
        },
        setloading(state,value){
            state.loading = value.payload
        }
    }
});
 
export const {setToken , setSignupData , setloading} = authSlice.actions;
export default authSlice.reducer;