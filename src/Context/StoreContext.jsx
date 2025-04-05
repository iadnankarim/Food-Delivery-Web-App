import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";


export const StoreContext = createContext(null)


const StoreContextProvider = (props)=>{
  // console.log("food_list:", food_list); // Add this line

  const [cartItems,setCartItems]= useState({})

  //first time card create krha hai 
  //else mai card already hai tuo wo +1 krha hai
  const addToCart = (itemId)=>{
    
      if(!cartItems[itemId]){
        setCartItems((prev)=>({...prev,[itemId]:1}))
      }else{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
      }
  };
  
  //remove 
  const removeFromCart=(itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
  }

  //when the carditem update card state 
  // useEffect(()=>{
  //   console.log(cartItems)
  // },[cartItems])

  const getTotalCartAmount = () => {
    let totalAmount = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item)
        totalAmount += itemInfo.price * cartItems[item]
      }
    }
    return totalAmount
  }



  const contextValue={
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount
  }

  return(
    <StoreContext.Provider value={contextValue}>
       {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider