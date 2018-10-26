<template>
  <div class="blockheader">
    <img class="image" v-if="imageurl" :src="imageurl" draggable="false"/>
    <div class="image" v-else />
    <div class="company"> {{ company }}</div>
    <div class="name"> {{ name }}</div>
    <div class="description"> {{ description }} </div>
    <div class="top"><slot name="top"/></div>
    <div class="center"><slot name="center"/></div>
    <div class="bottom"><slot name="bottom"/></div>
  </div>
</template>

<script>

export default {
  props: ['imageurl', 'company', 'name', 'description']
}
</script>

<style scoped>

.blockheader {
  display:grid;
  grid-template-columns: 125px 125px;
  grid-template-rows: auto auto auto ;
  color: white;
}

.image {
  grid-column: 1 / span 2;
  grid-row: 1 / span 3;
  width: 100%;
  #border-top: 1px solid #2196f3;
  #border-bottom: 1px solid #2196f3;
}

.name {
  grid-column: 1 / span 2;
  grid-row: 1;
  padding-left: 0.5em;
  font-weight: 700;
  align-self: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.description {
  grid-column: 1 / span 2;
  grid-row: 2;
  padding-left: 0.5em;
  font-weight: 300;
  font-size: 0.9em;
  align-self: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.company {
  grid-column: 1 / span 2;
  grid-row: 3;
  padding-left: 0.5em;
  font-weight: 300;
  font-size: 0.9em;
  align-self: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.top {
  grid-column: 2;
  grid-row: 1;
  justify-self: flex-end;
}

.center {
  grid-column: 2;
  grid-row: 2;
  justify-self: flex-end;
}

.bottom {
  grid-column: 2;
  grid-row: 3;
  justify-self: flex-end;
}
</style>
