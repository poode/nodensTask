  // this to render errors in message view correctly without nav bar, or footer
  if (document.location.href !== `${document.location.origin}/`) {
    const content = document.querySelector('.content-wrapper');
    if (content) {
      const body = content.children[0].innerHTML;
      document.body.innerHTML = body;
      setTimeout(() => window.location = window.location.origin, 3000)
    }
  }
  
  // this to render first name and second name for the user in nav bar
  if (document.cookie.split('username=')[1]) {
    const str = document.cookie.split(';').find(i => i.includes('username')).split('username=')[1];
    const username = decodeURIComponent(str).replace(',', '');
    const usernameRefElem = document.querySelector('#username');
    if (usernameRefElem) usernameRefElem.innerHTML = `مرحباً يا ${username}`;
  }

  $(document).ready(() => {
    // this to solve autocomplete off issue in browsers to prevent
    // any cache from the browser that allow browser to type itself in username and password inputs
    $('input').attr('readonly', true);
    $('input').on( 'click focus',function() {
        $(this).attr('readonly', false);
    });
  });
