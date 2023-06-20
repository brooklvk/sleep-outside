import { renderHeaderFooter, getParam } from "./utils.mjs";
import { login } from "./auth.mjs";

renderHeaderFooter();

const redirect = getParam("redirect");
document.querySelector("#loginButton").addEventListener("click", (e) => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    // { email: "user1@email.com" , password: "user1" };

    login({email, password}, redirect);
});
