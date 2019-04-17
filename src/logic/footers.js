import axios from "axios";

export default {
    data() {
        return {
            routes: [
                {
                  name: "Inicio",
                  route: "/"
                },
                {
                  name: "Productos",
                  route: "/productos"
                },
                {
                  name: "Carrito",
                  route: "/pedido"
                },
                {
                  name: "Nosotros",
                  route: "/nosotros"
                },
                {
                  name: "Contacto",
                  route: "/contacto"
                }
              ],
          routesFooter: [
            {
              name: "Sobre nosotros",
              route: "/nosotros"
            },
            {
              name: "Politicas de garantia",
              route: "/garantia"
            },
            {
              name: "Manejo de datos",
              route: "/manejo-de-datos"
            }
          ],
          email: null,
          toSubscribeResponse: false
        };
      },
      computed: {
        info() {
          return this.$store.state.tienda;
        },
        storeData() {
            return this.$store.state.tienda;
          },
        tienda() {
            return this.$store.state.tienda;
          },
          politicas() {
            return this.$store.state.politicas;
          },
          mediospago() {
            return this.$store.state.mediospago;
          },
          addresses() {
            if (this.$store.state.geolocalizacion) {
              return this.$store.state.geolocalizacion.slice(0, 3);
            } else {
              return [];
            }
          },
          styles() {
            return {
              colorPrincipal: { backgroundColor: this.$store.state.colorPrincipal },
              colorSecundario: { color: this.$store.state.colorSecundario }
            };
          },
          phone() {
            return this.$store.state.tienda.telefono;
          },
          facebook() {
            return this.$store.state.tienda.red_facebook;
          },
          instagram() {
            return this.$store.state.tienda.red_instagram;
          },
          youtube() {
            return this.$store.state.tienda.red_youtube;
          },
          twitter() {
            return this.$store.state.tienda.red_twitter;
          }
      },
      methods: {
        submitNewsletter() {
            let json = {
              correo: this.email,
              tienda: this.$store.state.id
            };
            axios.post(`${this.$urlHttp}/api/front/suscriptores`, json);
          },
        activeRoute(item) {
          if (item.name != "Sobre nosotros") {
            return true;
          }
          return !!(this.info.nosotros || this.info.mision || this.info.vision);
        },
        toSubscribe() {
            this.toSubscribeResponse = false;
            const params = {
              correo: this.email,
              tienda: this.storeData.id_tienda
            };
            axios
              .post("https://templates.komercia.co/api/suscriptores", params)
              .then(() => {
                this.email = "";
                this.toSubscribeResponse = true;
              });
          }
      }
}