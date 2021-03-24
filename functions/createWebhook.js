import baseURL from "./baseURL"

export default async function(projectid, targeturl, buglevel, context){
    const token = context.$store.state.token;
    context.$axios.setHeader("token", token)
    var apiUrl = `${baseURL}/webhooks/create`;
    var response = undefined;
    try {
        response = await context.$axios.$post(
            apiUrl,
            {
                projectid: projectid,
                targeturl: targeturl,
                buglevel: buglevel
            }
        )
    } catch (error) {
        if(error?.response?.status == 401){
            context.$store.dispatch('logout');
            context.$router.push('/login')
            return [false, "Login Again."]
        }
    }
    if(response.STATUS == "OK"){
        return [true, response.WEBHOOK]
    }
    else if(response.STATUS == "FAIL"){
        return [false, response.MSG]
    }
}