const button = document.getElementById('button');
button.addEventListener('click', timer);
var cafe = {
    store: "Graybill Coffe Co.",
    orders: []
};
    
var newOrder;
var i = 0;

function getOrder(newOrder, callback, i) {
    cafe.orders.push({
    name: newOrder.name,
    ticket: newOrder.ticket,
    complete: false
});

setInterval(() => {
    if (cafe.orders[i].complete === true) {
        callback();  
    }
})

console.log(`New Order Recieved for ${newOrder.name} check the monitor`);
newOrder = undefined;

}

function shiftOrder() {
    console.log(`Order Complete`);
    i--;
    cafe.orders.shift();

}

function timer(e) {
    e.preventDefault();
    setInterval(() => {
        if (newOrder !== undefined) {
            const int = i === 0 ? i++: i;
            getOrder(newOrder,  shiftOrder, int);

        }

    }, 1500);
    
}