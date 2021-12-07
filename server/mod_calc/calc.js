const add = (x,y) => x + y;
const sub = (x,y) => x - y;
const multi = (x,y) => x * y;

const div = (x,y) => {

    (y === 0 ? 'Não é possível realizar a operação' : (x/y));

}

module.exports = {
    add,
    sub,
    multi,
    div
}