# Deep neural networks

The deep neural networks used by AI models are predictive models.

The simplest possible predictive
model is a line

f(x∣m,b)=mx+b

with input x and two parameters,
m and b.

"Linear Regression"

## GPT-4 is more complex

1.7 trillion parameters.
Apart from this, is is still just a mathematical function f(x|params) where params is a list of 1.7 trillion numbers.

## Deep Learning of handwritten digits

Input is a handdrawn digit

The neural network outputs ten
probabilities, one for each digit

The highest number reveals the
predicted digit

## Getting the probabilities

The model breaks the handdrawn
digit into a pixel grid

[A pixeled 9](images/nine.png)

The model calculates
the probability for each pixel.

Probabilities are summed up :)

## Learning?

But how does the model learn the
probabilities of each pixel?

## Supervised Learning

The neural net compares its predictions to the right answer in thousands of examples. Then it adjusts its parameters a bit every time.

## Training

The number of parameters in large
models is in trillions.

No chance of tuning them by hand
An Algorithm is used for that.

Gradient descent is an iterative optimization algorithm used to find the minimum of a function by repeatedly taking steps in the opposite direction of the function's gradient.

## Loss

When we draw a curve through our set of data points. How much has the model has missed by drawing 
the approximated function? The total length of all the differences summed up is called the loss.

The less the loss, the better the
approximated function.

## Gradient Descent

Iterative algorithm to find the least loss

