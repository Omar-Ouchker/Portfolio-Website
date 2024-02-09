// Enclosing the entire code in an immediately-invoked function expression (IIFE)
(function(){
    // Array of font styles to be used in captcha generation
    const fonts = ["cursive", "sans-serif", "serif", "monospace"];
    
    // Variable to store the generated captcha value
    let captchaValue = "";

    // Function to generate a new captcha value
    function generateCaptcha(){
        // Generating a random value and converting it to base64
        let value = btoa(Math.random() * 1000000000);

        // Taking a substring of the generated value to create a 5 to 10 character captcha
        value = value.substr(0, 5 + Math.random() * 5);

        // Assigning the generated captcha value to the variable
        captchaValue = value;
    }

    // Function to set the captcha in the HTML
    function setCaptcha(){
        // Generating HTML for each character in the captcha value
        let html = captchaValue.split("").map((char)=>{
            // Generating a random rotation angle for the character
            const rotate = -20 + Math.trunc(Math.random() * 30);

            // Selecting a random font style for the character
            const font = Math.trunc(Math.random() * fonts.length);

            // Creating a span element with inline styles for rotation and font-family
            return `<span
                style="
                    transform:rotate(${rotate}deg);
                    font-family:${fonts[font]}
                "
            >${char}</span>`;
        }).join("");

        // Setting the generated HTML in the specified element
        document.querySelector(".login-form .captcha .preview").innerHTML = html;
    }

    // Function to initialize the captcha generation
    function initCaptcha(){
        // Adding a click event listener to the captcha refresh button
        document.querySelector(".login-form .captcha .captcha-refresh").addEventListener("click", function(){
            // Generating a new captcha value
            generateCaptcha(); 
            // Setting the new captcha in the HTML
            setCaptcha();
            // Displaying an alert to indicate the completion
            alert("done");
        });

        // Generating an initial captcha value and setting it in the HTML
        generateCaptcha(); 
        setCaptcha();
    }

    // Initializing the captcha generation when the page loads
    initCaptcha();

    // Adding a click event listener to the login button
    document.querySelector(".login-form #login-btn").addEventListener("click", function(){
        // Retrieving the user's input for the captcha
        let inputCaptchaValue = document.querySelector(".login-form .captcha input").value;

        // Checking if the input matches the generated captcha value
        if (inputCaptchaValue == captchaValue) {
            // Displaying a success message if the captcha is correct
            window.location.href = "./indeex.html";;
        } else {
            // Displaying an error message if the captcha is incorrect
            alert("Invalid Captcha");
        }
    });
})();
