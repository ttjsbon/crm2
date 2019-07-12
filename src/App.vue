<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
  import { version } from 'ant-design-vue/es'
  import moment from 'moment'

  export default{
    name: 'APP',
    data() {
      return {
        moment,
        version
      }
    }
  }
</script>
