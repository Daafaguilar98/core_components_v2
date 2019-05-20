export default{
    props: {
        setting: {
          type: Object,
          default: function() {
            return {
							url_iframe: "",
							size_iframe: "",
              slides: [
                {
                  foto_cloudinary:
                    "https://cdn.shopify.com/s/files/1/0011/8423/5583/files/slideshow1_776d460a-9623-4173-a569-66e3ed4966ef.png?v=1529577793",
                    redirect_to: ""
                }
              ]
            };
          }
        }
      },
      components: {
        Carousel,
        Slide
      },
      data() {
        return {
					swipe: {
						activeIndex: 0
					},
          indexBtn: 0,
          indexBtn2: 0,
          swiperOption: {
            slidesPerView: 1,
            // spaceBetween: 30,
            mousewheel: true,
            // width: "1600",
            pagination: {
              el: ".swiper-pagination",
              clickable: true
            }
          },
          swiperOption2: {
            slidesPerView: 1,
            // spaceBetween: 30,
            mousewheel: true,
            // width: "800",
            pagination: {
              el: ".swiper-pagination",
              clickable: true
            }
          }
        };
      },
      computed: {
        swiper() {
          return this.$refs.mySwiper.swiper;
        },
        swiper2() {
          return this.$refs.mySwiper2.swiper;
        },
        btnColor() {
          return this.setting.styleObject.btnColor;
        },
        banners() {
          if (this.setting.data.bannersResponsive.length == 0) {
            return this.setting.data.banners;
          } else {
            return this.setting.data.bannersResponsive;
          }
        }
      },
      methods: {
        changeSlide(index) {
          this.swiper.slideTo(index, 1000, false);
        },
        changeSlide2(index) {
          this.indexBtn2 = this.swiper2.activeIndex;
          this.swiper2.slideTo(index, 1000, false);
        },
        activeBtn() {
          this.indexBtn = this.swiper.activeIndex;
        },
        activeBtn2() {
          this.indexBtn2 = this.swiper2.activeIndex;
        }
      }
}