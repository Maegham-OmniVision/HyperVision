async function fetchQRCode() {
    const response = await fetch('/api/generate-qr/Chair');
    const data = await response.json();
    document.getElementById('qr-image').src = data.qrImage;
}

window.onload = fetchQRCode;
