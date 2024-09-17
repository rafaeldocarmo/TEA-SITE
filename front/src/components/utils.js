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
            // Divide as atividades por semana usando a vírgula como delimitador
            const activities = input[weekKey].split(',').map(activity => activity.trim());
            
            const formattedActivities = activities.map(activity => {
                const [nome, isCheckStr] = activity.split('(');
                const isCheck = isCheckStr && isCheckStr.replace(')', '').trim() === 'true';
                
                const formattedNome = nome.trim();
                const formattedValue = formattedNome.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');

                return {
                    nome: formattedNome,
                    value: formattedValue,
                    isCheck: isCheck
                };
            });

            // Adiciona ao resultado
            result.push({
                [`Semana ${i}`]: formattedActivities
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

export const fetchData = async (url, method = 'GET', body = null, token = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        ...(body && { body: JSON.stringify(body) })
    };

    try {
        const response = await fetch(url, options);

        return await response.json();
    } catch (error) {
        console.log(`Error fetching data from ${url}:`, error);
        throw error;
    }
};

