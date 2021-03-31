

export const signup = user => {

    return fetch(`/api/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",

                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            return res.json()
        })
        .catch(err => {
            console.log(err);
        })
}
export const signin = user => {
  
    return fetch(`/api/signin`, {
            method: "POST",
            headers: {
                Accept: "application/json",

                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)

        })
        .then(res => {
            return res.json()
        })
        .catch(err => {
            console.log(err);
        })
}