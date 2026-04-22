async function sendMessage() {
    const input = document.getElementById("userInput").value;
    const output = document.getElementById("output");

    if (input.trim() === "") return;

    output.innerHTML += "\n\n🧑 You:\n" + input + "\n\n⏳ AI is thinking...\n";

    document.getElementById("userInput").value = "";

    const response = await fetch("/ask-ai", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: input
        })
    });

    const data = await response.json();

    output.innerHTML += "\n🤖 AI:\n" + data.reply + "\n";
    output.scrollTop = output.scrollHeight;
}