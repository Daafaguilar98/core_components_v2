<template>
  <div class="contacto">
    <div class="contacto_content">
      <div class="maps" v-show="geolocalizacion.length">
        <div id="map"></div>
      </div>
      <div class="contact">
        <input type="text" placeholder="Nombres" v-model="nombre">
        <input type="text" placeholder="Correo electrónico" v-model="email">
        <input type="text" placeholder="Celular" v-model="numberphone">
        <textarea rows="8" placeholder="Comentario" v-model="comment"></textarea>
        <button class="submitContact" v-on:click="submitContact">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import Contacts from "../../logic/contacts.js";
export default {
  mixins: [Contacts],
  name: "koContact1"
};
</script>

<style scoped>
.contacto {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
header {
  position: relative;
  width: 100%;
  height: 90px;
  background-color: #9b9b9b;
  padding: 0 20px;
}
.contacto_content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
}
.maps {
  position: relative;
  max-width: 480px;
  width: 100%;
  max-height: 480px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  margin: 0 20px 20px 0;
}
#map {
  max-width: 480px;
  width: 100%;
  height: 480px;

  background-color: #eee;
}
.contact {
  max-width: 700px;
  width: 96%;
  bottom: 10px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0px 16px;
  border-width: 1px;
  border-style: solid;
  border-color: var(--main_color);
  box-shadow: 0 3px 12px 3px rgba(0, 0, 0, 0.1);
  margin: 0 10px;
}
.contact input,
.contact textarea {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-left: 10px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  /*margin: 0 10px;*/
  outline: none;
  border-style: none;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  border: solid 0.5px #e8e9ed;
  margin: 16px 0;
  resize: none;
}
.contact input:focus,
.contact textarea:focus {
  border: solid 1px #cecfd0;
}
.contact input {
  max-width: 350px;
  height: 40px;
}
.contact textarea {
  box-sizing: border-box;
  padding: 15px 10px;
}
.contact .submitContact {
  border-style: none;
  padding: 10px 40px;
  margin: 0 10px 10px 0px;
  outline: none;
  cursor: pointer;
  background-color: var(--button_color);
  color: var(--button_text_color);
}
.message {
  position: absolute;
  max-width: 400px;
  height: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  background-color: #fff;
  z-index: 3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
  overflow: hidden;
  transform: translateY(0px);
  opacity: 0;
  transition: 0.3s;
}
.message i {
  padding: 10px;
  background-color: #13ce66;
  color: #fff;
}
.message p {
  margin: 0 10px;
  text-align: center;
  font-size: 15px;
  color: #656565;
}
.openMessage {
  height: initial;
  opacity: 1;
  transform: translateY(20px);
}
@media (max-width: 1260px) {
  .contacto_content {
    grid-auto-flow: column;
    grid-template: auto auto / 1fr;
    grid-row-gap: 20px;
  }
}
@media (max-width: 920px) {
}
</style>
