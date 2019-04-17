import Hammer from 'hammerjs';
// import koOrder1 from '../_order/order1.vue'

export default {
    name: 'koHeader1',
    // components: { koOrder1 },
    props: {
			setting: {
				type: Object,
				default: function() {
					return {
            colorText: "#000000",
            colorHeader: "#ffffff",
            tabs: [],
            data: {
              tabs: [],
              colorText: "#000000",
              colorHeader: "#ffffff",
            },
            styleObject: {
              colorText: "#000000",
              colorHeader: "#ffffff",
              width: 60
            }
          };
				}
			},
      logo: {
        type: Object,
        default() {
          return {
            id: 1,
            logo: '163nir1958.png',
          };
        },
      },
    },
    mounted() {
        window.addEventListener('resize', this.getWindowsWidth);
        this.getWindowsWidth();
    },
    data() {
      return {
				popover: false,
				popoverUser: false,
				// toggleMenu: true,
        show: false,
        windowsWidth: 0,
        routes: [
          {
            name: 'Inicio',
            route: '/',
          },
          {
            name: 'Productos',
            route: '/productos',
          },
          {
            name: 'Carrito',
            route: '/pedido',
          },
          {
            name: 'Contacto',
            route: '/contacto',
          },
        ],
      };
    },
    computed: {
			urlHttp() {
				return this.$store.state.urlHttp;
			},
      storeData() {
        return this.$store.state.tienda;
      },
      productsCart(){
        return this.$store.state.productsCart.length;
      },
      userData() {
        return this.$store.state.userData
      },
      info() {
        return this.$store.state.tienda;
      },
      style () {
        return this.$store.state.styleData
			},
			color() {
				return this.setting.styleObject.colorText;
			},
      urlLogin () {
        const params = JSON.stringify({tienda: this.storeData.id_tienda, logo: this.storeData.logo})
        return `http://login.komercia.co?from=${this.storeData.subdominio}&path=${this.$route.path}&params=${params}`
      },
      urlSignup() {
        const params = JSON.stringify({
          tienda: this.storeData.id_tienda,
          logo: this.storeData.logo
        });
        return `https://login.komercia.co/registrar-cliente/?from=${
          this.storeData.subdominio
        }&path=${this.$route.path}&params=${params}`;
      }
    },
    methods: {
      redirectTo(route) {
        this.$router.push(route)
        this.windowsWidth = document.documentElement.clientWidth;
        if (this.windowsWidth < 800) {
          this.hideMenu()
        }
      },
      toggleMenu() {
        this.show = !this.show;
      },
      openOrder() {
        this.$store.state.openOrder = true;
      },
      openMenuComponent(){
        this.$store.state.menuComponent = true;
      },
      showMenu() {
        this.show = true;
      },
      hideMenu() {
        this.show = false;
      },
      getWindowsWidth() {
        this.windowsWidth = document.documentElement.clientWidth;
        if (this.windowsWidth > 800) {
          this.show = true;
        }
			},
			fadeOf() {
				this.popover = false;
			},
			mouseOver() {
				this.popover = !this.popover;
			},
			handleHover(event, bool) {
				bool
					? (event.target.style.color = this.setting.styleObject.colorHover)
					: (event.target.style.color = this.setting.styleObject.colorText);
			},
			toggleMenuAction() {
				if (window.innerWidth <= 770) {
					this.toggleMenu = !this.toggleMenu;
				}
			},
      login() {
        const params = JSON.stringify({tienda: this.storeData.id_tienda, logo: this.storeData.logo})
        window.location.href = `http://login.komercia.co?from=${this.storeData.subdominio}&path=${this.$route.path}&params=${params}`
      },
      logout() {
        this.$store.commit('LOGOUT');
      }
    }
  };