import baseURL from "./baseURL"

export default async function(accessrights, projectid, validtill, context){
    const token = context.$store.state.token;
    context.$axios.setHeader("token", token)
    var apiUrl = `${baseURL}/authentication/tokens/create`;
    var response = undefined;
    try {
        response = await context.$axios.$post(
            apiUrl,
            {
                access_rights: accessrights,
                project_id: projectid,
                valid_till: validtill
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
        return [true, response.TOKEN]
    }
    else if(response.STATUS == "FAIL"){
        return [false, response.MSG]
    }
}