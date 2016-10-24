import $ from 'zepto'

export default {
  bind () {
    let el = $(this.el)
    el.on('click', () => {
        this.vm[this.expression]()
    })
  }
}
