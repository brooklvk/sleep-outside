<script>
    import { login } from "../auth.mjs";
    import { getParam } from "../utils.mjs";

    let email;
    let password;

    let creds = {
        email: email,
        password: password
    };

    const redirect = getParam("redirect");

    export function handleLogin(creds, redirect) {
        console.log("does this even run");
        login(creds, redirect);
    }
</script>

<fieldset>
    <label for="email">Email: <input name="email" type="email" bind:value="{email}" required></label>
    <label for="password">Password: <input name="password" type="password" bind:value="{password}" required></label>
    <button type="submit" id="loginButton" on:click={handleLogin}>Login</button>
</fieldset>
