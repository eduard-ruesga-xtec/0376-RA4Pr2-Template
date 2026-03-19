// VARIABLES GLOBALS
const selects = document.querySelectorAll(".code-input");
const btnEnviar = document.getElementById("btn-enviar");
const terminal = document.getElementById("terminal");
const rondesSpan = document.getElementById("rondes-restants");

let rondes = logica.getRondesMax();


// OMPLIR SELECTS (0-9)
function inicialitzarSelects() {
    selects.forEach(select => {
        for (let i = 0; i <= 9; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            select.appendChild(option);
        }
    });
}


//  Terminal
function logTerminal(missatge, tipus = "normal") {
    const line = document.createElement("p");
    line.classList.add("line");

    if (tipus === "error") line.classList.add("error");
    if (tipus === "success") line.classList.add("success");

    line.textContent = "> " + missatge;

    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}


// Botón 
btnEnviar.addEventListener("click", () => {

    if (rondes <= 0) {
        logTerminal("NO QUEDEN RONDES.", "error");
        return;
    }

    const input = [];
    selects.forEach(select => {
        input.push(Number(select.value));
    });

    logTerminal("Intent: " + input.join(" "));

    const resultat = logica.compararCodis(input, logica.getCodiSecret());
    logTerminal("Resultat: " + resultat);

    if (resultat === "1 1 1 1") {
        logTerminal("ACCESS GRANTED. CODI CORRECTE!", "success");
        rondes = 0;
        rondesSpan.textContent = rondes;
        return;
    }

    rondes--;
    rondesSpan.textContent = rondes;

    if (rondes === 0) {
        logTerminal("SYSTEM LOCKED. HAS PERDUT.", "error");
        logTerminal("El codi era: " + logica.getCodiSecret().join(" "), "error");
    }
});


inicialitzarSelects();