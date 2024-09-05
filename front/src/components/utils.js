export const prepareDataForBackend = (sequenciaEscolhida) => {
    const backendData = {};

    sequenciaEscolhida.forEach(semanaObj => {
        const [semana, atividades] = Object.entries(semanaObj)[0];
        const weekKey = `week_${semana.split(' ')[1]}`;
        const atividadesStr = atividades.map(atividade => 
        `${atividade.nome}(${atividade.isCheck})`
        ).join(', ');

        backendData[weekKey] = atividadesStr;
    });

    return backendData;
};

export function transformData(input) {
    const result = [];

    for (let i = 1; i <= 8; i++) {
        const weekKey = `week_${i}`;
        if (input[weekKey]) {
            const [nome, isCheckStr] = input[weekKey].split('(');
            const isCheck = isCheckStr && isCheckStr.replace(')', '').trim() === 'true';
            
            const formattedNome = nome.trim();
            const formattedValue = formattedNome.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');

            result.push({
                [`Semana ${i}`]: [
                    {
                        nome: formattedNome,
                        value: formattedValue,
                        isCheck: isCheck
                    }
                ]
            });
        }
    }

    return result;
}


export const calcularProgresso = (sequenciaEscolhida) => {
    let totalAtividades = 0;
    let atividadesConcluidas = 0;

    sequenciaEscolhida.forEach(semanaObj => {
        const atividades = Object.values(semanaObj)[0];
        totalAtividades += atividades.length;
        atividades.forEach(atividade => {
        if (atividade.isCheck) {
            atividadesConcluidas++;
        }
        });
    });

    const percentual = (atividadesConcluidas / totalAtividades) * 100;
    return Math.round(percentual); // Arredondar para o inteiro mais próximo
};
