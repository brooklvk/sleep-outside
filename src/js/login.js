import { renderHeaderFooter } from "./utils.mjs";
import LoginForm from "./components/LoginForm.svelte";

renderHeaderFooter();

const form = new LoginForm({
    target: document.querySelector(".login-form"),
});

export default form;