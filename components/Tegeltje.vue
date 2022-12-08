<template>
    <div v-if="loaded" class="tegel">
        <div class="tegel-vierkant">
            <div class="tegel-cirkel" @click="changeQuote()">
                <blockquote class="quotes" :class="{ zoomout: quotePressed, zoomin: newQuote }">
                  {{ usedQuote }}
                </blockquote>  
            </div>  
        </div>
    </div>
</template>
<script>
export default {
data() {
    return {
      loaded: false,
      quotePressed: false,
      footerQuotes: [
        'A bird in the sky is a bird gone by.',
        'Once upon a time there was nature...',
        'Space is very big.',
        'An inspirational quote goes long way for uninspired goat.',
        '"Blah skippedie blah" - Sheep',
        'Live, Laugh, Eat gross amounts of frikandelbroodjes.',
        'To be is to die.',
        'Egg.',
        'Every day is a new challenge, you just have to eat the beans.',
        'Getting up is like burning your old clothes in a dishwasher.',
        'Most people will crash and burn some day. You just gotta know how to handle a fire extinguisher.',
        'Once a bandage, now a metallic hip replacement.'
      ],
      usedQuote: '',
    }
  },
    methods: {
    changeQuote() {
      this.quotePressed = true
      this.newQuote = false
      // console.log('pressed:', this.quotePressed)
      setTimeout(() => 
      { 
        this.quotePressed = false
        this.newQuote = true
        this.usedQuote = this.footerQuotes[Math.floor(Math.random()*this.footerQuotes.length)]
      }, 3000
      )
    }
  },
  created() {
    this.changeQuote()
    this.loaded = true
  },
}
</script>
<style lang="scss" scoped>
.tegel {
    .tegel-vierkant {
        position: relative;
        z-index: 3;
        width: 350px;
        height: 350px;
        margin: 120px;
        background: #fff;
        border: 6px solid #26518B;
        border-radius: 15px;
        .tegel-cirkel {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: inherit;
            align-self: flex-end;
            list-style-type: none;
            // .quote-description {
            //   margin-top: 64px;
            // }
            .quotes {
                margin-top: 12px;
                font-family: 'Courgette';
                font-size: 22px;
                line-height: 28px;
                display: flex;
                background: #fff;
                color: #26518B;
                border: 12px double #26518B;
                border-radius: 280px;
                width: 280px;
                height: 280px;
                margin: auto;
                font-weight: 300;
                justify-content: center;
                align-items: center;
                // text-shadow: #FC0 1px 0 10px;
                // &:hover {
                //   animation: wiggle .2s 1;
                // }
            }
        }
    }
}
</style>