document.getElementById('techDetailsBtn').addEventListener('click', function() {
  Swal.fire({
    title: 'Technical Specifications',
    html: `
      <div class="text-start">
        <p><strong>Frontend Framework:</strong> Bootstrap 5.3</p>
        <p><strong>Alert System:</strong> SweetAlert2 v11</p>
        <p><strong>Color Scheme:</strong> Generated with Coolors.co</p>
        <p><strong>Image Sources:</strong></p>
        <ul>
          <li>Aula Official Website</li>
          <li>Pop Mart Official Website</li>
        </ul>
        <hr>
        <p class="small text-muted">This website was built for demonstration purposes.</p>
      </div>
    `,
    icon: 'info',
    confirmButtonColor: '#00b4d8',
    width: '600px'
  });
});