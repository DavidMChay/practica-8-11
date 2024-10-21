$(document).ready(function() {
    let queue = [];
    const maxQueueSize = 5;

    function ColaLlena() {
        return queue.length >= maxQueueSize;
    }

    function ColaVacia() {
        return queue.length === 0;
    }

    function formatDate(date) {
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    $('#add-client-form').on('submit', function(e) {
        e.preventDefault();

        if (ColaLlena()) {
            alert('La cola está llena, no se pueden agregar más clientes.');
            return;
        }

        let clientName = $('#client-name').val();
        let clientTurn = parseInt($('#client-turn').val());
        let clientMovement = $('#client-movement').val();
        let arrivalTime = new Date();

        let client = {
            turn: clientTurn,
            name: clientName,
            movement: clientMovement,
            arrivalTime: arrivalTime
        };

        queue.push(client);

        updateQueueTable();

        alert(`Cliente formado: ${clientName}\nTurno: ${clientTurn}\nMovimiento: ${clientMovement}\nHora de llegada: ${formatDate(arrivalTime)}`);

        $('#add-client-form')[0].reset();
    });

    $('#attend-client').on('click', function() {
        if (ColaVacia()) {
            alert('No hay clientes en la cola.');
            return;
        }

        let clientAttended = queue.shift();
        let currentTime = new Date();
        let waitTime = Math.floor((currentTime - clientAttended.arrivalTime) / 1000); // Tiempo en segundos

        updateQueueTable();

        $('#results').html(`Cliente atendido: ${clientAttended.name}<br>Tiempo en espera: ${waitTime} segundos`);
    });

    function updateQueueTable() {
        let tableBody = $('#queue-table-body');
        tableBody.empty();

        queue.forEach(function(client) {
            let row = `<tr>
                <td>${client.turn}</td>
                <td>${client.name}</td>
                <td>${client.movement}</td>
                <td>${formatDate(client.arrivalTime)}</td>
            </tr>`;
            tableBody.append(row);
        });
    }

    $('#exit-system').on('click', function() {
        queue = [];
        updateQueueTable();
        $('#results').empty();
        alert('Sistema cerrado. La cola ha sido vaciada.');
    });
});
