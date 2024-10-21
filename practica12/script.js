$(document).ready(function() {
    // Clase para el nodo de auto
    class AutoNode {
        constructor(placas, propietario, horaEntrada) {
            this.placas = placas;
            this.propietario = propietario;
            this.horaEntrada = horaEntrada;
            this.next = null;
            this.prev = null;
        }
    }

    // Clase para la Cola Circular Doblemente Ligada
    class ColaCircularDoble {
        constructor() {
            this.head = null;
            this.tail = null;
            this.size = 0;
        }

        // Insertar un auto en la cola
        insertar(placas, propietario) {
            const nuevoAuto = new AutoNode(placas, propietario, new Date());
            if (this.size === 0) {
                this.head = nuevoAuto;
                this.tail = nuevoAuto;
                nuevoAuto.next = nuevoAuto;
                nuevoAuto.prev = nuevoAuto;
            } else {
                nuevoAuto.prev = this.tail;
                nuevoAuto.next = this.head;
                this.tail.next = nuevoAuto;
                this.head.prev = nuevoAuto;
                this.tail = nuevoAuto;
            }
            this.size++;
            this.mostrarAutos();
        }

        // Eliminar un auto de la cola (salida)
        eliminar() {
            if (this.size === 0) {
                alert("No hay autos en el estacionamiento.");
                return null;
            }

            const autoSalida = this.head;
            const horaSalida = new Date();
            const tiempoEstacionado = Math.floor((horaSalida - autoSalida.horaEntrada) / 1000); // segundos
            const costo = tiempoEstacionado * 2;

            if (this.size === 1) {
                this.head = null;
                this.tail = null;
            } else {
                this.head = this.head.next;
                this.tail.next = this.head;
                this.head.prev = this.tail;
            }
            this.size--;
            this.mostrarAutos();
            return {
                placas: autoSalida.placas,
                propietario: autoSalida.propietario,
                horaEntrada: autoSalida.horaEntrada,
                horaSalida: horaSalida,
                costo: costo
            };
        }

        // Mostrar la lista de autos en la cola
        mostrarAutos() {
            const tableBody = $('#auto-registro');
            tableBody.empty();

            if (this.size === 0) {
                tableBody.append('<tr><td colspan="3">No hay autos en el estacionamiento.</td></tr>');
                return;
            }

            let current = this.head;
            for (let i = 0; i < this.size; i++) {
                const row = `<tr>
                    <td>${current.placas}</td>
                    <td>${current.propietario}</td>
                    <td>${current.horaEntrada.toLocaleTimeString()}</td>
                </tr>`;
                tableBody.append(row);
                current = current.next;
            }
        }
    }

    const estacionamiento = new ColaCircularDoble();

    // Registrar la entrada de un auto
    $('#entrada-auto-form').on('submit', function(e) {
        e.preventDefault();
        const placas = $('#placas').val();
        const propietario = $('#propietario').val();

        estacionamiento.insertar(placas, propietario);

        alert(`Auto con placas ${placas} y propietario ${propietario} ha sido registrado.`);
        $('#placas').val('');
        $('#propietario').val('');
    });

    // Registrar la salida de un auto
    $('#salida-auto-btn').on('click', function() {
        const autoSalida = estacionamiento.eliminar();
        if (autoSalida) {
            const infoSalida = `
                Auto con placas ${autoSalida.placas}, propietario ${autoSalida.propietario}.
                Hora de entrada: ${autoSalida.horaEntrada.toLocaleTimeString()},
                Hora de salida: ${autoSalida.horaSalida.toLocaleTimeString()},
                Tiempo total: ${Math.floor((autoSalida.horaSalida - autoSalida.horaEntrada) / 1000)} segundos.
                Costo total: $${autoSalida.costo} pesos.
            `;
            $('#salida-info').removeClass('d-none').html(infoSalida);
        }
    });
});
