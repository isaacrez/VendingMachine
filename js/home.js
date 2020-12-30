
var currCents = 0;

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

function addCents(amt) {
    currCents += amt;
    $('#cashTotal').text(getCashString(currCents / 100));
}

function getChange() {
    var coinValue = {
        'Dollar': 100,
        'Quarter': 25,
        'Dime': 10,
        'Nickel': 5
    };
    var refund = [];
    
    for (var coin in coinValue) {
        var amt = Math.floor(currCents / coinValue[coin]);
        currCents = currCents % coinValue[coin];
        
        if (amt > 1) {
            refund.push(coin + 's: ' + amt);
        } else if (amt > 0) {
            refund.push(coin + ': ' + amt);
        }
    }
    
    var output = refund.length === 0 ? 'No change!' : refund.join(', ');
    $('#changeMessage').text(output);
    
    currCash = 0;
    $('#cashTotal').text(getCashString(currCash));
}

function getCashString(money) {
    return '$' + String(money.toFixed(2));
}