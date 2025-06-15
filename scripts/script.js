async function carregarValoresGit(){
    const url = 'https://raw.githubusercontent.com/Guspyy/quantoDeve/refs/heads/main/valoresDeve';
    
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