# Calculator

Project inspiration comes from the [Odin Project](https://www.theodinproject.com/)'s calculator challenge.

## Features

* Add or delete individual numbers, operators, or decimal points.
* Change an operator by clicking on a new operator (or by deleting it).
* Expressions are solved with one operator at a time:
	* If the calculation ends by clicking the equals button, the expression is displayed above and its result below.
	* If the expression contains multiple operators, then each part is solved and its equation (i.e., with its result) is displayed above and, additionally, its result and next operator are displayed in the current output field for the next step of the calculation.
* For solved expressions, clicking an operator button will start a new calculation from that result.
* Prepend expression with 0 if first operand is missing and operator button is clicked.
* Remove trailing decimal points upon next input.
* Clear calculator with AC button.
* Display error and disable calculator until cleared if expression includes dividing by 0.

## Live Demo

[Live demo](https://juss-10.github.io/calculator/)

## License

* [MIT License](https://github.com/juss-10/calculator/blob/main/LICENSE)
* Copyright &copy; 2022 [juss-10](https://github.com/juss-10)
