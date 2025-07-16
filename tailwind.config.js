/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./script.js", "./index.html"],  // "./script.js",
  theme: {
    fontFamily:{
      'sans':['Poppins', 'sans-serif']
    },
    extend: {

      keyframes: {
        flutuar: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        flutuar: 'flutuar 3s ease-in-out infinite',
      },

      colors: {
        'my-dark-brown': '#664300',
        'my-golden-ochre': '#a87b05',
        'my-bright-yellow': '#efb810',
        'my-light-gold': '#f9db5c',
        'my-pale-yellow': '#ffff94',
      },
      backgroundImage:{
        "home": "url('/assets/bg.jpg')"
      }
    },
  },
  plugins: [],
}

