<template>
  <div class="enhanced-about-page">
    <div class="top-section">
      <div class="image-container">
        <img
          src="@/assets/about1.jpg"
          alt="Featured image"
          class="featured-image"
        />
      </div>
      <div class="content-container">
        <div class="content-wrapper">
          <transition appear name="fade-slide">
            <div class="tag">{{ tag }}</div>
          </transition>
          <transition appear name="fade-slide" :delay="200">
            <h1 class="title">{{ title }}</h1>
          </transition>
          <transition appear name="fade-slide" :delay="400">
            <p class="description">{{ description }}</p>
          </transition>
          <transition appear name="fade-slide" :delay="600">
            <button class="learn-more-btn" @click="scrollToBottom">
              Learn More
            </button>
          </transition>
        </div>
      </div>
    </div>
    <div class="bottom-section" ref="bottomSection">
      <div class="full-width-content">
        <transition name="fade-slide" appear>
          <h2>{{ additionalTitle }}</h2>
        </transition>
        <transition name="fade-slide" appear :delay="200">
          <p>{{ additionalContent }}</p>
        </transition>
      </div>
    </div>
    <div class="floating-shapes">
      <div v-for="n in 5" :key="n" class="shape"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EnhancedAboutPage",
  data() {
    return {
      tag: "皮皮翔AI答答",
      title: "Welcome to the world of AI!",
      description:
        "基于Spring Boot + Redis + ChatGLM + RxJava + SSE 的 AI 答题应用平台。",
      additionalTitle: "More About My Project",
      additionalContent:
        "This AI quiz application platform is developed using Spring Boot, Redis, ChatGLM, RxJava, SSE, Vue3, and Arco Design by ppx. Users can quickly generate questions and create applications through AI. After administrator approval, users can take quizzes online and receive summarized answers based on various scoring algorithms or AI. Administrators can centrally manage site content and perform statistical analysis.",
    };
  },
  methods: {
    scrollToBottom() {
      this.$refs.bottomSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
  },
};
</script>

<style scoped>
.enhanced-about-page {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  color: white;
  font-family: "Poppins", sans-serif;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
}

.top-section {
  position: relative;
  display: flex;
  min-height: 100vh;
  overflow: hidden;
}

.image-container {
  display: flex;
  flex: 6;
  align-items: center;
  justify-content: center;
  padding: 2vw;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  transition: background-color 0.3s ease;
}

.image-container:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.featured-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 25px;
  opacity: 0.8;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.featured-image:hover {
  transform: scale(1.05);
  opacity: 1;
}

.content-container {
  display: flex;
  flex: 4;
  align-items: center;
  justify-content: center;
  padding: 2vw;
}

.content-wrapper {
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.tag {
  margin-bottom: 1vh;
  color: #61dafb;
  font-size: clamp(12px, 1vw, 18px);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.title {
  margin-bottom: 2vh;
  font-weight: bold;
  font-size: clamp(24px, 2.5vw, 40px);
  background: linear-gradient(45deg, #61dafb, #fb61da);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  color: #cccccc;
  font-size: clamp(16px, 1.2vw, 20px);
  line-height: 1.5;
}

.learn-more-btn {
  margin-top: 20px;
  padding: 10px 20px;
  color: white;
  font-size: 16px;
  background: linear-gradient(45deg, #61dafb, #fb61da);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.learn-more-btn:hover {
  box-shadow: 0 5px 15px rgba(97, 218, 251, 0.4);
  transform: translateY(-3px);
}

.bottom-section {
  padding: 4vw;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.full-width-content {
  max-width: 800px;
  margin: 0 auto;
}

.full-width-content h2 {
  margin-bottom: 2vh;
  color: #61dafb;
  font-size: clamp(20px, 2.5vw, 36px);
}

.full-width-content p {
  color: #cccccc;
  font-size: clamp(16px, 1.2vw, 20px);
  line-height: 1.6;
}

.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.shape {
  position: absolute;
  width: 50px;
  height: 50px;
  background: rgba(97, 218, 251, 0.1);
  border-radius: 50%;
  animation: float 15s infinite ease-in-out;
}

.shape:nth-child(1) {
  top: 20%;
  left: 10%;
}

.shape:nth-child(2) {
  top: 70%;
  left: 35%;
  animation-delay: -2s;
}

.shape:nth-child(3) {
  top: 40%;
  right: 20%;
  animation-delay: -4s;
}

.shape:nth-child(4) {
  right: 10%;
  bottom: 20%;
  animation-delay: -6s;
}

.shape:nth-child(5) {
  top: 30%;
  left: 40%;
  animation-delay: -8s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, 20px);
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.8s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

@media (max-width: 768px) {
  .top-section {
    flex-direction: column;
    height: auto;
  }

  .image-container,
  .content-container {
    flex: none;
    width: 100%;
    max-width: 100%;
  }

  .image-container {
    min-height: 50vh;
  }

  .featured-image {
    border-radius: 15px;
  }

  .content-container {
    padding: 4vw;
  }

  .tag {
    font-size: clamp(14px, 3vw, 20px);
  }

  .title {
    font-size: clamp(20px, 5vw, 32px);
  }

  .description {
    font-size: clamp(16px, 3.5vw, 22px);
  }

  .bottom-section {
    padding: 6vw;
  }
}
</style>
