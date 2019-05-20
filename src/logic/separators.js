export default {
    props: {
        setting: {
          type: Object,
          default: function() {
            return { title: "Titulo", description: "Descripción del separador" };
          }
        }
      }
}