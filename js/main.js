import { SendMail } from "./components/mailer.js";
const form_data = document.getElementById("form_data");

(() => {
    const { createApp } = Vue;

    createApp({
        data() {
            return {
                message: "Hello Vue!",
            };
        },

        methods: {
            processMailFailure(result) {
                let parsedResponse = JSON.parse(result.message).message;
                form_data.innerHTML = "";
                for (const message of parsedResponse) {
                    form_data.innerHTML += message + "<br>";

                    {
                        console.log(result);
                        form_data.innerHTML = result.message;
                        this.$refs.firstname.classList.add("error");
                        this.$refs.lastname.classList.add("serror");
                        this.$refs.email.classList.add("error");
                        this.$refs.message.classList.add("error");
                    }
                }

                
            },

            processMailSuccess(result) {
                console.log(result);
                form_data.innerHTML = result.message;
                this.$refs.firstname.classList.add("success");
                this.$refs.lastname.classList.add("success");
                this.$refs.email.classList.add("success");
                this.$refs.message.classList.add("success");
            },

            

            



            processMail(event) {
                SendMail(this.$el.parentNode)
                    .then((data) => this.processMailSuccess(data))
                    .catch((err) => this.processMailFailure(err));
            },
        },
    }).mount("#mail-form");
})();
