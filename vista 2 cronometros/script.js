document.addEventListener('DOMContentLoaded', function() {
    const cronometro1 = document.getElementById('cronometro1');
    const cronometro2 = document.getElementById('cronometro2');
    const status1 = document.getElementById('status1');
    const status2 = document.getElementById('status2');
    const startStopButton = document.getElementById('startStopButton');
    const resetButton = document.getElementById('resetButton');
    const horasInput = document.getElementById('horas');
    const minutosInput = document.getElementById('minutos');
    const segundosInput = document.getElementById('segundos');

    let intervalId1, intervalId2;
    let tiempoTotal, tiempoTranscurrido1, tiempoTranscurrido2;

    function iniciarCronometro() {
        const horas = parseInt(horasInput.value) || 0;
        const minutos = parseInt(minutosInput.value) || 0;
        const segundos = parseInt(segundosInput.value) || 0;
        tiempoTotal = (horas * 3600) + (minutos * 60) + segundos;

        if (tiempoTotal <= 0) {
            alert('Por favor, ingrese un tiempo válido.');
            return;
        }

        tiempoTranscurrido1 = 0;
        cronometro1.innerText = formatarTiempo(tiempoTranscurrido1);
        status1.innerText = 'En curso';
        intervalId1 = setInterval(actualizarCronometro1, 1000);

        setTimeout(() => {
            tiempoTranscurrido2 = 0;
            cronometro2.innerText = formatarTiempo(tiempoTranscurrido2);
            status2.innerText = 'En curso';
            intervalId2 = setInterval(actualizarCronometro2, 1000);
        }, tiempoTotal * 1000);

        startStopButton.disabled = true;
    }

    function actualizarCronometro1() {
        tiempoTranscurrido1++;
        cronometro1.innerText = formatarTiempo(tiempoTranscurrido1);

        if (tiempoTranscurrido1 >= tiempoTotal) {
            clearInterval(intervalId1);
            status1.innerText = 'En pausa';
        }
    }

    function actualizarCronometro2() {
        tiempoTranscurrido2++;
        cronometro2.innerText = formatarTiempo(tiempoTranscurrido2);

        if (tiempoTranscurrido2 >= tiempoTotal) {
            clearInterval(intervalId2);
            status2.innerText = 'En pausa';
        }
    }

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

    startStopButton.addEventListener('click', iniciarCronometro);

    resetButton.addEventListener('click', function() {
        clearInterval(intervalId1);
        clearInterval(intervalId2);
        cronometro1.innerText = '00:00:00';
        cronometro2.innerText = '00:00:00';
        status1.innerText = 'En pausa';
        status2.innerText = 'En pausa';
        horasInput.value = '';
        minutosInput.value = '';
        segundosInput.value = '';
        startStopButton.disabled = false;
    });
});
