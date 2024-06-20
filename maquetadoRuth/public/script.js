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
