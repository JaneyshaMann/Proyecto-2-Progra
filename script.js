document.addEventListener("DOMContentLoaded", () => {
    const apiKey = 'TU_API_KEY'; // Reemplaza con tu API key
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`; // Ejemplo de API gratuita

    // Referencias a elementos HTML
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const resultText = document.getElementById('result');
    const convertBtn = document.getElementById('convertBtn');

    // Obtener y cargar las opciones de monedas
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                const option2 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                option2.value = currency;
                option2.textContent = currency;
                fromCurrency.appendChild(option1);
                toCurrency.appendChild(option2);
            });
        })
        .catch(error => console.error('Error al cargar las monedas:', error));

    // Evento al hacer clic en el botón de conversión
    convertBtn.addEventListener('click', () => {
        const amount = amountInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (!amount || isNaN(amount)) {
            resultText.textContent = 'Por favor, introduce una cantidad válida.';
            return;
        }

        // Obtener el tipo de cambio y calcular la conversión
        fetch(`${apiUrl}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[to] / data.rates[from];
                const convertedAmount = (amount * rate).toFixed(2);
                resultText.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
            })
            .catch(error => {
                console.error('Error al realizar la conversión:', error);
                resultText.textContent = 'Error en la conversión.';
            });
    });
});
