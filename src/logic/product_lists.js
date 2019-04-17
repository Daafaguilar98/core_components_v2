export default {
    created () {
        this.$store.dispatch('products/SET_FILTER', this.$route.query)
      },
      mounted () {
        if (this.$store.getters['products/filterProducts']) {
          this.products = this.$store.getters['products/filterProducts']
          let maxTMP = 0
          this.products.forEach(product => {
            if (maxTMP <= product.precio) {
              this.price[1] = product.precio
              this.range.max = parseInt(product.precio)
              maxTMP = product.precio
            }
          })
        }
      },
    data() {
      return {
				add: true,
      	search: "",
				paginate: ['products'],
				products: [],
				price: [0, 1000000],
				range: {
					max: 0
				},
				currentPage: 1,
				HigherOrLower: "",
				productsCategory: [],
				sub: -1,
				show: false,
				value: "",
				valuesub: "",
				selectSubcategory: ""
    	}
    },
      computed: {
        selectedCard () {
          return this.$store.state.selectedCard
        },
          Fullproducts() {
            return this.$store.getters["products/filterProducts"];
          },
          filterProduct() {
            const initial = this.currentPage * 40 - 40;
            const final = initial + 40;
            return this.products.slice(initial, final);
					},
					categorias() {
						return this.$store.state.categorias;
					},
					subcategories() {
						return this.$store.state.subcategorias;
					},
					getProductsCategorie() {
						const initial = this.currentPage * 40 - 40;
						const final = initial + 40;
						return this.Fullproducts.filter(
							product => product.categoria == this.select
						).slice(initial, final);
					},
					// selectedCategory2() {
					// 	return "";
					// },
					selectedType() {
						return this.$store.state.products.type;
					}
      },
      watch: {
        Fullproducts(value) {
          this.products = value;
          let maxTMP = 0;
          value.forEach(product => {
            if (maxTMP <= product.precio) {
              this.price[1] = product.precio;
              this.range.max = parseInt(product.precio);
              maxTMP = product.precio;
            }
          });
				},
				search(value) {
					this.Searchproduct(value);
				},
        currentPage() {
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 250);
        },
        HigherOrLower(value) {
          if (value === "higher") {
            this.products = this.Fullproducts.sort((a, b) => b.precio - a.precio);
          } else {
            this.products = this.Fullproducts.sort((a, b) => a.precio - b.precio);
          }
        },
        price() {
          this.filterRange();
				},
				value(value) {
					this.sendCategory(value);
				},
				valuesub(value) {
					this.Sendsubcategory(value);
				}
      },
      methods: {
				selected(name) {
					// this.addClass();
					// this.$store.dispatch("products/FILTER_BY", {
					//   type: "category",
					//   data: name.nombre_categoria_producto
					// });
					// this.currentPage = 1;
				},
        Allcategories() {
					this.$store.dispatch("products/FILTER_BY", { type: "all", data: "" });
          this.currentPage = 1;
        },
        Searchproduct(search) {
					if (search.length) {
						this.$store.dispatch("products/FILTER_BY", {
							type: "search",
							data: search
						});
					} else {
						this.$store.dispatch("products/FILTER_BY", { type: "all", data: "" });
					}
          this.currentPage = 1;
        },
        selectedCategory(value) {
          this.currentPage = 1;
        },
        selectedSubCategory(value) {
          this.currentPage = 1;
        },
        filterRange() {
          this.products = this.Fullproducts.filter(producto => {
            if (
              producto.precio >= this.price[0] &&
              producto.precio <= this.price[1]
            ) {
              return producto;
            }
          });
				},
				addClass() {
					this.add = !this.add;
				},
				mouseOver(index) {
					this.sub = index;
					this.show = true;
				},
				mouseLeave() {
					this.sub = -1;
					this.show = false;
				},
				Sendsubcategory(value) {
					console.log(value);
					this.selectSubcategory = value;
					this.$store.dispatch("products/FILTER_BY", {
						type: "subcategory",
						data: value
					});
				},
				sendCategory(value) {
					this.$store.dispatch("products/FILTER_BY", {
						type: "category",
						data: value
					});
				},
				clear() {
					this.$store.dispatch("products/FILTER_BY", { type: "all", data: "" });
					this.$emit("clear");
				}
      },
      filters: {
        currency(value) {
          if (value) {
            return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
          }
          return "$0";
        }
      }
}