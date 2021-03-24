import baseURL from "./baseURL"

export default async function(context){
    const token = context.$store.state.token;
    context.$axios.setHeader("token", token)
    var apiUrl = `${baseURL}/projects/all`;
    var response = undefined;
    try {
        response = await context.$axios.$get(
            apiUrl
        )
    } catch (error) {
        if(error?.response?.status == 401){
            context.$store.dispatch('logout');
            context.$router.push('/login')
            return [false, "Login Again."]
        }
    }
    if(response.STATUS == "OK"){
        return [true, response.DATA]
    }
    else if(response.STATUS == "FAIL"){
        return [false, response.MSG]
    }
}