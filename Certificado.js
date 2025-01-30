function generateCertificate() {
    // Obtener valores del formulario
    const name = document.getElementById('name').value;
    const cedula = document.getElementById('cedula').value;
    const currentDate = new Date(); // Genera la fecha automáticamente

    // Validar que todos los campos estén llenos
    if (!name || !cedula) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Insertar los valores en el certificado
    document.getElementById('participant-name').textContent = name;
    document.getElementById('participant-cedula').textContent = cedula;
    document.getElementById('issue-date').textContent = currentDate.toLocaleDateString();

    // Mostrar el certificado
    document.getElementById('certificate').style.display = 'block';
}

function downloadCertificate() {
    const certificate = document.getElementById('certificate');

    // Utiliza html2canvas para capturar el certificado
    html2canvas(certificate, { scale: 3 }).then(canvas => {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("landscape", "mm", "a4");

        const imgData = canvas.toDataURL("image/png");

        // Medidas de la página A4 en horizontal
        const pdfWidth = 297;
        const pdfHeight = 210;

        // Medidas de la imagen renderizada
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // **Ajuste para cubrir completamente la página**
        let widthRatio = pdfWidth / imgWidth;
        let heightRatio = pdfHeight / imgHeight;
        let ratio = Math.max(widthRatio, heightRatio); // Usamos la escala mayor para llenar todo

        let newWidth = imgWidth * ratio;
        let newHeight = imgHeight * ratio;

        let imgX = (pdfWidth - newWidth) / 2; // Centrado
        let imgY = (pdfHeight - newHeight) / 2; // Centrado

        pdf.addImage(imgData, "PNG", imgX, imgY, newWidth, newHeight);
        pdf.save("certificado.pdf");
    });
}

// Asegúrate de que el botón de descarga también funcione correctamente
document.getElementById("certificate-form").addEventListener("submit", function (event) {
    event.preventDefault();
    generateCertificate();
});

document.querySelector("button[onclick='downloadCertificate()']").addEventListener("click", function () {
    downloadCertificate();
});
