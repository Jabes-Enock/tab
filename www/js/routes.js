//INICIALIZAÇÃO DO F7 QUANDO DISPOSITIVO ESTÁ PRONTO
document.addEventListener("deviceready", onDeviceReady, false);

var checkThemeInLocalStorage = () => {
  const theme = localStorage.getItem("theme")
  theme == "dark" ? $('body').addClass('dark') : $('body').removeClass('dark')
}

var app = new Framework7({
  // App root element
  el: "#app",
  // App Name
  name: "My App",
  // App id
  id: "com.myapp.test",
  // Enable swipe panel
  panel: {
    swipe: true,
  },
  dialog: {
    buttonOk: "Sim",
    buttonCancel: "Cancelar",
  },
   // specify primary color theme
   //https://framework7.io/docs/color-themes#primary-color-classes
   colors: {
    primary: '#0B6623' //#hexadecimal
  },

  // Add default routes
  routes: [
    {
      path: "/index/",
      url: "index.html",
      animate: false,
      on: {
        pageBeforeIn: function (event, page) {
          // fazer algo antes da página ser exibida
          checkThemeInLocalStorage()
        },
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
        },
      },
    },
    {
      path: "/link2/",
      url: "link2.html",
      on: {
        pageBeforeIn: function (event, page) {
          // fazer algo antes da página ser exibida
          checkThemeInLocalStorage()
        },
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
        },
      },
    },
    {
      path: "/link3/",
      url: "link3.html",
      animate: false,
      on: {
        pageBeforeIn: function (event, page) {
          // fazer algo antes da página ser exibida
          checkThemeInLocalStorage()
        },
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
        },
      },
    },
    {
      path: "/settings/",
      url: "settings.html",
      animate: false,
      on: {
        pageBeforeIn: function (event, page) {
          $('.toolbar').show()  

          if ($('body').hasClass('dark') )  {
            $('#btn_change_theme').attr('checked', true)
            return
          } 

          $('#btn_change_theme').attr('checked', false)
        },
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
          
        },
        pageInit: function (event, page) {
          $('#btn_change_theme').on('click', () => {
            if ($('body').hasClass('dark') )  {
              localStorage.setItem('theme', 'light')
              $('body').removeClass('dark')
              $('#btn_change_theme').attr('checked', true)
              
              return
            } 
            console.log($('body').hasClass('dark'))
            
            localStorage.setItem('theme', 'dark')
            $('body').addClass('dark')
            $('#btn_change_theme').attr('checked', false)
          })
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
        },
      },
    },
  ],
  // ... other parameters
});

//Para testes direto no navegador
var mainView = app.views.create(".view-main", { url: "/index/" });

//EVENTO PARA SABER O ITEM DO MENU ATUAL
app.on("routeChange", function (route) {
  var currentRoute = route.url;
  //console.log(currentRoute);
  document.querySelectorAll(".tab-link").forEach(function (el) {
    el.classList.remove("active");
  });
  var targetEl = document.querySelector(
    '.tab-link[href="' + currentRoute + '"]'
  );
  if (targetEl) {
    targetEl.classList.add("active");
  }
});

function onDeviceReady() {
  //Quando estiver rodando no celular
  var mainView = app.views.create(".view-main", { url: "/index/" });

  //COMANDO PARA "OUVIR" O BOTAO VOLTAR NATIVO DO ANDROID
  document.addEventListener(
    "backbutton",
    function (e) {
      if (mainView.router.currentRoute.path === "/index/") {
        e.preventDefault();
        app.dialog.confirm("Deseja sair do aplicativo?", function () {
          navigator.app.exitApp();
        });
      } else {
        e.preventDefault();
        mainView.router.back({ force: true });
      }
    },
    false
  );
}
