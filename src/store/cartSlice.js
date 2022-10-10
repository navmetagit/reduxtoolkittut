import {createSlice} from '@reduxjs/toolkit'

// const initialState =[]; //or can directy give inside

const cartSlice = createSlice({
    name : 'cart',
    initialState:[],

    reducers :{ //reducers are pure fn i.e. they dont change data outside them.
        add(state,action){
            //redux: shouldnt mutate state directly

            //but in redux toolkit its allowed because of
            // createslice , which allows to mutate state directly
            state.push(action.payload);
        },
        remove(state,action){
            // state = state.filter((item) => item.id !== action.payload)  //wrong to assign value to state, which is a local property
            return state.filter((item) => item.id !== action.payload)  

        },
    }
    
})
//redux toolkit makes both reducers and actions for us
export const {add,remove} = cartSlice.actions;

export default cartSlice.reducer;