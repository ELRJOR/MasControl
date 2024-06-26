document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const toggleButton = document.getElementById('toggleButton');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  const footerContent = document.getElementById('footerContent');

  if (navToggle) {
    navToggle.addEventListener('click', function() {
      if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
      }
    });
  }

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      sidebar.classList.toggle('nav-collapsed');
      mainContent.classList.toggle('expanded');
      footerContent.classList.toggle('expanded');
    });
  }
});

//parte del formulario de tutores
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("tutorForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, lastname, address, phone, email }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });
});
