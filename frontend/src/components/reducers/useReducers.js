export let initialState = null;

export const reducer = (state, action) => {
    if (action.type === 'USER') {
        initialState = action.payload

        return initialState;
    }
    if (action.type === 'CLEAR') {
        return null;
    }
    if (action.type === 'ADDTOCART') {

        return {...state, cart: [...action.payload] }
    }
    if(action.type==='CLEARCART'){
       
        return {...state,cart:[]};
    }
    if(action.type==='REMOVEFROMCART'){
        const id=action.payload;
        const newCart=state?.cart.filter(evnts=>{
            return evnts._id!=id
        })
        localStorage.setItem("cart",JSON.stringify(newCart));
        return {...state, cart: newCart}

    }

    return state;
}