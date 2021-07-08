<template>
  <div class="root" id="root">
    <header class="main-header container-fluid align-items-center d-flex">
      <div class="main-header--menu-pointer" ref="header-menu-pointer"></div>
      <div
        class="main-header--menu-pointer light"
        ref="header-menu-active-pointer"
      ></div>
      <nav class="main-header--menu-wrapper">
        <ul class="main-header--menu-list d-flex flex-row">
          <li
            v-for="(page, index) in pages"
            :key="index"
            class="main-header--menu-list-item"
          >
            <nuxt-link
              @mouseenter.native="
                replaceHeaderMenuPosition($event, 'header-menu-pointer')
              "
              @mousewheel.native="
                setoffsetPointerPosition('header-menu-pointer')
              "
              @mouseleave.native="
                setoffsetPointerPosition('header-menu-pointer')
              "
              @click.native="
                setDefaultLinkPosition($event),
                  replaceHeaderMenuPosition(
                    $event,
                    'header-menu-active-pointer',
                  )
              "
              :to="page.path"
              exact-active-class="main-header--menu-target"
            >
              {{ page.title }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </header>
    <main class="main-body">
      <nuxt />
      <!-- GOO FIlter -->
      <svg
        style="position: fixed; left: -6000px"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 18 -9"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </main>
    <footer class="main-footer container-fluid">Test Footer</footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => {
    return {
      offsetPointerPosition: -50,
      activeLinkXPos: -50,
    };
  },
  computed: mapState('app', {
    title: (state) => state.title,
    pages: (state) => state.pages,
  }),
  methods: {
    setoffsetPointerPosition(ref) {
      this.$refs[ref].style['left'] = `${
        this.offsetPointerPosition + this.activeLinkXPos
      }px`;
    },
    setDefaultLinkPosition(event) {
      this.activeLinkXPos = event.target.getBoundingClientRect().x;
    },
    replaceHeaderMenuPosition(event, ref) {
      const x = event.target.getBoundingClientRect().x;
      this.$refs[ref].style['left'] = this.offsetPointerPosition + x + 'px';
    },
  },
  mounted() {
    this.activeLinkXPos = document
      .querySelector('.main-header--menu-target')
      .getBoundingClientRect().x;

    this.$refs['header-menu-pointer'].style['left'] = `${
      this.offsetPointerPosition + this.activeLinkXPos
    }px`;
    this.$refs['header-menu-active-pointer'].style['left'] = `${
      this.offsetPointerPosition + this.activeLinkXPos
    }px`;
  },
};
</script>

<style lang="scss" scoped>
.root {
  overflow: hidden;
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  &-body {
    flex: 1 0 auto;
  }

  &-header {
    width: 100%;
    position: relative;
    filter: url(#goo);
    &--menu {
      &-wrapper {
        width: 100%;
      }

      &-list {
        width: 100%;

        &-item a {
          padding-right: 30px;
          transform-origin: center;
        }
      }
    }
    &--menu-pointer {
      z-index: -1;
      position: absolute;
      transform-origin: center;
      width: 150px;
      height: 150px;
      background-color: rgb(104, 104, 104);
      border-radius: 50%;
      transition: left 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

      &.light {
        background-color: rgb(150, 150, 150);
      }
    }
  }

  &-header,
  &-footer {
    background-color: gray;
    color: white;
    height: 100px;
    flex: 0 0 auto;
  }
}
</style>
