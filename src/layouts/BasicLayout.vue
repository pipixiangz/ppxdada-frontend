<template>
  <div id="basicLayout">
    <div class="animated-background">
      <div class="gradient-overlay"></div>
      <div class="floating-shapes">
        <div v-for="n in 20" :key="n" :class="`shape shape${n}`"></div>
      </div>
      <div class="particle-container">
        <div v-for="n in 100" :key="`particle-${n}`" class="particle"></div>
      </div>
      <div class="light-beam"></div>
    </div>
    <a-layout class="layout">
      <a-layout-header class="header">
        <global-header />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a
          href="https://github.com/pipixiangz/ppxdada-frontend"
          target="_blank"
          class="footer-link"
        >
          皮皮翔AI答答
        </a>
        <a href="https://beian.miit.gov.cn/" target="_blank" class="footer-link"
          >京公网安备11010802044596号</a
        >
        <span class="footer-separator">|</span>
        <a href="https://beian.miit.gov.cn/" target="_blank" class="footer-link"
          >京ICP备2024073488号</a
        >
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import GlobalHeader from "@/components/GlobalHeader.vue";

let animationFrame: number;

const animateParticles = () => {
  const particles = document.querySelectorAll(
    ".particle"
  ) as NodeListOf<HTMLElement>;
  particles.forEach((particle) => {
    const speed = parseFloat(particle.dataset.speed || "1");
    let posY = parseFloat(particle.style.top);
    posY -= speed;
    if (posY <= -10) {
      posY = 110;
    }
    particle.style.top = `${posY}%`;
  });
  animationFrame = requestAnimationFrame(animateParticles);
};

onMounted(() => {
  const particles = document.querySelectorAll(
    ".particle"
  ) as NodeListOf<HTMLElement>;
  particles.forEach((particle) => {
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.dataset.speed = (0.2 + Math.random() * 1).toFixed(2);
  });
  animateParticles();
});

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});
</script>

<style scoped>
#basicLayout {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: #003bd3;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    #ff00ff 0%,
    #00ffff 25%,
    #ffff00 50%,
    #ff00ff 75%,
    #00ffff 100%
  );
  background-size: 400% 400%;
  opacity: 0.5;
  mix-blend-mode: color-dodge;
  animation: gradientShift 10s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  opacity: 0.7;
  filter: blur(5px);
}

.shape::before {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  border-radius: 50%;
  content: "";
}

.shape1,
.shape2,
.shape3,
.shape4,
.shape5 {
  animation: floatLarge 15s infinite ease-in-out;
}

.shape6,
.shape7,
.shape8,
.shape9,
.shape10 {
  animation: floatMedium 20s infinite ease-in-out;
}

.shape11,
.shape12,
.shape13,
.shape14,
.shape15 {
  animation: floatSmall 25s infinite ease-in-out;
}

.shape16,
.shape17,
.shape18,
.shape19,
.shape20 {
  animation: floatTiny 30s infinite ease-in-out;
}

.shape1 {
  top: 5%;
  left: 5%;
  width: 180px;
  height: 180px;
  animation-delay: 0s;
}

.shape2 {
  top: 15%;
  left: 25%;
  width: 160px;
  height: 160px;
  animation-delay: 2s;
}

.shape3 {
  top: 25%;
  left: 45%;
  width: 140px;
  height: 140px;
  animation-delay: 4s;
}

.shape4 {
  top: 35%;
  left: 65%;
  width: 200px;
  height: 200px;
  animation-delay: 6s;
}

.shape5 {
  top: 45%;
  left: 85%;
  width: 170px;
  height: 170px;
  animation-delay: 8s;
}

.shape6 {
  top: 55%;
  left: 5%;
  width: 120px;
  height: 120px;
  animation-delay: 1s;
}

.shape7 {
  top: 65%;
  left: 25%;
  width: 100px;
  height: 100px;
  animation-delay: 3s;
}

.shape8 {
  top: 75%;
  left: 45%;
  width: 130px;
  height: 130px;
  animation-delay: 5s;
}

.shape9 {
  top: 85%;
  left: 65%;
  width: 110px;
  height: 110px;
  animation-delay: 7s;
}

.shape10 {
  top: 95%;
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 9s;
}

.shape11 {
  top: 10%;
  left: 15%;
  width: 80px;
  height: 80px;
  animation-delay: 0.5s;
}

.shape12 {
  top: 20%;
  left: 35%;
  width: 70px;
  height: 70px;
  animation-delay: 2.5s;
}

.shape13 {
  top: 30%;
  left: 55%;
  width: 90px;
  height: 90px;
  animation-delay: 4.5s;
}

.shape14 {
  top: 40%;
  left: 75%;
  width: 60px;
  height: 60px;
  animation-delay: 6.5s;
}

.shape15 {
  top: 50%;
  left: 95%;
  width: 85px;
  height: 85px;
  animation-delay: 8.5s;
}

.shape16 {
  top: 60%;
  left: 15%;
  width: 40px;
  height: 40px;
  animation-delay: 1.5s;
}

.shape17 {
  top: 70%;
  left: 35%;
  width: 50px;
  height: 50px;
  animation-delay: 3.5s;
}

.shape18 {
  top: 80%;
  left: 55%;
  width: 30px;
  height: 30px;
  animation-delay: 5.5s;
}

.shape19 {
  top: 90%;
  left: 75%;
  width: 45px;
  height: 45px;
  animation-delay: 7.5s;
}

.shape20 {
  top: 100%;
  left: 95%;
  width: 55px;
  height: 55px;
  animation-delay: 9.5s;
}

@keyframes floatLarge {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(-50px, 50px) rotate(10deg) scale(1.1);
  }
  50% {
    transform: translate(50px, -50px) rotate(-10deg) scale(0.9);
  }
  75% {
    transform: translate(50px, 50px) rotate(5deg) scale(1.05);
  }
}

@keyframes floatMedium {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(-30px, 30px) rotate(5deg) scale(1.05);
  }
  50% {
    transform: translate(30px, -30px) rotate(-5deg) scale(0.95);
  }
  75% {
    transform: translate(30px, 30px) rotate(3deg) scale(1.02);
  }
}

@keyframes floatSmall {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(-20px, 20px) rotate(3deg) scale(1.03);
  }
  50% {
    transform: translate(20px, -20px) rotate(-3deg) scale(0.97);
  }
  75% {
    transform: translate(20px, 20px) rotate(2deg) scale(1.01);
  }
}

@keyframes floatTiny {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(-10px, 10px) rotate(2deg) scale(1.02);
  }
  50% {
    transform: translate(10px, -10px) rotate(-2deg) scale(0.98);
  }
  75% {
    transform: translate(10px, 10px) rotate(1deg) scale(1.01);
  }
}

.particle-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8);
  filter: blur(1px);
}

.light-beam {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  transform: translate(-50%, -50%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: transparent;
}

.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.content {
  flex: 1;
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.content:hover {
  box-shadow: 0 12px 48px rgba(31, 38, 135, 0.3);
  transform: translateY(-5px);
}

.footer {
  padding: 16px;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}

.footer-link {
  margin: 0 10px;
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #00ffff;
}

.footer-separator {
  color: #fff;
}

@media (max-width: 768px) {
  .content {
    margin: 10px;
    padding: 15px;
  }

  .footer-link {
    display: block;
    margin: 5px 0;
  }

  .footer-separator {
    display: none;
  }
}
</style>
