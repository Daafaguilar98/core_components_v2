import axios from "axios";

export default {
  data() {
    return {
      description: {
        description1: "Suscribete a nuestro newsletter para obtener información"
      },
      email: null
    };
  },
  methods: {
    submitNewsletter() {
      if (this.email) {
        const json = {
          email: this.email,
          tienda: this.$store.state.id
        };
        axios.post(`https://api2.komercia.co/api/tienda/suscriptor`, json);
      }
    }
  }
};