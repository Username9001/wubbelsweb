<template>
    <nav>
      <ul>
        <li>
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about">About</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/contact">Contact</nuxt-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <style scoped>
    nav {
      display: flex;
      justify-content: space-between;
    }
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      display: flex;
    }
    li {
      padding: 0 10px;
    }
  </style>
  