
var currCash = 0;

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'http://tsg-vending.herokuapp.com/items',
        success: function(vendables) {
            $.each(vendables, function(index, item) {
                addVendable(index, item);
            });
        }
    })
});

function addVendable(index, data) {
    var entry = '<div class="card mb-3 text-center" style="width: 30%;">';
        entry += '<div class="card-header p-1">';
            entry += '<div>#' + data.id + '</div>';
            entry += '<div class="w-100"><b>' + data.name + '</b></div>';
        entry += '</div>';
        entry += '<div class="card-body py-2">';
            entry += '<p>' + getCashString(data.price) + '</p>';
            entry += '<p>Quantity: ' + data.quantity + '</p>';
        entry += '</div>';
    entry += '</div>';
    $('#vendingDisplay').append(entry);
}

function addCash(amt) {
    currCash += amt;
    $('#cashTotal').text(getCashString(currCash));
}

function getCashString(money) {
    return '$' + String(money.toFixed(2));
}