

export const loadCart = next => {
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
            next();
        }
    }
}
export const orderMyEvents = (data, id,token) => {


    return fetch(`/api/order/create/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",

                "Content-Type": "application/json",
                
                    "Authorization":`Bearer ${token}`
        
                
            },
            body: JSON.stringify(data)

        })
        .then(res => {
            return res.json()
        })
        .catch(err => {
            console.log(err);
        })
}