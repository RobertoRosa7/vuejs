<template>
  <div id="app">
    <header class="jumbotron jumbotron-fluid">
      <div class="container">
        <transition name="slideTop">
          <div v-if="slideTop" class="position-absolute alert alert-success">Animações - sistema de transições</div>
        </transition>
        <h1 class="display-4">Animações</h1>
        <p class="lead">Treinando animações com VueJS</p>
      </div>
    </header>

    <div class="container">
      <button class="btn btn-info mb-3 mr-2" @click="fade = !fade">Fade</button>
      <button class="btn btn-info mb-3 mr-2" @click="zoom = !zoom">Zoom</button>
      <button class="btn btn-info mb-3 mr-2" @click="slide = !slide">Slide</button>
      <button class="btn btn-info mb-3 mr-2" @click="slideTop = !slideTop">SlideTop</button>
      <button class="btn btn-info mb-3 mr-2" @click="animated = !animated">animated</button>
      <button class="btn btn-info mb-3 mr-2" @click="hooks = !hooks">hooks</button>
      <div class="row">

        <div class="col-md-6">
          <transition name="fade">
            <div v-if="fade" class="alert alert-warning">Animações - sistema de transições</div>
          </transition>
        </div>

        <div class="col-md-6">
          <transition name="zoom">
            <div v-if="zoom" class="alert alert-dark">Animações - sistema de transições</div>
          </transition>
        </div>
      </div>

      <transition name="slide">
        <div v-if="slide" class="alert alert-success">Animações - sistema de transições</div>
      </transition>

      <div class="row">
        <div class="col-md-6">
          <transition
            enter-class=""
            enter-active-class="animated bounceInLeft"
            enter-to-class=""

            leave-class=""
            leave-active-class="animated zoomOutLeft"
            leave-to-class=""
          >
            <div v-if="animated" class="alert alert-success">Animações personalizadas - bounceInleft/zoomOutleft</div>
          </transition>
        </div>
        <div class="col-md-6">
          <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @enter-cancelled="enterCancelled"

            @before-leave="beforeLeave"
            @leave="leave"
            @after-leave="afterLeave"
            @leave-cancelled="leaveCancelled"

            :css="false"
          >
            <div v-if="hooks" class="alert alert-success">Animações personalizadas - Gatilhos (hooks) de animações</div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return {
      fade: true,
      zoom: true,
      slide: false,
      slideTop: false,
      animated: true,
      hooks: true,
    }
  },
  methods:{
    beforeEnter(el){
      console.log('before enter');
      el.style.opacity = 0;
    },
    enter(el, done){
      console.log('enter');
      let count = 0;
      const  interval = setInterval(() =>{
        el.style.opacity = +el.style.opacity + 0.1;
        count++;
        if(count > 10){
          clearInterval(interval);
          done();
        }
      }, 150);
    },
    afterEnter(el){
      console.log('after enter');
    },
    enterCancelled(el){
      console.log('enter cancelled');
    },
    beforeLeave(el){
      console.log('before leave');
      el.style.transition = 'width 0.5s';
      el.style.overflow = 'hidden';
      el.style.whiteSpace = 'nowrap';
    },
    leave(el, done){
      console.log('leave');
      let count = 0;
      let size = el.offsetWidth;
      const interval = setInterval(() =>{
        el.style.width = (size * (1 - (count / 10))) + 'px';
        count++
        if(count > 10){
          clearInterval(interval);
          done();
        }
      }, 150);
    },
    afterLeave(el){
      console.log('after leave');
    },
    leaveCancelled(el){
      console.log('leave cancelled');
    }
  }
}
</script>

<style scoped>
  /* Para as animações default usamos a tag <transition> sem nome devemos usar v-enter
  já para animações com name devemos substituir v com o nome da animação */
  /* entrada */
  .fade-enter,  .fade-leave-to{
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active{
    transition: opacity 1s;
  }
  
  .zoom-enter, .zoom-leave-to{
    transform: scale(0);
  }
  .zoom-enter-active, .zoom-leave-active{
    transition: transform 0.5s;
  }

  @keyframes slide {
    0%{
     transform: translateX(-200px);
    }
    100%{
     transform: translateX(0);
    }
  }
   @keyframes slideTop {
    0%{
     transform: translateY(-100%);
    }
    100%{
     transform: translateY(0);
    }
  }
  .slide-enter, .slide-leave-to{
    opacity: 0;
  }
  .slide-enter-active{
    animation: slide 0.7s;
    transition: opacity 0.7s;
  }
  .slide-leave-active{
    animation: slide 0.7s reverse;
    transition: opacity 0.7s;
  }

  .slideTop-enter, .slideTop-leave-to{
    opacity:0;
  }
  .slideTop-enter-active{
    animation: slideTop 0.5s;
    transition: opacity 0.5s;
  }
  .slideTop-leave-active{
    animation: slideTop 0.5s reverse;
    transition: opacity 0.5s;
  }


</style>
