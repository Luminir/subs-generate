export function clearTranscriptionItems(items: any | any[]){
    items.forEach((item: any | any[], key: any | any[]) => {
        if(!item.start_time){
          const prevSentence = items[key - 1];
           prevSentence.alternatives[0].content += item.alternatives[0].content;
           delete item[key]
        }
      });
      return items.map((item: any) => {
        const {start_time, end_time} = item;
        const content = item.alternatives[0] .content;
        return{start_time, end_time, content}
      })
}

function secondsToHHMMSSMS(timeString: any | any[]) {
  const d5 = new Date(parseFloat(timeString) * 1000);
  return d5.toISOString().slice(11, 23).replace('.', ',');
}

export function transcriptionItemsToSrt(items: any | any[]){
  let srt = '';
  let i = 1;
  items.filter((item: any | any[]) => {!!item} ).forEach((item: any | any[]) => {
    // segment
    srt += i + '\n';
    // timestamps
    const {start_time, end_time} = item;
    srt += secondsToHHMMSSMS(start_time) + ' ==> ' + secondsToHHMMSSMS(end_time) + "\n";

    // content
    srt += item.content + "\n";
    srt += "\n";
    i++;
  });
  return srt;
}