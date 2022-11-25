import { compile, derivative } from 'mathjs';
const func = (fx, X) => {
    var expr = compile(fx); // f(x)
    let scope = { x: parseFloat(X) }; //f(x) ; x=input
    return expr.evaluate(scope); 
}
const error = (xnew, xold) => {
    return Math.abs((xnew - xold) / xnew);
}
const funcDiff = (fx, X) => {
    var expr = derivative(fx, 'x');
    let scope = {x:parseFloat(X)};
    return expr.evaluate(scope); 
}
export{ func,error,funcDiff};