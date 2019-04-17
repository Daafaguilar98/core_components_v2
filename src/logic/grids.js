export default {
    props: {
        setting: {
          type: Object,
          default: function() {
            return {
              data: []
            };
          }
        }
      },
      created() {
        this.select = this.setting.data[0];
      },
      data() {
        return {
          select: ""
        };
      },
      computed: {
        products() {
        return this.$store.state.productsData.slice(0, 6);
        },
        selectedCard() {
          return this.$store.state.selectedCard;
        },
        productsData() {
          return this.$store.state.productsData.filter(
            product => product.categoria == this.select
          );
        },
        categories() {
          return this.$store.state.categorias;
        }
      },
      watch: {
        "setting.data": function(value) {
          this.select = value[0];
        }
      },
      methods: {
        selected(name) {
          this.select = name;
        }
      }
}