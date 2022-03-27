<template>
  <div >
    <Card></Card>
    <Sale></Sale>
    <Observe></Observe>
  </div>
</template>

<script>
import Card from './Card'
import Sale from './Sale'
import Observe from './Observe'
export default {
  name:'',
  mounted() {
    this.$store.dispatch('getData')
  },
  components:{
    Card,
    Sale,
    Observe
  }
}
</script>

<style scoped>

</style >