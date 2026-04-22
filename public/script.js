async function sendMessage() {
    const input = document.getElementById("userInput").value;
    const output = document.getElementById("output");

    output.innerHTML = "Loading...";

    const response = await fetch("/ask-ai", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
    });

    const data = await response.json();

    output.innerHTML = data.reply;
}