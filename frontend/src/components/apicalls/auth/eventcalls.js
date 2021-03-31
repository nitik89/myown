

export const getAllEventManagers = (userId,token) => {
   
    return fetch(`/api/alleventManagers/${userId}`, {
            method: "GET",
            headers: {
               

                
                "Authorization":`Bearer ${token}`

            },



        })
        .then(res => {

            return res.json()
        })
        .catch(err => {
            console.log(err);
        })
}

export const createEvent = (data,userId,token) => {
    console.log(token);
    return fetch(`/api/addEvent/${userId}`, {
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



export const getAllEvents = (userId,token) => {

    return fetch(`/api/getEvents/${userId}`, {
            method: "GET",
            headers: {
                
                "Authorization":`Bearer ${token}`

            },

        })
        .then(res => {

            return res.json()
        })
        .catch(err => {
            console.log(err);
        })
}

export const getEventById = (id,userId,token) => {

    return fetch(`/api/getEvent/${id}/${userId}`, {
            method: "GET",
            headers: {
                
                "Authorization":`Bearer ${token}`

            },

        })
        .then(res => {

            return res.json()
        })
        .catch(err => {
            console.log(err);
        })

}
/////////////////////////////////////////////
export const getAllEventStudents = (userId,token) => {

    return fetch(`/api/allstudents/${userId}`, {
            method: "GET",
            headers: {
                
                "Authorization":`Bearer ${token}`

            },
            

        })
        .then(res => {

            return res.json()
        })
        .catch(err => {
            console.log(err);
        })
}
export const getMyOrders=(id,token)=>{
    
    return fetch(`/api/getMyOrders/${id}`, {
        method: "GET",
        headers: {
                
            "Authorization":`Bearer ${token}`

        },

    })
    .then(res => {
console.log(res);
        return res.json()
    })
    .catch(err => {
        console.log(err);
    })
}
export const deleteEvents=(id,userId,token)=>{
    return fetch(`/api/deleteEvent/${id}/${userId}`, {
        method: "DELETE",
        headers: {
                
            "Authorization":`Bearer ${token}`

        },

    })
    .then(res => {
console.log(res);
        return res.json()
    })
    .catch(err => {
        console.log(err);
    })
}

export const deleteEventManagers=(id,userId,token)=>{
    return fetch(`/api/deleteEventManagers/${id}/${userId}`, {
        method: "DELETE",
        headers: {
                
            "Authorization":`Bearer ${token}`

        },

    })
    .then(res => {
console.log(res);
        return res.json()
    })
    .catch(err => {
        console.log(err);
    })
}

export const getMyStudents=(id,token)=>{
    
    return fetch(`/api/getonlymyStudents/${id}`, {
        method: "GET",
        headers: {
                
            "Authorization":`Bearer ${token}`

        },

    })
    .then(res => {
console.log(res);
        return res.json()
    })
    .catch(err => {
        console.log(err);
    })
    
}