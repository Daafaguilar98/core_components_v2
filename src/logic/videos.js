export default{
    props: {
        setting: {
          type: Object,
          default: function() {
            return {
              url: "",
              type: "Youtube"
            };
          }
        }
      }
}