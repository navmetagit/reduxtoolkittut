import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

export const STATUSES = Object.freeze({    //read only and cant change from outside
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },

    //------for first fetchproducts======//////////////////
    reducers: { //reducers are pure fn i.e. they dont change data outside them.
        setProducts(state, action) {
            //dont do this - NEVER
            //not any async call should be there in reducers
            //as they are pure fn and have no side effects
            //that could be sorted out with thunk middleware/middleware
            // const res = await fetch('https://fakestoreapi.com/products');
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
     
    }
    /////========end of firstfetchproducts======//////////////////
// ,
 //------for second fetchproducts======//////////////////
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchProducts.pending, (state, action) => {
    //             state.status = STATUSES.LOADING;
    //         })
    //         .addCase(fetchProducts.fulfilled, (state, action) => {
    //             state.data = action.payload;
    //             state.status = STATUSES.IDLE;
    //         })
    //         .addCase(fetchProducts.rejected, (state, action) => {
    //             state.status = STATUSES.ERROR;
    //         });
    // },
 /////========end of secondfetchproducts======//////////////////
})
export const { setProducts,setStatus } = productSlice.actions;

export default productSlice.reducer;

//thunk is a fn , which returns a fn
// two ways: 

// 2nd way:
// export const fetchProducts = createAsyncThunk('products/fetch', async ()=>{ //for better error handling
//         const res = await fetch('https://fakestoreapi.com/products')
         
//         const data = await res.json();
//         return data;
// })


// 1st way
export function fetchProducts(){
    return async function fetchProductThunk(dispatch,getState){ //getstate for getting current state like parameters for passing to api

       dispatch(setStatus(STATUSES.LOADING))
       const prop = getState()
       console.log('props see: ',prop);
       try{
           const res = await fetch('https://fakestoreapi.com/products')
         
           const data = await res.json();
           dispatch(setProducts(data))
           dispatch(setStatus(STATUSES.IDLE))
        }
        catch(err){
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR))

        }
    }
}