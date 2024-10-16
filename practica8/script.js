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
    }

    $('#sum-form').on('submit', function(e) {
        e.preventDefault();

        $('#result').empty();
        $('#stack-steps').empty();

        let number1 = $('#number1').val();
        let number2 = $('#number2').val();

        if (number1.length === 0 || number2.length === 0) {
            alert('Por favor ingrese ambos números');
            return;
        }

        // Crear pilas
        let stack1 = new Stack();
        let stack2 = new Stack();
        let resultStack = new Stack();

        function fillStack(stack, number, index) {
            if (index < number.length) {
                stack.push(parseInt(number[index]));
                fillStack(stack, number, index + 1);
            }
        }

        fillStack(stack1, number1, 0);
        fillStack(stack2, number2, 0);

        function sumStacks(stack1, stack2, carry, resultStack) {
            if (!stack1.isEmpty() || !stack2.isEmpty() || carry !== 0) {
                let digit1 = stack1.isEmpty() ? 0 : stack1.pop();
                let digit2 = stack2.isEmpty() ? 0 : stack2.pop();

                let sum = digit1 + digit2 + carry;
                let currentCarry = carry;
                carry = Math.floor(sum / 10);
                resultStack.push(sum % 10);

                $('#stack-steps').append(`<div class="stack-step">Suma: ${digit1} + ${digit2} ${currentCarry > 0 ? `+ ${currentCarry}` : ''}, Llevo: ${carry}, Resultado: ${sum % 10}</div>`);

                sumStacks(stack1, stack2, carry, resultStack);
            }
        }

        sumStacks(stack1, stack2, 0, resultStack);

        function buildFinalResult(resultStack, result) {
            if (!resultStack.isEmpty()) {
                result += resultStack.pop();
                return buildFinalResult(resultStack, result);
            } else {
                return result;
            }
        }

        let finalResult = buildFinalResult(resultStack, '');

        $('#result').text(`Resultado final: ${finalResult}`);
    });
});
