async function carregarValoresGit(){
    const url = 'https://raw.githubusercontent.com/Guspyy/quantoovinideve/refs/heads/main/valores.txt';
    
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('Erro ao carregar o arquivo: ${response.status}');
        }
        const texto = await response.text();
        const valores = texto
            .split('\n')
            .map(valor => {
                if (valor.includes(',')){
                    return parseFloat(valor.replace(',', '.'));
                }
                return parseFloat(valor);
            })
            .filter(Number.isFinite);
        return valores;
    }
    catch (error){
        console.error("Deu erro oh: ", error);
        return[];
    }
}

async function verQuantoDeve(){

    const valores = await carregarValoresGit();
    const total = valores.reduce((soma, valor) => soma + valor, 0);
    
    const txt1 = document.getElementById("money");
    txt1.textContent = `R$${total.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    const txt2 = document.getElementById("moneySub");

    txt1.style.visibility = "visible";
    txt2.style.visibility = "visible";
}

document.addEventListener("DOMContentLoaded", function () {
    const timerElement = document.getElementById("timer");
    const targetDate = new Date("2025-07-07T00:00:00");

    function updateTimer() {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            timerElement.textContent = "DIA DE PAGAMENTO!";
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        timerElement.textContent = `Faltam ${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos restantes para o dia de pagamento rs`;
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Atualiza imediatamente para evitar atraso de 1 segundo
});