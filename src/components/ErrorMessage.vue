<template>
  <div>
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: 'McvEM',
    props: {
      message: {
        type: String,
        required: false,
        default: 'Error',
      },
    },
  }
</script>