import axios from "axios";
// import koWhatsapp from '../../Icons/whatsapp'

export default {
	// components: {
	// 	koWhatsapp
	// },
  mounted() {
		this.makeMap();
		if (Object.keys(this.$store.state.envios).length) {
      this.setOptionEnvio()
    }
  },
  data() {
		return {
			nombre: "",
      email: "",
      numberphone: "",
      comment: "",
      message: {
				text: "",
        open: false
      },
      envio: {
        titulo: '',
        desc: ''
      }
    };
  },
  computed: {
		geolocalizacion() {
			return this.$store.state.geolocalizacion;
    },
    storeData() {
      return this.$store.state.tienda
    },
    envios() {
      return this.$store.state.envios
    }
  },
	watch: {
		geolocalizacion() {
			this.makeMap();
		},
		envios() {
      this.setOptionEnvio()
    }
	},
  methods: {
    submitContact() {
      const json = {
        nombre: this.nombre,
        correo: this.email,
        celular: this.numberphone,
        comentario: this.comment,
        tienda: this.$store.state.id
      };
      axios
        .post(`https://templates.komercia.co/api/mensaje-contacto`, json)
        .then(response => {
          this.nombre = "";
          this.email = "";
          this.numberphone = "";
          this.comment = "";
          this.$store.state.id = "";
        });
    },
    makeMap() {
      let place = { latitud: 4.14, longitud: -73.63 };
      if (this.geolocalizacion && this.geolocalizacion.length != 0) {
        place = this.geolocalizacion[0];
      }
      const firstPlace = { lat: place.latitud, lng: place.longitud };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: firstPlace
      });
      if (this.geolocalizacion) {
        for (const place of this.geolocalizacion) {
          const marker = new google.maps.Marker({
            position: { lat: place.latitud, lng: place.longitud },
            map
          });
        }
      }
		},
		setOptionEnvio() {
      if (this.envios.estado) {
        switch (this.envios.valores.envio_metodo) {
          case 'gratis':
            this.envio = {
              titulo: 'Envío gratis',
              desc: 'Disfruta de este obsequio por parte de la tienda.'
            }
            break
          case 'tarifa_plana':
            this.envio = {
              titulo: 'Tarifa plana',
              desc: 'Este costo de envio no varia'
            }
            break
          case 'precio':
            this.envio = {
              titulo: 'Tarifa por precio',
              desc:
                'Segun la suma del costo de tus productos te cobraran el envio'
            }
            break
          case 'peso':
            this.envio = {
              titulo: 'Tarifa por peso',
              desc: ''
            }
            break
          default:
        }
      } else {
        this.envio = {
          titulo: '',
          desc: ''
        }
      }
    }
  }
};