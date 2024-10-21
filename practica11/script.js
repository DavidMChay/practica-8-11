$(document).ready(function() {
    class Queue {
        constructor() {
            this.items = [];
        }

        enqueue(element) {
            this.items.push(element);
        }

        dequeue() {
            if (this.isEmpty()) {
                return null;
            } else {
                return this.items.shift();
            }
        }

        front() {
            return this.isEmpty() ? null : this.items[0];
        }

        size() {
            return this.items.length;
        }

        isEmpty() {
            return this.items.length === 0;
        }
    }

    const carQueue = new Queue();
    const colors = ['Amarillo', 'Verde', 'Rojo', 'Azul', 'Naranja'];
    let carsPainted = 0;
    let totalTime = 0;
    let speed = 20000; 
    let maxCars = 5;  
    let gameOver = false;

    function createCar() {
        if (carQueue.size() < maxCars) {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const carElement = $('<div>').addClass('car').append($('<img>').attr('src', 'car.png'))
                                         .append($('<div>').addClass('car-label').text(randomColor));
            const car = {
                color: randomColor,
                element: carElement,
            };
            carQueue.enqueue(car);
            $('#car-queue').append(carElement);

            adjustSpeed();
        } else {
            alert('Juego terminado: 5 coches enfilados.');
            clearInterval(carArrivalInterval); 
            clearInterval(timeCounter);        
            gameOver = true;
        }
    }

    function adjustSpeed() {
        if (carsPainted >= 3 && carsPainted < 6) {
            speed = 15000;
        } else if (carsPainted >= 6 && carsPainted < 9) {
            speed = 10000; 
        } else if (carsPainted >= 9 && carsPainted < 12) {
            speed = 5000;
        } else if (carsPainted >= 12 && carsPainted < 15) {
            speed = 2000;
        } else if (carsPainted >= 15) {
            speed = 1000;
        }
        clearInterval(carArrivalInterval);    
        carArrivalInterval = setInterval(createCar, speed);
    }

    $('#paint-car').on('click', function() {
        if (gameOver) return;

        const selectedColor = $('.color-btn.active').data('color');
        const firstCar = carQueue.front();

        if (!firstCar) {
            alert('No hay coches en la cola.');
            return;
        }

        if (!selectedColor) {
            alert('Seleccione un color de la paleta.');
            return;
        }

        if (selectedColor === firstCar.color) {
            firstCar.element.find('img').css('filter', `hue-rotate(${getHueRotation(selectedColor)}deg)`);
            carQueue.dequeue();
            $('#car-queue').children().first().remove();
            carsPainted++;
            $('#car-painted-count').text(`Coches pintados: ${carsPainted}`);
        } else {
            alert('El color seleccionado no coincide con el del coche.');
        }
    });

    function getHueRotation(color) {
        switch (color) {
            case 'Amarillo': return 60;
            case 'Verde': return 120;
            case 'Rojo': return 0;
            case 'Azul': return 240;
            case 'Naranja': return 30;
            default: return 0;
        }
    }

    $('.color-btn').on('click', function() {
        $('.color-btn').removeClass('active');
        $(this).addClass('active');
    });

    let carArrivalInterval = setInterval(createCar, speed);

    let timeCounter = setInterval(function() {
        if (!gameOver) {
            totalTime++;
            $('#total-time').text(`Tiempo total: ${totalTime} segundos`);
        }
    }, 1000);
});
