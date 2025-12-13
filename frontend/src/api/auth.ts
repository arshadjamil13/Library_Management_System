export async function signIn(data: {email: string; password: string}){
    try {
       const API_URL = import.meta.env.VITE_API_URL
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(data)
    
    })
    if(!response.ok){
        throw new Error("Failed to sign in");
    }
    return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function signUp(data: {name: string; email: string; password: string}){
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        })

        if(!response.ok){
            throw new Error("Failed to sign up");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}