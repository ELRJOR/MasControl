document.getElementById('nav-toggle').onclick = function() {
    var navContent = document.getElementById('nav-content');
    var navContentSecondary = document.getElementById('nav-content-secondary');
    if (navContent.classList.contains('hidden')) {
      navContent.classList.remove('hidden');
      navContentSecondary.classList.remove('hidden');
    } else {
      navContent.classList.add('hidden');
      navContentSecondary.classList.add('hidden');
    }
  }
