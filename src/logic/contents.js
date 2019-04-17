export default {
    props: {
      setting: {
        type: Object,
        default: function () {
          return {
            effect: '',
            spaces: "",
            width: null,
            items: [{
              photo: 'https://images.pexels.com/photos/910329/pexels-photo-910329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              title: 'SUMMER',
              description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              redirect_url: '',
              button_text: 'SHOP NOW',
              source:
                "http://cdn.ycombinator.com/images/startups/airbnb-9bd66443.png",
              redirect_to: {
                type: "",
                value: "https://www.airbnb.com"
              }
            },
            {
              photo: 'https://images.pexels.com/photos/1153838/pexels-photo-1153838.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
              title: 'SPRING',
              description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              redirect_url: '',
              button_text: 'SELL IT',
              source:
                "http://cdn.ycombinator.com/images/startups/twitch-55c54fd1.png",
              redirect_to: {
                type: "",
                value: "https://www.twitch.tv/"
              }
            }]
          }
        }
      }
    },
  }