import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:[],
    issaving: false,
    errormsg: null,
    
}

const studentlogins = createSlice({
    name:"admins",
    initialState,

    reducers:{
        saving:(state)=>{
            state.value= []
            state.issaving = true
            state.errormsg = null
        },
        successful:(state, actions)=>{
            state.value= actions.payload
            state.issaving = false
            state.errormsg = null
        },

        failed:(state, actions)=>{
            state.value= []
            state.issaving = true
            state.errormsg = actions.payload
            
        }
    }
})

export default studentlogins.reducer
export const {saving, successful, failed} = studentlogins.actions