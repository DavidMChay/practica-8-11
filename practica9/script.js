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

    function reemplazar(stack, viejo, nuevo) {
        if (stack.isEmpty()) return stack;

        let temp = stack.pop();

        reemplazar(stack, viejo, nuevo);

        if (temp === viejo) {
            stack.push(nuevo);
        } else {
            stack.push(temp);
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

        reemplazar(stack, oldValue, newValue);

        $('#new-stack').text(`Nueva pila: ${stack.printStack()}`);
    });
});
