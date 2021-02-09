ScrollTrigger.create({
  trigger: ".container",
  pin: true,
  start: "top top",
  end: "+=5800"
  //markers: true
});

t1 = gsap.timeline();
t2 = gsap.timeline();
t1
  .from('.details',{x:'200px',duration:0.3},0)
  .from('.bg-dark h1',{opacity:0,duration:1},0);
  

