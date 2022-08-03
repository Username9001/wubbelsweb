<template>
<svg id="visual" viewBox="0 0 2200 120" width="2200" height="120" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M0 47L52.3 50C104.7 53 209.3 59 314.2 61C419 63 524 61 628.8 58.2C733.7 55.3 838.3 51.7 943 51C1047.7 50.3 1152.3 52.7 1257 58.5C1361.7 64.3 1466.3 73.7 1571.2 75.7C1676 77.7 1781 72.3 1885.8 72.8C1990.7 73.3 2095.3 79.7 2147.7 82.8L2200 86L2200 121L2147.7 121C2095.3 121 1990.7 121 1885.8 121C1781 121 1676 121 1571.2 121C1466.3 121 1361.7 121 1257 121C1152.3 121 1047.7 121 943 121C838.3 121 733.7 121 628.8 121C524 121 419 121 314.2 121C209.3 121 104.7 121 52.3 121L0 121Z" stroke-linecap="round" stroke-linejoin="miter"></path></svg>
  <footer class="css-selector">
    <div class="contact-info">
      <ul>
        <li>
          email: {{ contactInfo.email }}
        </li>
        <li>
          div
          phone: {{ contactInfo.phone }}
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      contactInfo: {
        email: 'erik.wubbels@gmail.com',
        phone: '0636328417'
      }
    }
  }
}
</script>
