export default function(event){
  return {
    x: event.targetTouches[0].clientX,
    y: event.targetTouches[0].clientY - 80
  };
}