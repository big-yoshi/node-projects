Vue.component('cell-item', {
  data: function () {
    return {
      input: true,
      titletext: "",
      
      textbox: true,
      text: "fek"
      
    }
  },
  methods: {
    change2textbox: function (event) {
      this.textbox = true;
    },
    change2blog: function (event) {
      this.textbox = false;
      this.text = event.target.value;
      
    },
    change2title:function(event){
      this.input = false;
      this.titletext = event.target.value;
    },
    change2input: function(event){
      this.input = true;
    }

  },
  
  template: 
  `
<div class='cell animate__animated animate__fadeInDown'>
    <div class="cell-title">
        
      <input v-on:keyup.enter="change2title"   :value=title placeholder="Write a Title" v-if="input"></input>
      <h1 v-on:click='change2input' v-else>{{titletext}}</h1>
      
      
    </div>

    <div class="cell-blog">
            <textarea placeholder="Write Something"  v-on:keyup.shift.13="change2blog" v-if="textbox">
            </textarea>
            <div class="cell-paragraph" v-on:click="change2textbox" v-else>
              {{text}}
            </div>
          </div>
  <button v-on:click="$emit(\'add\')">Add</button>
  <button v-on:click="$emit(\'remove\')">Remove</button>
</div>
  `,
  props: ['title']
})

new Vue({
  el: '.container',
  data: {
    cells: [
      { id:1,title: '' }
    ]
  },
  methods:{
    addCell:function(index){
        console.log(index)
        
        }
  }

})

