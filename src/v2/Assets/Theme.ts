import { breakpoints } from "@artsy/palette"
import Colors from "./Colors"

export default {
  breakpoints: [768, 900, 1024, 1192],
  colors: Colors,
  flexboxgrid: {
    
    
breakpoints: {
      
lg: parseInt(breakpoints.lg, 10), 
      
md: parseInt(breakpoints.md, 10),
      // px
sm: parseInt(breakpoints.sm, 10),
      xl: parseInt(breakpoints.xl, 10),
      xs: parseInt(breakpoints.xs, 10),
    }, 
    

// rem
container: {
      
// rem
lg: 76, 
      
// rem
md: 61, 
      sm: 46, // rem
    }, 
    
// Defaults
gutterWidth: 3,
    // rem
outerMargin: 2,
  },
  publishing: {
    breakpoints: {
      
// px
lg: 1080, 
      

// px
md: 900, 
      

// px
sm: 720, 
      
// px
xl: 1280, 
      xs: 600, // px
    },
  },
}
