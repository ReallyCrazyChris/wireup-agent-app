<template>
  <g>
    <path class="connection"
      :d="path"
      @click="unwire([connection.start.uri,connection.end.uri])"
    />
    <circle class="circle"
      :cx="circle.cx"
      :cy="circle.cy"
      :r="circle.r"
      @click="unwire([connection.start.uri,connection.end.uri])"
    />
 </g>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['connection', 'wirecanvas'],
  computed: {
    container: function () {
      const boundingClientRect = this.wirecanvas.getBoundingClientRect()
      return {
        top: boundingClientRect.top,
        left: boundingClientRect.left
      }
    },
    path: function () {
      const startposition = this.connection.start.el.getBoundingClientRect()
      const endposition = this.connection.end.el.getBoundingClientRect()
      const d = []

      d[0] = (startposition.left + startposition.right) / 2 - this.container.left
      d[1] = (startposition.top + startposition.bottom) / 2 - this.container.top
      d[2] = (endposition.left + endposition.right) / 2 - this.container.left
      d[3] = (endposition.top + endposition.bottom) / 2 - this.container.top

      const width = 150
      // returns a svg path with a Cubic Bezier curve format  ( M sourcePoint, C sourceConfigPoint targetConfigPoint targetPoint )
      /* eslint-disable */
      const dpath = ('M '+(d[0])+' '+(d[1])+' C '+(d[0]+width)+' '+(d[1])+' '+(d[2]-width)+' '+(d[3])+' '+(d[2])+' '+(d[3])+'')
      /* eslint-enable */
      return dpath
    },
    circle: function () {
      const startposition = this.connection.start.el.getBoundingClientRect()
      const endposition = this.connection.end.el.getBoundingClientRect()
      const width = (Math.max(startposition.left, endposition.left) - Math.min(startposition.left, endposition.left)) / 2
      const height = (Math.max(startposition.top, endposition.top) - Math.min(startposition.top, endposition.top)) / 2
      const r = 5
      const cx = Math.min((startposition.left + startposition.right) / 2, (endposition.left + endposition.right) / 2) + width - this.container.left
      const cy = Math.min((startposition.top + startposition.bottom) / 2, (endposition.top + endposition.bottom) / 2) + height - this.container.top

      return {
        r: r,
        cx: cx,
        cy: cy
      }
    }
  },
  methods: {
    ...mapActions([
      'unwire'
    ])
  }
}
</script>

<style scoped>
.connection {
  cursor: pointer;
  stroke-width: 4;
  stroke: lightgreen;
  fill:  none;
}
.circle {
  stroke-width: 3;
  cursor: pointer;
  stroke: lightgreen;
  fill: white;
}
</style>
