import Vue from 'vue';
import axios from 'axios';
import filterByTitle from './services/search'

const imagesEndpoint = '/api/images.json';

new Vue({
  el: '#root',
  template: `
    <div style="display: flex; align-items: center; justify-content: center; margin: 25px">
        Search
        <input v-model="filterTitle" placeholder="Type here...">
    </div>

    <div style="display: flex; flex-wrap: wrap;">
        <div v-for="photo in photos">
            <img v-bind:src="photo.url_m">
        </div>
    </div>
  `,
  data: {
    filterTitle: '',
    data: {},
  },
  computed: {
    photos() {
      const photos = this.data.photos;

      if (!photos) {
        return [];
      }

      const filter = filterByTitle(this.filterTitle);

      return photos.photo.filter(photo => filter(photo.title));
    }
  },
  created() {
    axios.get(imagesEndpoint).then(res => {
      this.data = res.data;
    });
  }
});