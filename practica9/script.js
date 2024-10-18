$(document).ready(function() {
    function Stack() {
        this.items = [];
        this.push = function(element) {
            this.items.push(element);
        }
        this.pop = function() {
            return this.items.pop();
        }
        this.isEmpty = function() {
            return this.items.length === 0;
        }
        this.peek = function() {
            return this.items[this.items.length - 1];
        }
        this.printStack = function() {
            return this.items.join(', ');
        }
    }

    function reemplazarUltimo(stack, viejo, nuevo) {
        let tempStack = new Stack();
        let found = false;

        while (!stack.isEmpty()) {
            let topElement = stack.pop();
            if (topElement === viejo && !found) {
                tempStack.push(nuevo);
                found = true;
            } else {
                tempStack.push(topElement);
            }
        }

        while (!tempStack.isEmpty()) {
            stack.push(tempStack.pop());
        }

        return stack;
    }

    $('#replace-form').on('submit', function(e) {
        e.preventDefault();

        $('#original-stack').empty();
        $('#new-stack').empty();

        let stackInput = $('#stack-input').val();
        let oldValue = parseInt($('#old-value').val());
        let newValue = parseInt($('#new-value').val());

        let stackArray = stackInput.split(',').map(Number);
        let stack = new Stack();

        stackArray.forEach(function(num) {
            stack.push(num);
        });

        $('#original-stack').text(`Pila original: ${stack.printStack()}`);

        reemplazarUltimo(stack, oldValue, newValue);

        $('#new-stack').text(`Nueva pila: ${stack.printStack()}`);
    });
});
