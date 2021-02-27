export default function(event){
  return {
    x: event.nativeEvent ? event.nativeEvent.offsetX : event.offsetX,
    y: event.nativeEvent ? event.nativeEvent.offsetY : event.offsetY
  };
}