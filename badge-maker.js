document.getElementById('username').addEventListener('input', function() {
    validateInput(this);
});

document.getElementById('password').addEventListener('input', function() {
    validateInput(this);
});

function validateInput(input) {
    if (input.value.length > 40) {
        input.value = input.value.slice(0, 40);
    }
}

function generateBadge() {
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();

    if (username === '' || password === '') {
        alert('Please enter both username and password.');
        return;
    }

    generateCode128('usernameBarcode', username);
    generateCode128('passwordBarcode', password);
}

function generateCode128(canvasId, text) {
    var canvas = document.getElementById(canvasId);
    canvas.innerHTML = ''; 

    bwipjs.toCanvas(canvas, {
        bcid: 'code128',
        text: text,
        scale: 1,
        includetext: true,
        textxalign: 'center',
        textsize: 15
    }, function (err) {
        if (err) {
            alert(err);
        }
    });
}

function clearBadge() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    clearCanvas('usernameBarcode');
    clearCanvas('passwordBarcode');
}

function clearCanvas(canvasId) {
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadBadge() {
    const badge = document.getElementById('badge');
    const dpi = 300; 
    const widthInInches = 3.375;
    const heightInInches = 2.125;
    const widthInPixels = widthInInches * dpi;
    const heightInPixels = heightInInches * dpi;

    html2canvas(badge, {
        width: widthInPixels,
        height: heightInPixels,
        scale: dpi / 300, 
        useCORS: true,
        backgroundColor: null
    }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'badge.png';
        link.click();
    }).catch(err => {
        console.error('Error generating image:', err);
        alert('An error occurred while generating the badge image.');
    });
}
