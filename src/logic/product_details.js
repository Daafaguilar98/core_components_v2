import axios from "axios";

export default{
    created() {
        this.$store.state.beforeCombination = [];
        if (this.$store.state.productsData.length) {
          this.getDataProduct();
        }
      },
      mounted() {
        if (Object.keys(this.$store.state.envios).length) {
          this.setOptionEnvio();
        }
      },
      data() {
        return {
          data: {},
          selectPhotoUrl: "",
          idYoutube: "",
          existYoutube: false,
          maxQuantityValue: 1,
          quantityValue: 1,
          productIndexCart: null,
          warranty: "",
          productCart: {},
          salesData: null,
          spent: false,
          envio: {
            titulo: "",
            desc: ""
          }
        };
      },
      watch: {
        productsData(value) {
          this.getDataProduct();
        },
        envios(value) {
          this.setOptionEnvio();
        },
        quantityValue(value) {
          if (value > this.maxQuantityValue) {
            this.quantityValue = this.maxQuantityValue;
          }
        },
        beforeCombination(value) {
          const combinationSelected = JSON.stringify(value);
          const combinaciones = JSON.parse(this.data.combinaciones.combinaciones);
          const result = combinaciones.filter(
            (combinacion, index) =>
              JSON.stringify(combinacion.combinacion) == combinationSelected
          )[0];
          this.productCart = [];
          this.productIndexCart = null;
          for (const [
            index,
            productCart
          ] of this.$store.state.productsCart.entries()) {
            if (
              this.data.detalle.id == productCart.id &&
              JSON.stringify(productCart.combinacion) ==
                JSON.stringify(result.combinacion)
            ) {
              this.productIndexCart = index;
              this.productCart = productCart;
            }
          }
          if (result) {
            this.spent = false;
            this.maxQuantityValue = result.unidades;
            if (result.unidades == 0) {
              this.spent = true;
            }
            if (this.productCart.cantidad) {
              this.maxQuantityValue =
                parseInt(result.unidades) - this.productCart.cantidad;
              if (this.maxQuantityValue <= 0) {
                this.spent = true;
              }
            }
            this.salesData = result;
            this.quantityValue = 1;
          }
        }
      },
      computed: {
        url() {
          return window.location.href;
        },
        productsData() {
          return this.$store.state.productsData;
        },
        existPayments() {
          const mediospago = this.$store.state.mediospago;
          if (
            mediospago.consignacion ||
            mediospago.convenir ||
            mediospago.payco ||
            mediospago.tienda ||
            mediospago.efecty
          ) {
            return true;
          }
          return false;
        },
        modalPayment() {
          return this.$store.state.togglePayment;
        },
        beforeCombination() {
          return this.$store.state.beforeCombination;
        },
        envios() {
          return this.$store.state.envios;
        },
        precio() {
          if (this.data.detalle.precio) {
            return `$${this.data.detalle.precio
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
          }
        },
        priceShipping() {
          let value = 0;
          if (this.envios.valores.envio_metodo != null) {
            if (this.envios.valores.envio_metodo == "precio") {
              let rangos = this.envios.valores.rangos.filter(
                r =>
                  r.inicial <= this.salesData.precio &&
                  r.final >= this.salesData.precio
              );
              // si no exiten rangos
              if (rangos.length == 0) {
                value = 0;
                // Existen rangos
              } else {
                value = rangos[0].precio;
              }
            }
          }
          return value;
        },
        whatsapp() {
          return this.$store.state.whatsapp;
        }
      },
      methods: {
        searchIdForSlug() {
          const product = this.productsData.filter(
            product => product.slug === this.$route.params.slug
          );
          if (product.length) {
            return product[0].id;
          }
          return this.productsData[0].id;
        },
        mobileCheck() {
          window.mobilecheck = function() {
            var check = false;
            (function(a) {
              if (
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                  a
                ) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                  a.substr(0, 4)
                )
              )
                check = true;
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
          };
          return window.mobilecheck();
        },
        redirectWhatsapp() {
          if (this.mobileCheck()) {
            window.open(
              `https://wa.me/57${
                this.whatsapp
              }/?text=Hola%20vengo%20de%20tu%20tienda%20online%20y%20me%20gustaría%20recibir%20mas%20información`,
              "_blank"
            );
          } else {
            window.open(
              `https://web.whatsapp.com/send?phone=57${
                this.whatsapp
              }&text=Hola%20vengo%20de%20tu%20tienda%20online%20y%20me%20gustaría%20recibir%20mas%20información%20de%20este%20producto%20${
                window.location
              }`,
              "_blank"
            );
          }
        },
        getDataProduct() {
          const idOfSlug = this.searchIdForSlug();
          if (idOfSlug) {
            axios
              .get(`https://templates.komercia.co/api/producto/${idOfSlug}`)
              .then(response => {
                this.selectedPhoto(response.data.detalle.foto_cloudinary);
                this.videoYoutube(response.data.info.video);
                this.data = response.data;
                this.setOptionEnvio();
                this.salesData = {
                  precio: this.data.detalle.precio,
                  unidades: this.data.info.inventario,
                  sku: this.data.info.sku,
                  estado: true
                };
                this.maxQuantityValue = this.data.info.inventario;
                for (const [
                  index,
                  productCart
                ] of this.$store.state.productsCart.entries()) {
                  if (this.data.detalle.id == productCart.id) {
                    this.productIndexCart = index;
                    this.productCart = productCart;
                    this.maxQuantityValue =
                      this.data.info.inventario - productCart.cantidad;
                  }
                }
                if (this.salesData.unidades == 0 || this.maxQuantityValue <= 0) {
                  this.spent = true;
                }
              });
          } else {
            this.selectedPhoto(this.productsData[0].foto_cloudinary);
            // this.videoYoutube(this.productsData[0].foto);
            this.data.detalle = {
              foto_cloudinary: this.productsData[0].foto_cloudinary,
              nombre: this.productsData[0].nombre,
              precio: this.productsData[0].precio
            };
            this.data.info = {
              marca: "",
              descripcion: ""
            };
            this.maxQuantityValue = 0;
            this.salesData = {
              precio: 29998,
              unidades: 0,
              sku: "4a00"
            };
            this.spent = true;
          }
        },
        togglePayment() {
          this.$store.state.togglePayment = !this.$store.state.togglePayment;
        },
        setOptionEnvio() {
          if (this.data.detalle.envio_gratis) {
            this.envio = {
              titulo: "Envío gratis",
              desc: "Disfruta de este obsequio por parte de la tienda."
            };
          } else {
            switch (this.envios.valores.envio_metodo) {
              case "gratis":
                this.envio = {
                  titulo: "Envío gratis",
                  desc: "Disfruta de este obsequio por parte de la tienda."
                };
                break;
              case "tarifa_plana":
                this.envio = {
                  titulo: "Tarifa plana",
                  desc: `Compra todo lo que quieras en nuestra tienda, el valor del envio siempre sera el mismo: Valor envio $${
                    this.envios.valores.valor
                  }`
                };
                break;
              case "precio":
                this.envio = {
                  titulo: "Tarifa por precio",
                  desc:
                    "Segun la suma del costo de tus productos te cobraran el envio"
                };
                break;
              case "peso":
                this.envio = {
                  titulo: "Tarifa por peso",
                  desc: ""
                };
                break;
              default:
            }
          }
        },
        quantity(productCart) {
          this.quantityValue = productCart.cantidad;
        },
        addQuantity() {
          if (this.maxQuantityValue > this.quantityValue) {
            this.quantityValue++;
            this.data.cantidad = this.quantityValue;
          } else {
            // Alerta de limite de sku
          }
        },
        removeQuantity() {
          if (this.data.cantidad >= 2) {
            this.quantityValue--;
            this.data.cantidad = this.quantityValue;
          }
        },
        setMiniPhoto(photo) {
          if (photo === "placeholder1.svg") {
            // return require(`../../assets/${photo}`);
          }
          return photo;
        },
        selectedPhoto(photo) {
          if (photo === "placeholder1.svg") {
            // this.selectPhotoUrl = require(`../../assets/${photo}`);
          } else {
            this.selectPhotoUrl = photo;
          }
          this.existYoutube = false;
        },
        videoYoutube(url) {
          let myregexp = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/;
          let id = "";
          if (url && url !== "" && url !== "null") {
            this.validVideo = true;
            let id = url.match(myregexp);
            if (id) {
              return id[1];
            }
          }
        },
        addShoppingCart() {
          if (!this.data.cantidad) {
            this.data.cantidad = this.quantityValue;
          }
          const product = {
            id: this.data.detalle.id,
            precio: this.salesData.precio,
            cantidad: this.data.cantidad,
            foto_cloudinary: this.data.detalle.foto_cloudinary,
            nombre: this.data.detalle.nombre,
            combinacion: this.salesData.combinacion
          };
          if (this.salesData) {
            product.limitQuantity = this.salesData.unidades;
          } else {
            product.limitQuantity = this.data.info.inventario;
          }
          if (typeof this.productIndexCart === "number") {
            const mutableProduct = this.$store.state.productsCart[
              this.productIndexCart
            ];
            mutableProduct.cantidad += this.data.cantidad;
            this.$store.state.productsCart.splice(
              this.productIndexCart,
              1,
              mutableProduct
            );
          } else {
            this.$store.state.productsCart.push(product);
          }
          this.$store.commit("UPDATE_CONTENTCART");
          this.$router.push("/productos");
          this.$store.state.openOrder = true;
          this.$store.state.orderComponent = true;
        },
        evalStock(mq, qv) {
          return !(mq - qv < 0);
        }
      },
      filters: {
        currency(value) {
          if (value) {
            return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
          }
        },
        toLowerCase(value) {
          if (value) {
            return value.toLowerCase();
          }
          return "";
        }
      }
}