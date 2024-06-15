document.addEventListener('DOMContentLoaded', function() {
    const cronometros = [
        { id: 1, elemento: document.getElementById('cronometro1'), status: document.getElementById('status1'), intervalId: null, tiempoTranscurrido: 0 },
        { id: 2, elemento: document.getElementById('cronometro2'), status: document.getElementById('status2'), intervalId: null, tiempoTranscurrido: 0 },
        { id: 3, elemento: document.getElementById('cronometro3'), status: document.getElementById('status3'), intervalId: null, tiempoTranscurrido: 0 }
    ];

    const startButton = document.getElementById('startStopButton');
    const resetButton = document.getElementById('resetButton');

    startButton.addEventListener('click', function() {
        cronometros.forEach(cronometro => {
            const horasInput = document.getElementById(`horas${cronometro.id}`);
            const minutosInput = document.getElementById(`minutos${cronometro.id}`);
            const segundosInput = document.getElementById(`segundos${cronometro.id}`);

            const horas = parseInt(horasInput.value) || 0;
            const minutos = parseInt(minutosInput.value) || 0;
            const segundos = parseInt(segundosInput.value) || 0;
            const tiempoTotal = (horas * 3600) + (minutos * 60) + segundos;

            if (tiempoTotal <= 0) {
                alert('Por favor, ingrese un tiempo válido.');
                return;
            }

            cronometro.tiempoTranscurrido = 0;
            cronometro.elemento.innerText = formatarTiempo(cronometro.tiempoTranscurrido);
            cronometro.status.innerText = 'En curso';

            cronometro.intervalId = setInterval(() => {
                cronometro.tiempoTranscurrido++;
                cronometro.elemento.innerText = formatarTiempo(cronometro.tiempoTranscurrido);

                if (cronometro.tiempoTranscurrido >= tiempoTotal) {
                    clearInterval(cronometro.intervalId);
                    cronometro.status.innerText = 'En pausa';
                }
            }, 1000);
        });

        startButton.disabled = true;
    });

    resetButton.addEventListener('click', function() {
        cronometros.forEach(cronometro => {
            clearInterval(cronometro.intervalId);
            cronometro.elemento.innerText = '00:00:00';
            cronometro.status.innerText = 'En pausa';

            const horasInput = document.getElementById(`horas${cronometro.id}`);
            const minutosInput = document.getElementById(`minutos${cronometro.id}`);
            const segundosInput = document.getElementById(`segundos${cronometro.id}`);

            horasInput.value = '';
            minutosInput.value = '';
            segundosInput.value = '';
        });

        startButton.disabled = false;
    });

    function formatarTiempo(segundos) {
        const horas = Math.floor(segundos / 3600);
        segundos %= 3600;
        const minutos = Math.floor(segundos / 60);
        const segs = segundos % 60;

        return `${pad(horas)}:${pad(minutos)}:${pad(segs)}`;
    }

    function pad(numero) {
        return numero < 10 ? '0' + numero : numero;
    }
});
