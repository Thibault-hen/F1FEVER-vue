<template>
  <div class="flex flex-col">
    <svg viewBox="0 0 178 40" width="178" height="40">
      <!-- wrap the svg describing the car in a group
        this to translate the car horizontally within the wrapping svg
        -->
      <g id="car">
        <!-- svg describing the race car in a container 118 wide and 28.125 tall
            .125 due to the 2.25 width of the stroke
    
            position in the bottom center of the wrapping svg
            -->
        <svg viewBox="0 0 118 28.125" x="30" y="11.725" width="118" height="28.125">
          <defs>
            <!-- circle repeated for the wheel -->
            <circle id="circle" cx="0" cy="0" r="1"></circle>
            <!-- wheel
                    three overlapping circles describing the parts of the wheel
                    in between the circles add path elements to detail the graphic
                    -->
            <g id="wheel">
              <use href="#circle" fill="#1E191A" transform="scale(10)"></use>
              <use href="#circle" fill="#fff" transform="scale(5)"></use>
              <!-- inner shadow -->
              <path
                fill="#1E191A"
                stroke="#1E191A"
                stroke-width="0.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                opacity="0.2"
                stroke-dashoffset="0"
                d="M -3.5 0 a 4 4 0 0 1 7 0 a 3.5 3.5 0 0 0 -7 0"
              ></path>
              <use href="#circle" fill="#1E191A" transform="scale(1.5)"></use>
              <!-- yellow stripe
                        include stroke-dasharray values totalling the circumference of the circle
                        this to use the dash-offset property and have the stripe rotate around the center while keeping its shape
                        ! explicitly set the stroke-dashoffset property to 0 for the other path elements (in this way the stroke-dashoffset attribute added through the <use> element affects only this path)
                        -->
              <path
                fill="none"
                stroke="#F9B35C"
                stroke-width="0.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-dasharray="20 14 8 5"
                d="M 0 -7.5 a 7.5 7.5 0 0 1 0 15 a 7.5 7.5 0 0 1 0 -15"
              ></path>
              <!-- outer glow (from a hypothetical light source) -->
              <path
                fill="none"
                stroke="#fff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                opacity="0.1"
                stroke-dashoffset="0"
                d="M -6.5 -6.25 a 10 10 0 0 1 13 0 a 9 9 0 0 0 -13 0"
              ></path>
            </g>
          </defs>
          <!-- group describing the pilot's helmet
                translate in the middle of the cockpit
                -->
          <g transform="translate(51.5 11.125)">
            <path
              stroke-width="2"
              stroke="#1E191A"
              fill="#EF3F33"
              d="M 0 0 v -2 a 4.5 4.5 0 0 1 9 0 v 2"
            ></path>
            <rect fill="#1E191A" x="3.25" y="-3" width="5" height="3"></rect>
          </g>

          <!-- group describing the car -->
          <g transform="translate(10 24.125)">
            <!-- shadow below the car
                    ! change the transform-origin of the shadow to animate it from the top center
                    the idea is to skew the shadow as the car moves
                    -->
            <g transform="translate(59 0)">
              <path
                id="shadow"
                opacity="0.7"
                fill="#1E191A"
                d="M -64 0 l -4 4 h 9 l 8 -1.5 h 100 l -3.5 -2.5"
              ></path>
            </g>
            <!-- path describing the frame of the car
                    ! do not add a stroke at the bottom of the frame
                    additional lines are overlapped to detail the belly of the vehicle
                    -->
            <path
              fill="#FF0000"
              stroke="#1E191A"
              stroke-width="2.25"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M 0 0 v -10 l 35 -13 v 5 l 4 0.5 l 0.5 4.5 h 35.5 l 30 13"
            ></path>

            <!-- wings -->
            <g
              fill="#FF0000"
              stroke="#1E191A"
              stroke-width="2.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M -6 0 v -22 h 10 z"></path>
              <path d="M 105 0 h -3 l -12 -5.2 v 6.2 h 12"></path>
            </g>

            <!-- grey areas to create details around the car's dashes -->
            <g fill="#949699" opacity="0.7">
              <rect x="16" y="-6" width="55" height="6"></rect>
              <path d="M 24 -14 l 13 -1.85 v 1.85"></path>
            </g>

            <!-- dashes included sparingly on top of the frame -->
            <g
              fill="none"
              stroke="#1E191A"
              stroke-width="2.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke-dasharray="30 7 42" d="M 90 0 h -78"></path>
              <path d="M 39.5 -13 h -15"></path>
            </g>

            <!-- elements describing the side of the car -->
            <path
              fill="#FF0000"
              stroke="#1E191A"
              stroke-width="2.25"
              stroke-linejoin="round"
              d="M 48.125 -6 h -29 v 6 h 29"
            >
              <!-- .125 to tuck the path behind the rectangle and avoid a pixel disconnect as the svg is scaled -->
            </path>

            <rect x="48" y="-7.125" width="6.125" height="7.125" fill="#1E191A"></rect>

            <!-- rear view mirror -->
            <g fill="#1E191A">
              <rect x="60" y="-15" width="1" height="6"></rect>
              <rect x="56.5" y="-17.5" width="6" height="2.5"></rect>
            </g>
          </g>

          <!-- group describing the wheels, positioned at the bottom of the graphic and at either end of the frame -->
          <g class="wheels" transform="translate(0 18.125)">
            <g transform="translate(10 0)">
              <use href="#wheel"></use>
            </g>

            <g transform="translate(87 0)">
              <!-- add an offset to rotate the yellow stripe around the center -->
              <use href="#wheel" stroke-dashoffset="-22"></use>
            </g>
          </g>
        </svg>
      </g>

      <!-- Lines behind the car for motion effect -->
      <g id="motion-lines">
        <line x1="30" y1="20" x2="5" y2="20" stroke="#949699" stroke-width="1"></line>
        <line x1="15" y1="25" x2="5" y2="25" stroke="#ffffff" stroke-width="1"></line>
        <line x1="22" y1="30" x2="5" y2="30" stroke="#949699" stroke-width="1"></line>
      </g>
    </svg>

    <span class="text-center dark:text-white mt-2 uppercase text-xs tracking-widest">{{
      $t('loader.loading_message')
    }}</span>
  </div>
</template>

<style scoped>
g#car {
  transform: translateX(-10px);
  animation: translate 0.8s ease-in-out infinite;
}
g#wheel {
  animation: rotate 0.5s linear infinite;
}
g#motion-lines {
  animation: move-lines 0.8s linear infinite;
}
@keyframes translate {
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(-10px);
  }
}
@keyframes rotate {
  50% {
    transform: rotate(4turn);
  }
  100% {
    transform: rotate(6turn);
  }
}
@keyframes move-lines {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-20px);
    opacity: 0;
  }
}
</style>
