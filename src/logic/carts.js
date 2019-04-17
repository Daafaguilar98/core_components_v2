export default {
    computed: {
      products() {
        return this.$store.state.productsCart || []
      },
      totalCart() {
        return this.$store.state.totalCart
      },
      orderComponent() {
        return this.$store.state.orderComponent
      },
      shipping() {
        let shipping = this.$store.state.envios.valores
        switch (shipping.envio_metodo) {
          case 'gratis':
            return 0
            break
          case 'tarifa_plana':
            return shipping.valor
            break
          case 'precio':
            let result = shipping.rangos.filter(rango => {
              if (
                this.totalCart >= rango.inicial &&
                this.totalCart <= rango.final
              ) {
                return rango
              }
            })[0]
            return result.precio
            break
          default:
        }
      }
    },
    methods: {
      show() {
        this.$store.commit('UPDATE_CONTENTCART')
        this.$store.commit('CALCULATE_TOTALCART')
      },
      addQuantity(product, index) {
        if (product.limitQuantity > product.cantidad) {
          product.cantidad += 1
          this.products.splice(index, 1, product)
          this.$store.commit('UPDATE_CONTENTCART')
        }
      },
      removeQuantity(product, index) {
        if (this.products[index].cantidad >= 2) {
          product.cantidad -= 1
          this.products.splice(index, 1, product)
          this.$store.commit('UPDATE_CONTENTCART')
        }
      },
      setFoto(product) {
        if (product.placeholder) {
          return require(`../assets/${product.foto}`)
        } else {
          return product.foto_cloudinary
        }
      },
      deleteItemCart(i) {
        this.$store.state.productsCart.splice(i, 1)
        this.$store.commit('UPDATE_CONTENTCART')
      },
      backPage(e) {
        if (e.target.id == 'order' || e.target.id == 'closeOrder') {
          this.$store.state.orderComponent = false
        }
      },
      next() {
        let json = {
          products: this.$store.state.productsCart,
          tienda: {
            id: this.$store.state.tienda.id_tienda,
            nombre: this.$store.state.tienda.nombre,
            logo: this.$store.state.tienda.logo,
            location:
              this.$store.state.tienda.dominio ||
              `http://${this.$store.state.tienda.subdominio}.komercia.co/`
          },
          tipo: 0,
          total: this.$store.state.totalCart,
          estado: 0,
          direccion_entrega: 1
        }
        json = JSON.stringify(json)
        if (this.$store.state.productsCart.length != 0) {
          location.href = `https://checkout.komercia.co/?params=${json}`
        }
      }
    },
    filters: {
      currency(value) {
        if (value) {
          return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
        }
      }
    }
  }