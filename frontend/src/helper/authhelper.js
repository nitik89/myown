import { API } from "../components/basic/backend";



export const signout = ()=> {
    if (typeof window !== "undefined") {
        const jwt=localStorage.getItem("jwt")
        if(jwt){
            localStorage.removeItem("jwt");
        }
        const cart=localStorage.getItem("cart")
        if(cart){
            localStorage.removeItem("cart");
        }
        const user=localStorage.getItem("user")
        if(user){
            localStorage.removeItem("user");
        }
       
      
        return fetch(`${API}auth/signout`, {
                method: "GET"

            })
            .then(res => {
                return res.json()
            })
            .catch(err => console.log(err));
    }
}
