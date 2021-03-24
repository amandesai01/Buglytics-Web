import baseURL from "./baseURL";

export default async function(email, password, context) {
    context.$axios.setHeader('Content-Type', 'application/json')
    const response = await context.$axios.$post(
        `${baseURL}/authenticate/organization`,
        {
            email: email,
            password: password
        }
    );
    if (response.STATUS == "OK") {
        context.$store.dispatch('setToken', response.TOKEN)
        return [true, undefined]
    }
    else if (response.STATUS == "FAIL") {
        return [false, response.MSG]
    }
    return [false, "Problem with API call. Contact Developers."]
}