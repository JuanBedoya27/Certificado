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
    html2canvas(certificate, { scale: 2 }).then(canvas => {
        // Crea un PDF usando jsPDF con orientación "landscape"
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("landscape", "mm", "a4");  // Orientación horizontal (landscape)
        
        // Convierte el canvas a imagen
        const imgData = canvas.toDataURL("image/png");
        
        const pdfWidth = 297;  // Ancho de A4 en mm en orientación horizontal
        const pdfHeight = 210; // Alto de A4 en mm en orientación horizontal

        const imgWidth = pdfWidth;
        let imgHeight = canvas.height * pdfWidth / canvas.width;
        
        // Si la altura de la imagen es mayor que la altura del PDF, ajustamos las proporciones
        if (imgHeight > pdfHeight) {
            imgHeight = pdfHeight;
            imgWidth = canvas.width * pdfHeight / canvas.height;
        }

        // Centramos la imagen en el PDF
        const x = (pdfWidth - imgWidth) / 2;
        const y = (pdfHeight - imgHeight) / 2;

        pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
        pdf.save("certificado.pdf");
    });
}

// Asegúrate de que el botón de descarga también funcione correctamente
document.getElementById("certificate-form").addEventListener("submit", function(event) {
    event.preventDefault();
    generateCertificate();
});

document.querySelector("button[onclick='downloadCertificate()']").addEventListener("click", function() {
    downloadCertificate();
});
